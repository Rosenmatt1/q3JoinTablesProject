
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roommates').del()
    .then(function () {
      // Inserts seed entries
      return knex('roommates').insert([
        {name: 'mateo', age: 34,},
        {name: 'Anthony', age: 23},
        {name: 'Trevor', age: 24},
        {name: 'Chris', age: 24 }
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('roommates_id_seq', (SELECT MAX(id) FROM roommates));"
      )
    })
}
