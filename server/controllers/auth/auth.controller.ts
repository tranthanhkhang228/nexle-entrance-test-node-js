import { createResponse } from "@helpers";
import { User } from "@models";
import { createUser, signIn as handleSignIn } from "@service";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const {
  createError,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require("../helpers/error_helper");

export const signUp = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const option = {
    email: req.body["email"],
    password: req.body["password"],
    firstName: req.body["firstName"],
    lastName: req.body["lastName"],
  };

  const createdUser = await createUser(option);

  return createResponse(res, createdUser, StatusCodes.CREATED);
};

export const signIn = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const option = {
    email: req.body["email"],
    password: req.body["password"],
  };

  const foundUser = await handleSignIn(option);

  return createResponse(res, foundUser, StatusCodes.CREATED);
};

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  const props = req.body.user;

  User.findOne({ username: props.username })
    .then((user) => {
      if (user)
        return next(
          createError({
            status: CONFLICT,
            message: "Username already exists",
          })
        );

      return User.create(props);
    })
    .then((user) =>
      res.json({
        ok: true,
        message: "Registration successful",
        user,
      })
    )
    .catch(next);
};

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.body["refreshToken"];

  User.findOne({ username: props.username })
    .then((user) => {
      if (user)
        return next(
          createError({
            status: CONFLICT,
            message: "Username already exists",
          })
        );

      return User.create(props);
    })
    .then((user) =>
      res.json({
        ok: true,
        message: "Registration successful",
        user,
      })
    )
    .catch(next);
};
