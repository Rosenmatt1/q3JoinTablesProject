
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('households').del()
    .then(function () {
      // Inserts seed entries
      return knex('households').insert([
        {id: 1, address: '6517 Galvanize Ave'},
        {id: 2, address: '1111 Sync Lane', name: 'The Love House'},
        {id: 3, address: '3547 Main St'}
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('households_id_seq', (SELECT MAX(id) FROM households));"
      )
    })
}
