const express = require('express');
const twit = require('Twit');
const moment = require('moment');
const config = require('../config.js');

const app = express();

const T = new twit(config);

let profileInfo = {}; // Set up empty arrays and objects for data
let tweets = [];
let friends = [];
let directMessages = [];

app.set('views', '../views');
app.set('view engine', 'pug');
app.use(express.static('../public'));


T.get('account/verify_credentials', (err, data) => { // Retrieve twitter profile information
  if (!err){ // if no error
  profileInfo.screen_name = data.screen_name; // store information in profileInfo object
  profileInfo.profile_banner_url = data.profile_banner_url;
  profileInfo.profile_image_url = data.profile_image_url;
  profileInfo.name = data.name;
  profileInfo.followers_count = data.followers_count;
} else {
  console.error(err);
  const errorMsg = {
    text: 'Unable to get profile information'
  };
  profileInfo.push(errorMsg);
}
});

T.get('statuses/user_timeline', { // retrieve 5 most recent tweets
  count: 5
}, (err, data) => {

if (!err){
  data.forEach((tweet) => { // for each tweet, gather information and add to tweets array
    let tweetInfo = {};
    tweetInfo.name = tweet.user.name;
    tweetInfo.screen_name = tweet.user.screen_name;
    tweetInfo.profile_image_url = tweet.user.profile_image_url;
    tweetInfo.text = tweet.text;
    tweetInfo.retweet_count = tweet.retweet_count;
    tweetInfo.favorite_count = tweet.favorite_count;
    tweetInfo.created_at = moment(tweet.created_at).fromNow();
    tweets.push(tweetInfo);
  });
} else {
  console.error(err);
  const errorMsg = {
    text: 'Unable to get tweets'
  };
  tweets.push(errorMsg);
}
});

T.get('friends/list', { // get 5 most recent friends
  count: 5
}, (err, data) => {
  if (!err) {
    data.users.forEach((friend) => { // for each friend get name, screen name, image
        let friendInfo = {};
        friendInfo.name = friend.name;
        friendInfo.screen_name = friend.screen_name;
        friendInfo.profile_image_url = friend.profile_image_url;
        friendInfo.following = friend.following;
        friends.push(friendInfo);
      });
    } else {
      console.error(err);
      const errorMsg = {
        text: 'Unable to get friends list'
      };
    friends.push(errorMsg);
  }
});

T.get('direct_messages/events/list', { // get 5 most recent DMs
  count: 5
}, (err, data) => {
  if (data.events.length != 0) { // if there is at least 1 message then gather info
  if (!err) {
    data.events.forEach((directMessage) => {
      let messageInfo = {};
      messageInfo.text = directMessage.message_create.message_data.text;
      messageInfo.time = moment(parseInt(directMessage.created_timestamp)).fromNow();
      directMessages.push(messageInfo);
    });
  } else {
    console.error(err);
    const errorMsg = {
      text: 'Unable to get DMs'
    };
    directMessages.push(errorMsg);
  }
} else { // if no messages then display error
  console.log("No DMs");
}
});

app.get('/', (req, res) => { // express route to home
  res.render('index', { // render pug template and pass in locals to be rendered
    profileInfo,
    tweets,
    friends,
    directMessages
  });
});

app.listen(3000, () => {
  console.log('The application is running');
});
