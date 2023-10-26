const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const setupApp = (app) => {
    dotenv.config({ path: './config.env' })

    console.log(process.env.FRONT_END_URL)
    // Parse frontend data
    app.use(bodyParser.urlencoded({
        extended: true,
    }))
    app.use(bodyParser.json())

    // Handle cors
    app.use(cors({
        credentials: true,
        origin: process.env.FRONT_END_URL,
    }))

    // Set res headers to allow frontend to read from backend
    app.use((req, res, next) => {
        res.setHeader(
            'Access-Control-Allow-Origin',
            process.env.FRONT_END_URL
        )

        next()
    })


    // Dev logging
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
    }

}

module.exports = setupApp;

