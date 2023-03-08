import "reflect-metadata";

import { DB_POOL_SIZE, KNEX_CONNECTION_STRING, KNEX_LOGGING } from "../config";

import Knex, { Config } from "knex";

const config: Config = {
  client: "mysql",
  connection: KNEX_CONNECTION_STRING,
  pool: { max: +DB_POOL_SIZE },
  debug: Boolean(KNEX_LOGGING),
  migrations: {
    tableName: "knex_migrations",
    directory: `${__dirname}/db/migrations`,
  },
  // seeds: {
  //   directory: `${__dirname}/db/seeds`,
  // },
};

export const knex = Knex(config);
