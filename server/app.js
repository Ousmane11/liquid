require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const logger = require('morgan')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')



require('./configs/mongoose.config')
require('./configs/passport.config')
require('./configs/plaid.config')


const app_name = require('./package.json').name
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express()

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// ADD SESSION SETTINGS HERE:  
// CheCK THIS outerHeight, USS
app.use(session({
  secret: "some secret goes here",
  resave: true,
  saveUninitialized: true
}))

// USE passport.initialize() and passport.session() HERE:
// CheCK THIS outerHeight, USS
app.use(passport.initialize())
app.use(passport.session())

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}))

// CORS middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin)
    cb(null, originIsWhitelisted)
  },
  credentials: true
}
app.use(cors(corsOptions))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator'


// ///// ENRUTADOS BASE  ////////

const index = require('./routes/index')
app.use('/', index)
const authRoutes = require('./routes/auth/authRoutes')
app.use('/auth', authRoutes)

module.exports = app
