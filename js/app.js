const express = require('express');
const twit = require('Twit');
const config = require('../config.js');

const app = express();

const T = new twit(config);

app.set('view engine', 'pug');


T.get('statuses/user_timeline', {count: 5}, (err, data) => { // retrieve 5 most recent tweets
  // console.log(data);
})

T.get('friends/list', {count: 5}, (err, data) => {
  // console.log(data);
})

T.get('direct_messages/events/list', {count: 5}, (err, data) => {
  console.log(data);
})

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () =>{
  console.log('The application is running');
});
