import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ code: "E__INVALID_PARAMETER", message: errors.array() });
}
