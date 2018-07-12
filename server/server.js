const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const ejs = require('ejs')
const expresshandlebars = require('express-handlebars')

const server = express();

const mockDB = require('./db/db')


server.use(bodyParser.json())

server.use(express.static(path.resolve(__dirname, '../public')))
server.engine('html', expresshandlebars({
  extname: '.html',
  helpers: {
    json: data => JSON.stringify(data)
  }
}))

server.set('view engine', 'html')
server.set('views', path.resolve(__dirname, './views'))



// Page Routes
server.get('/', (req, res) => {
  res.render('index')
})

server.get('/redact/:img_id', (req, res) => {
  const image = mockDB.getImage(req.params.img_id)
  if (!image) {
    res.status(404).send({ error: 'image not found' })
    return
  }
  res.render('redact', { image })
})


// API Routes
server.use('/api', require('./routes'))


server.listen(9009, () => {
  console.log('Redactinator on 9009')
})