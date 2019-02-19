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
    .then(roommates => {
      const getHouseDuty = roommates.map(roommate => {
        return knex('roommates')
          // .join('households', 'households.id', 'roommates.household_id')
          .join('chores', 'roommates.id', 'chores.roommate_id')
          .where('roommates.id', roommate.id)
          // .andWhere('households.id', 'roommates.household_id')
          .select('roommates.name', 'chores.chore')
      })
      return Promise.all(getHouseDuty).then(result => res.send(result))
    })
})

app.listen(port, () => console.log(`Cleaning up the house on port ${port}!`))