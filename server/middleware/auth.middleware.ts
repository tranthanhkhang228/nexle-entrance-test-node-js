import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ExtractJwt } from "passport-jwt";
import { promisify } from "util";
import { JWT_TOKEN_SECRET } from "../config";
import { createError } from "../helpers";

interface CustomClaim {
  iss: string;
  exp: number;
  email: string;
}

const verifyPromised = promisify(jwt.verify.bind(jwt));

const getClaim = async (token: string) => {
  const verified = await verifyPromised(token, JWT_TOKEN_SECRET);
  return verified as unknown as CustomClaim;
};

export const extractJwt =
  () => async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

      if (!token) {
        throw createError({
          name: StatusCodes[StatusCodes.BAD_REQUEST],
          message: "Bearer token not found.",
          status: StatusCodes.BAD_REQUEST,
        });
      }

      const claim = await getClaim(token);

      req.email = claim.email;

      return next();
    } catch (err: any) {
      throw createError({
        name: StatusCodes[StatusCodes.UNAUTHORIZED],
        message: err.message,
        status: StatusCodes.UNAUTHORIZED,
      });
    }
  };
