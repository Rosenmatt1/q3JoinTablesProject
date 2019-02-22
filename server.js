const express = require('express')
const app = express()
const port = process.env.PORT || 3005

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)

const cors = require('cors')
const parser = require('body-parser')
const dotenv = require("dotenv")

app.use(parser.json())
app.use(cors())

app.get('/', (req, res) => {
  return knex('chores')
    .then(chores => {
      const getHouseDuty = chores.map(chore => {
        return knex('roommates')
          .join('chores', 'roommates.id', 'chores.roommate_id')
          .where('roommates.id', chore.roommate_id)
          .select('roommates.name', 'chores.chore')
      })
      return Promise.all(getHouseDuty).then(result => res.send(result))
    })
})

// .join('households', 'households.id', 'roommates.household_id')
// .where('households.id', 'roommates.household_id')

// app.get('/:id', (req, res) => {
//   return knex('roommates')
//     .where('household_id', req.params.id)
//       .then(roommates => {
//           const roommateChores = roommates.map(roommate => {
//             knex('chores')
//               .where('roommate_id', roommate.id)
//               .then(roommateChore => console.log("house2", roommateChore))
//               return roommate
//           })
//       })
// })

// app.get('/', (req, res) => {
//   return knex('roommates')
//     .then(roommates => {
//       const getHouseDuty = roommates.map(roommate => {
//         return knex('chores')
//           .join('households', 'households.id', 'roommates.household_id')
//           .join('chores', 'roommates.id', 'chores.roommate_id')
//           .where('roommates.id', roommate.id)
//           .where(roommate.id, 'chores.roommate_id')
//           .where('households.id', roommate.household_id)
//           .select('roommates.name', 'chores.chore')
//       })
//       return Promise.all(getHouseDuty).then(result => res.send(result))
//     })
// })

app.listen(port, () => console.log(`Cleaning up the house on port ${port}!`))