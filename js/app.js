const express = require('express');
const twit = require('Twit');
const config = require('../config.js');

const app = express();

const T = new twit(config);

app.set('view engine', 'pug');
app.use(express.static('public'));

T.get('account/verify_credentials', (err, data) => {
  const username = data.screen_name;
  const profileImage = data.profile_image_url;
  const name = data.name;

  console.log(name + " " + username + " " + profileImage);
})

T.get('statuses/user_timeline', {count: 5}, (err, data) => { // retrieve 5 most recent tweets
  // console.log(data);
})

T.get('friends/list', {count: 5}, (err, data) => {
  // console.log(data);
})

T.get('direct_messages/events/list', {count: 5}, (err, data) => {
  // console.log(data);
})

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () =>{
  console.log('The application is running');
});
