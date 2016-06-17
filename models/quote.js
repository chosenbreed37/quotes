var mongoose = require('mongoose')

var quoteSchema = mongoose.Schema({
  text: String,
  author: String,
  source: String
})

var Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote
