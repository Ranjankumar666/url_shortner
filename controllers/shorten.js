const URL = require('../models/URL');
const {nanoid} = require('nanoid');
const validUrl = require('valid-url');

exports.post = async (req, res, next) => {
  const {url} = req.body;
  console.log(url)
  const host = req.protocol+ '://'+req.get('host');


  if(!validUrl.isUri(url)){
    throw new Error('Not a valid Url')
  }

  const uId = await nanoid();

  console.log(host)

  const newUrl = new URL({
    url, 
    shortUrl: host+'/v1/'+ uId, 
    uId, 
    noOfClicks: 10
  })

  newUrl.save()
    .then(result => {
      res.status(201).json({
        shortUrl: result.shortUrl
      })
    })
    .catch(err => console.log(err))
}

exports.get = (req, res, next) => {
  const {uId} = req.params;


  URL.findOne({uId})
    .then(url => {
      if(!url){
        res.send('Invalid URL or Expired URL')
      }

      if(url.noOfClicks > 10){
        res.send('Expired URL')
      }

      if(url.noOfClicks == 0){
        URL.deleteOne({uId})
        res.send('Expired URL')
      }

      return url
    })
    .then(url => {
      res.redirect(url.url);
      url.noOfClicks -= 1;
      url.save()
    })
    .catch(err => console.log(err))
} 
