
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('households').del()
    .then(function () {
      // Inserts seed entries
      return knex('households').insert([
        {address: '6517 Galvanize Ave'},
        {address: '1111 Sync Lane', name: 'The Love House'},
        {address: '3547 Main St'}
      ])
    }).then(() => {
      return knex.raw(
        "SELECT setval('households_id_seq', (SELECT MAX(id) FROM households));"
      )
    })
}
