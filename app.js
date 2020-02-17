const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { list: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const show = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { list: show })
})

app.get('/search', (req, res) => {
  const word = req.query.keyword
  const search = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(word.toLowerCase()) || restaurant.category.toLowerCase().includes(word.toLowerCase())
  })
  res.render('index', { list: search, keyword: word })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})