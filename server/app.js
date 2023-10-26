const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
}))

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

module.exports = app;

