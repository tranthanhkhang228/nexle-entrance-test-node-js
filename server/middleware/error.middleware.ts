import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IS_DEVELOPMENT } from "../config";
import { CustomError } from "../helpers";

const getDefaultErrorMessage = (errStatus: StatusCodes) => {
  switch (errStatus) {
    case StatusCodes.UNAUTHORIZED:
      return "Unauthorized";
    case StatusCodes.FORBIDDEN:
      return "Forbidden";
    case StatusCodes.BAD_REQUEST:
      return "Bad Request";
    case StatusCodes.NOT_FOUND:
      return "The requested resource could not be found";

    default:
      return "Internal server error";
  }
};

export const genericErrorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.status).send({
    ok: false,
    message: err.message || getDefaultErrorMessage(err.status),
    errors: IS_DEVELOPMENT ? [err] : undefined,
  });
};
