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
  return knex('households')
    .then(households => {
      const getHouseDuty = households.map(household => {
        return knex('chores')
          .join('roommates', 'roommates.id', 'chores.roommate_id')
          .where('roommates.id', household.id )
          .select('roommates.name', 'chores.chore')
        return household
      })
      return Promise.all(getHouseDuty).then(result => res.send(result))
    })
})

app.listen(port, () => console.log(`Cleaning up the house on port ${port}!`))