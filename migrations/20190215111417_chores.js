
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chores', table => {
    table.increments()
    table.string('chore').notNullable().defaultsTo('')
    table.integer('roommate_id').notNullable().references('id').inTable('households')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chores')
};
