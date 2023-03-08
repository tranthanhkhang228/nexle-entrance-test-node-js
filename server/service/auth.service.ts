import { User } from "@models";
import { StatusCodes } from "http-status-codes";
import { createError, verifyPassword } from "../helpers";

export interface SignInBody {
  email: string;
  password: string;
}

export const signIn = async (option: SignInBody) => {
  const { email, password } = option;
  const [user] = await User.findByEmail(email);

  if (!user)
    throw createError({
      name: StatusCodes[StatusCodes.BAD_REQUEST],
      message: "User or password is incorrect.",
      status: StatusCodes.BAD_REQUEST,
    });

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword)
    throw createError({
      name: StatusCodes[StatusCodes.BAD_REQUEST],
      message: "User or password is incorrect.",
      status: StatusCodes.BAD_REQUEST,
    });

  const { id, first_name, last_name } = user;
  return {
    user: {
      id: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
      displayName: `${first_name} ${last_name}`,
    },
    token: "",
    refreshToken: "",
  };
};

export const refreshToken = async (option: SignInBody) => {
  const { email, password } = option;
  const [user] = await User.findByEmail(email);

  if (!user)
    throw createError({
      name: StatusCodes[StatusCodes.BAD_REQUEST],
      message: "User or password is incorrect.",
      status: StatusCodes.BAD_REQUEST,
    });

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword)
    throw createError({
      name: StatusCodes[StatusCodes.BAD_REQUEST],
      message: "User or password is incorrect.",
      status: StatusCodes.BAD_REQUEST,
    });

  const { id, first_name, last_name } = user;
  return {
    user: {
      id: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
      displayName: `${first_name} ${last_name}`,
    },
    token: "",
    refreshToken: "",
  };
};
