import { hashPassword, knex } from "../infrastructure";

export interface UserProp {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  updatedAt?: string;
  createdAt?: string;
}

const TABLE_NAME: string = "users";
const TIME_OUT: number = 1000;

export class User {
  public prop: UserProp;

  private static beforeSave = (prop: Partial<UserProp>) => {
    if (!prop.password)
      throw new Error("Password is required to hash password.");

    return hashPassword(prop.password)
      .then((hash) => ({ ...prop, password: hash }))
      .catch((err) => `Error hashing password: ${err}`);
  };

  public static create = async (
    prop: Partial<UserProp>,
    selectableProps: string[]
  ) => {
    const userWithHashPassword = await User.beforeSave(prop);

    return knex
      .insert(userWithHashPassword)
      .returning<Partial<UserProp>>(selectableProps)
      .into(TABLE_NAME)
      .timeout(TIME_OUT);
  };

  public static findByEmail = (email: string) =>
    knex.select().from<UserProp>(TABLE_NAME).where({ email }).timeout(TIME_OUT);

  public static findById = (id: string) =>
    knex.select().from<UserProp>(TABLE_NAME).where({ id }).timeout(TIME_OUT);
}
