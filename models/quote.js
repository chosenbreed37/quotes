const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var quoteSchema = new Schema({
  Text: String,
  Author: String,
  Source: String
})

var Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote
