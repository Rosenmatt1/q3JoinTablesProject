
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roommates').del()
    .then(function () {
      // Inserts seed entries
      return knex('roommates').insert([
        {id: 1, name: 'Mateo', age: 34, household_id: 1},
        {id: 2, name: 'Anthony', age: 23, household_id: 1},
        {id: 3, name: 'Trevor', age: 24, household_id: 2},
        {id: 4, name: 'Chris', age: 38, household_id: 2 }
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('roommates_id_seq', (SELECT MAX(id) FROM roommates));"
      )
    })
}
