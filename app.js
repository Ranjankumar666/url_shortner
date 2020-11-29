const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const shortenRoute = require('./routes/shorten');


const app = express()


app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});

//ROUTE

app.use('/v1', shortenRoute);


mongoose.connect('mongodb+srv://RanjanKumar7278:7890806475@cluster0.mqjwc.mongodb.net/URL?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, ()=> {
      console.log(`Server connected at ${port}`)
    })
  })
  .catch((err)=> console.log(err))

