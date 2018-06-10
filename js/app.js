const express = require('express');
const twit = require('Twit');
const config = require('../config.js');

const app = express();

const T = new twit(config);

let profileInfo = {};
let tweets = [];
let friends = [];
let directMessages = [];

app.set('views', '../views');
app.set('view engine', 'pug');
app.use(express.static('../public'));



T.get('account/verify_credentials', (err, data) => { // Retrieve twitter profile information
  profileInfo.username = data.screen_name; // store information in profileInfo object
  profileInfo.imageURL = data.profile_image_url;
  profileInfo.name = data.name;
})

T.get('statuses/user_timeline', {count: 5}, (err, data) => { // retrieve 5 most recent tweets
  data.forEach((tweet) => {
    console.log(tweet.text);
  });
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
