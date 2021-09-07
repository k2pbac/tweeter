/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

$(document).ready(function () {
  tsParticles.loadJSON(
    "tsparticles",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/XjRprX_particles.json?",
    function () {}
  );

  const $tweet = createTweetElement(tweetData);

  $("#tweets-container").append($tweet);
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
