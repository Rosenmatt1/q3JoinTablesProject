exports.up = function(knex, Promise) {
  return knex.schema.createTable('households', table => {
    table.increments()
    table.string('address').notNullable().defaultsTo('')
    table.string('name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('households')
};
