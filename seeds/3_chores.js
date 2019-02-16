
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chores').del()
    .then(function () {
      // Inserts seed entries
      return knex('chores').insert([
        {id: 1, chore: 'Dishwasher', roommate_id: 1},
        {id: 2, chore: 'Take Trash Out', roommate_id: 2},
        {id: 3, chore: 'Sweep', roommate_id: 3},
        {id: 4, chore: 'Kitchen', roommate_id: 4},
        {id: 5, chore: 'Bathroom', roommate_id: 1}
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('chores_id_seq', (SELECT MAX(id) FROM chores));"
      )
    })
}
