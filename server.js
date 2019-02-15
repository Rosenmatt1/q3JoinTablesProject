const express = require('express')
const app = express()
const port = process.env.PORT || 3005

const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)