import { knex } from "../infrastructure";
import { UpdateRefreshTokenOption } from "../service";

export interface TokenProp {
  id?: string;
  user_id: string;
  refresh_token: string;
  expires_in: string;
  updated_at?: string;
  created_at?: string;
}

const TABLE_NAME: string = "tokens";
const TIME_OUT: number = 1000;

export class Token {
  public prop: TokenProp;

  public static create = async (
    prop: Partial<TokenProp>,
    selectableProps: string[]
  ) => {
    return knex
      .insert(prop)
      .returning<Partial<TokenProp>>(selectableProps)
      .into(TABLE_NAME)
      .timeout(TIME_OUT);
  };

  public static findByUserId = (userId: string) =>
    knex
      .select()
      .from<TokenProp>(TABLE_NAME)
      .where({ user_id: userId })
      .timeout(TIME_OUT);

  public static find = (refreshToken: string) =>
    knex
      .select()
      .from<TokenProp>(TABLE_NAME)
      .where({ refresh_token: refreshToken })
      .timeout(TIME_OUT);

  public static updateRefreshToken = async (
    updateRefreshTokenOption: UpdateRefreshTokenOption
  ) => {
    const { user_id, refresh_token, expires_in } = updateRefreshTokenOption;

    return knex
      .where({
        user_id: user_id,
      })
      .update({
        refresh_token,
        expires_in,
      })
      .into(TABLE_NAME)
      .timeout(TIME_OUT);
  };

  public static delete = async (userId: string) => {
    return knex
      .where({
        user_id: userId,
      })
      .delete()
      .into(TABLE_NAME)
      .timeout(TIME_OUT);
  };
}
