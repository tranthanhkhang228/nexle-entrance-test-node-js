import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  public message: string;
  public status: StatusCodes;
  public details?: unknown;

  constructor(message: string, status: StatusCodes = 500, details?: unknown) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.status = status;

    if (details) this.details = details;
  }
}

export const createError = (error: CustomError) => {
  return new CustomError(error.message, error.status, error.details);
};

export const createResponse = (
  res: Response,
  data?: unknown,
  status?: StatusCodes
) => res.status(status || StatusCodes.OK).json(data);
