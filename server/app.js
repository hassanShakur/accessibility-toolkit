const express = require('express')
const setupApp = require('./appSetup')

const app = express()
setupApp(app)

module.exports = app;

