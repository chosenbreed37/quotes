var assert = require('chai').assert
var http = require('http')
var rest = require('restler')

suite('API tests', function () {
  var quote = {
    text: 'When it becomes serious you have to lie',
    author: 'Jean-Claude Juncker',
    source: ''
  }

  var base = 'http://localhost:8000'

  test('can get all quotes', function (done) {
    rest.get(base + '/api/quotes')
      .on('success', function (data) {
        assert(data.length)
        done()
      })
  })

  test('can add a quote', function (done) {
    rest.postJson(base + '/api/quote', quote)
    .on('success', function (data) {
      assert.match(data.id, /\w/, 'id must be set')
      done()
    })
  }) 

  test('can fetch a quote', function (done) {
    rest.postJson(base + '/api/quote', quote)
    .on('success', function (data) {
      rest.get(base + '/api/quote/' + data.id)
      .on('success', function (data) {
        assert(data.text === quote.text)
        assert(data.author === quote.author)
        done()
      })
    })
  }) 
})

