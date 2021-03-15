
const path = require('path')
const express = require('express')
const layout = require('express-layout')
const busboy = require('connect-busboy')

const render = require('./routes/render')
const api = require('./routes/api')

const port = process.env.PORT || 3000
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const middlewares = [
  layout(),
  express.static(path.join(__dirname, 'public'))
]

app.use(middlewares)
app.use(busboy())

app.use('/', render)

app.use('/api', api)

app.use((req, res, next) => {
  res.status(404).send("Not found!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Server Error!')
})

app.listen(port, () => {
  console.log(`App running at http://localhost:3000`)
})
