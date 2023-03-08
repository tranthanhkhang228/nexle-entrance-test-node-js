exports.up = (knex) => {
  return knex.schema.createTable("users", (t) => {
    t.increments("id").primary().unsigned();
    t.string("first_name", 30);
    t.string("last_name", 30);
    t.string("password", 250);
    t.string("email", 250).unique().index();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users");
};
