
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roommates', table => {
    table.increments()
    table.string('name').notNullable().defaultsTo('Person')
    table.integer('age').notNullable().defaultsTo(18)
    // table.integer('household_id')
    table.integer('household_id').notNullable().references('id').inTable('households')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roommates')
};
