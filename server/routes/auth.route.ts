import * as express from "express";
import { refreshToken, signIn, signOut, signUp } from "../controllers";
import {
  refreshTokenRules,
  signInRules,
  signUpRules,
} from "../controllers/auth/auth.chemaRule";
import { extractJwt } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

const authRouter = express.Router();

authRouter.route("/sign-up").post(signUpRules, validate, signUp);

authRouter.route("/sign-in").post(signInRules, validate, signIn);

authRouter.route("/sign-out").post(extractJwt(), signOut);

authRouter
  .route("/refresh-token")
  .post(refreshTokenRules, validate, refreshToken);

module.exports = authRouter;
