exports.up = (knex) => {
  return knex.schema.createTable("tokens", (t) => {
    t.increments("id").primary().unsigned();
    t.integer("user_id")
      .references("users.id")
      .unsigned()
      .index()
      .onDelete("CASCADE");
    t.string("refresh_token", 250);
    t.string("expired_in", 64);
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("projects");
};
