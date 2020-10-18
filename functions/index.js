const express = require('express')
const functions = require('firebase-functions')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(require('./routes'))
app.use(bodyParser.json())

exports.api = functions.https.onRequest(app)
