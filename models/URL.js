const {Schema, model} = require('mongoose');


const urlSchema = Schema({
  url: String,
  shortUrl: String,
  uId: String,
  noOfClicks: Number
})


const url = model('url', urlSchema)

module.exports = url
