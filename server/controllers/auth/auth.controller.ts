import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createResponse } from "../../helpers";
import {
  createUser,
  refreshToken as handleRefreshToken,
  signIn as handleSignIn,
  signOut as handleSignOut,
} from "../../service";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const option = {
    email: req.body["email"],
    password: req.body["password"],
    firstName: req.body["firstName"],
    lastName: req.body["lastName"],
  };

  try {
    const createdUser = await createUser(option);

    return createResponse(res, createdUser, StatusCodes.CREATED);
  } catch (error) {
    return next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const option = {
    email: req.body["email"],
    password: req.body["password"],
  };

  try {
    const foundUser = await handleSignIn(option);

    return createResponse(res, foundUser, StatusCodes.OK);
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await handleSignOut(req.email);

    return createResponse(res, null, StatusCodes.NO_CONTENT);
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.body["refreshToken"];

  try {
    const newToken = await handleRefreshToken(refreshToken);

    return createResponse(res, newToken, StatusCodes.OK);
  } catch (error) {
    return next(error);
  }
};
