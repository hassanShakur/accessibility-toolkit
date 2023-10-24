const express = require('express')
const morgan = require('morgan')

const app = express()

const port = 7000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

