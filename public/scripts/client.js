/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  tsParticles.loadJSON(
    "tsparticles",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/XjRprX_particles.json?",
    function () {}
  );

  renderTweets(data);
});

const createTweetElement = (tweet) => {
  const time = timeago.format(tweet.created_at);

  const $tweetHeaderContent = `<div><img src='${tweet.user.avatars}'><span>${tweet.user.name}</span></div><span class="muted">${tweet.user.handle}</span> `;
  const $tweetHeader = $(`<header>${$tweetHeaderContent}</header>`);

  const $tweetMain = $(`<main><p>${tweet.content.text}</p> <hr /></main>`);
  const $tweetFooter = $(`<footer><span>${time}</span>
  <div>
    <a href="#/!"><i class="fas fa-flag"></i></a>
    <a href=""><i class="fas fa-retweet"></i></a>
    <a href=""><i class="fas fa-heart"></i></a>
  </div></footer>`);

  const article = $(`<article class="tweet-content"> </article>`)
    .append($tweetHeader)
    .append($tweetMain)
    .append($tweetFooter);

  return article;
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (const tweet of tweets) {
    $("#tweets-container").append(createTweetElement(tweet));
  }
};
