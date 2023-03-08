import { User, UserProp } from "@models";

exports.seed = (knex: any) =>
  knex(User.TABLE_NAME)
    .del()
    .then(() => [
      {
        first_name: "peter",
        last_name: "parker",
        password: "password",
        email: "peter_parker@gmail.com",
      },
      {
        first_name: "tom",
        last_name: "holland",
        password: "another-password",
        email: "tom_holland@gmail.com",
      },
    ])
    .then((newUsers: UserProp[]) =>
      Promise.all(newUsers.map((user: UserProp) => User.create(user, [])))
    )
    .catch((err: any) => console.log("err: ", err));
