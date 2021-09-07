$(document).ready(function () {
  tsParticles.loadJSON(
    "tsparticles",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/XjRprX_particles.json?",
    function () {}
  );

  $("main.container form").on("submit", function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    if (
      data.slice(5).length &&
      data.slice(5) !== null &&
      data.slice(5).length <= 140
    ) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data,
      }).done(function (response) {
        console.log("success");
      });
    }
  });

  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).done(function (response) {
      renderTweets(response);
    });
  };

  loadTweets();
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
