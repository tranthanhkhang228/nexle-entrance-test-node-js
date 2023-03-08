import { checkSchema } from "express-validator";

export const signUpRules = checkSchema({
  firstName: {
    in: "body",
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 30,
      },
    },
  },
  lastName: {
    in: "body",
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 30,
      },
    },
  },
  email: {
    in: "body",
    isEmail: true,
    isLength: { options: { max: 250 } },
  },
  password: {
    in: "body",
    isString: true,
    isLength: {
      options: {
        min: 8,
        max: 20,
      },
    },
  },
});

export const signInRules = checkSchema({
  email: {
    in: "body",
    isEmail: true,
    isLength: { options: { max: 250 } },
  },
  password: {
    in: "body",
    isString: true,
    isLength: {
      options: {
        min: 8,
        max: 20,
      },
    },
  },
});

export const refreshTokenRules = checkSchema({
  refreshToken: {
    in: "body",
    isString: true,
    isLength: { options: { max: 250 } },
  },
});
