var express = require('express')
var Quote = require('./models/quote.js')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.set('port', process.env.PORT || 8000)

app.get('/api/quotes', function (req, res) {
  Quote.find({}, function (err, quotes) {
    if (err) return res.status(500).send('Error occurred: database error.')
    res.json(quotes.map(function (quote) {
      return {
        text: quote.text,
        id: quote._id,
        author: quote.author,
        source: quote.source
      }
    }))
  })
})

app.post('/api/quote', function (req, res) {
  var quote = new Quote({
    text: req.body.text,
    author: req.body.author,
    source: req.body.source
  })

  quote.save(function (err, quote) {
    if (err) return res.status(500).send('Error occurred: database error.')
    res.json({ id: quote._id })
  })
})

app.get('/api/quote/:id', function (req, res) {
  Quote.findById(req.params.id, function (err, quote) {
    if (err) return res.status(500).send('Error occurred: database error.')
    res.json({
      text: quote.text,
      author: quote.author,
      source: quote.source,
      id: quote._id
    })
  })
})

// database configuration
var mongoose = require('mongoose')
var options = {
  server: {
    socketOptions: { keepAlive: 1 }
  }
}

switch (app.get('env')) {
  case 'development':
    mongoose.connect('mongodb://db/quotes', options)
    break
  case 'production':
    mongoose.connect('mongodb://db/quotes', options)
    break
  default:
    throw new Error('Unknown execution environment: ' + app.get('env'))
}

// initialise db
Quote.find(function (err, quotes) {
  if (quotes.length) return

  if (err) {
    console.log(err)
    return
  }

  new Quote({
    text: 'Beauty awakens the soul to act',
    author: 'Dante'
  }).save()

  new Quote({
    text: 'Few people can be happy unless they hate some other person, nation or creed',
    author: 'Bertrand Russell'
  }).save()
})

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})

