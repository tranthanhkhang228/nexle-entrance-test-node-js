import { StatusCodes } from "http-status-codes";
import { createError } from "../helpers";
import { User, UserProp } from "../models";

export interface CreateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const checkExistedEmail = async (email: string) => {
  const [foundUser] = (await User.findByEmail(email)) as UserProp[];

  if (foundUser)
    throw createError({
      name: StatusCodes[StatusCodes.BAD_REQUEST],
      message: "The email has been taken.",
      status: StatusCodes.BAD_REQUEST,
    });
};

export const createUser = async (option: CreateUserBody) => {
  await checkExistedEmail(option.email);

  const { firstName, lastName, email, password } = option;
  const user = await User.create(
    {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    },
    []
  );

  return {
    id: user.id,
    firstName,
    lastName,
    email,
    displayName: `${firstName} ${lastName}`,
  };
};
