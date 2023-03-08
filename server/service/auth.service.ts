import dayjs from "dayjs";
import { StatusCodes } from "http-status-codes";
import { REFRESH_TOKEN_LIFE } from "../config";
import { createError, verifyPassword } from "../helpers";
import { generateAccessToken, generateRefreshToken } from "../infrastructure";
import { Token, TokenProp, User, UserProp } from "../models";

export interface SignInBody {
  email: string;
  password: string;
}

export interface UpdateRefreshTokenOption {
  user_id: string;
  refresh_token: string;
  expires_in: string;
}

export const signIn = async (option: SignInBody) => {
  const { email, password } = option;
  const [user] = (await User.findByEmail(email)) as UserProp[];

  if (!user || !verifyPassword(password, user.password))
    throw createError({
      name: StatusCodes[StatusCodes.BAD_REQUEST],
      message: "User or password is incorrect.",
      status: StatusCodes.BAD_REQUEST,
    });

  const { id, first_name, last_name } = user;

  const refreshToken = generateRefreshToken();

  const [token] = await Token.findByUserId(user.id!);

  if (!token) {
    await Token.create(
      {
        user_id: user.id,
        refresh_token: refreshToken,
        expires_in: dayjs().add(REFRESH_TOKEN_LIFE, "day").toISOString(),
      },
      []
    );
  } else {
    await Token.updateRefreshToken({
      user_id: user.id!,
      refresh_token: refreshToken,
      expires_in: dayjs().add(REFRESH_TOKEN_LIFE, "day").toISOString(),
    });
  }

  return {
    user: {
      id,
      firstName: first_name,
      lastName: last_name,
      email,
      displayName: `${first_name} ${last_name}`,
    },
    token: generateAccessToken({ email }),
    refreshToken,
  };
};

export const refreshToken = async (refreshToken: string) => {
  const [foundRefreshToken] = (await Token.find(refreshToken)) as TokenProp[];

  if (
    !foundRefreshToken ||
    dayjs().isAfter(dayjs(foundRefreshToken.expires_in))
  )
    throw createError({
      name: StatusCodes[StatusCodes.NOT_FOUND],
      message: "The refresh token is invalid.",
      status: StatusCodes.NOT_FOUND,
    });

  const [user] = await User.findById(foundRefreshToken.user_id);

  return {
    token: generateAccessToken({ email: user.email }),
    refreshToken,
  };
};

export const signOut = async (email: string) => {
  const [user] = (await User.findByEmail(email)) as UserProp[];

  if (user) await Token.delete(user.id!);

  return;
};
