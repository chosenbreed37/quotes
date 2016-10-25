var mongoose = require('mongoose')

var quoteSchema = mongoose.Schema({
  Text: String,
  Author: String,
  Source: String
})

var Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote
