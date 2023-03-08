import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWT_TOKEN_LIFE, JWT_TOKEN_SECRET } from "../config";

export const generateAccessToken = (payload?: {}) =>
  jwt.sign({ ...payload }, JWT_TOKEN_SECRET, {
    expiresIn: JWT_TOKEN_LIFE,
  });

export const generateRefreshToken = () =>
  crypto.randomBytes(64).toString("hex");
