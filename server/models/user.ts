// import knex from "@infrastructure";
import { hashPassword, knex } from "@infrastructure";

export interface UserProp {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  updated_at?: string;
  created_at?: string;
}

export class User {
  public static NAME: string = "User";
  public static TABLE_NAME: string = "users";
  private static TIME_OUT: number = 1000;
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
    const userWithHashPassword = await this.beforeSave(prop);

    return knex
      .insert(userWithHashPassword)
      .returning<Partial<UserProp>>(selectableProps)
      .into(this.TABLE_NAME)
      .timeout(this.TIME_OUT);
  };

  public static findByEmail = (email: string) =>
    knex
      .select()
      .from<UserProp>(this.TABLE_NAME)
      .where({ email })
      .timeout(this.TIME_OUT);
}
