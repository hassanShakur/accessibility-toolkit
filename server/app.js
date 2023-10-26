const express = require('express')
const setupApp = require('./appSetup')

const app = express()
setupApp(app)

app.use('/test', (req, res) => {
    res.send('Got test req!!!')
})

module.exports = app;

