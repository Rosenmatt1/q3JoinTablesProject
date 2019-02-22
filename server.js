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

app.get('/:id', (req, res) => {
  return knex('roommates')
    .where('roommates.household_id', req.params.id)
      .then(roommates => {
          const roommateChores = roommates.map(roommate => {
            return knex('chores')
              .where('chores.roommate_id', roommate.id)
              .select('chore')
              .then(roommateChore => {
                roommate.chores = roommateChore 
                return roommate
              })
          })
        console.log(roommateChores)
        return Promise.all(roommateChores).then(result => res.send(result))
      })
})

app.listen(port, () => console.log(`Cleaning up the house on port ${port}!`))