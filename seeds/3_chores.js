
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chores').del()
    .then(function () {
      // Inserts seed entries
      return knex('chores').insert([
        {name: 'Dishwasher'},
        {name: 'Take Trash Out'},
        {name: 'Sweep'},
        {name: 'Kitchen'},
        {name: 'Take Trash Out'}
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('chores_id_seq', (SELECT MAX(id) FROM chores));"
      )
    })
}
