$(document).ready(function () {
  tsParticles.loadJSON(
    "tsparticles",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/XjRprX_particles.json?",
    function () {}
  );

  $("#displayForm").on("click", function () {
    $(".new-tweet").slideToggle("slow", function () {
      $(this).find("form textarea").focus();
    });
  });

  $("main.container form").on("submit", function (e) {
    const data = $(this).serialize();
    if (
      data.slice(5).length &&
      data.slice(5) !== null &&
      data.slice(5).replace(" ", "").length <= 140
    ) {
      $(this).find("textarea").val("");
      $(this).find("output").html(140);
      $.ajax({
        method: "POST",
        url: "/tweets",
        data,
      }).done(function (response) {
        loadTweets();
      });
    } else if (!data.slice(5).length) {
      $(this).find("#tweet-text").siblings(".error").fadeOut();
      $(this).find("#tweet-text").addClass("invalid-input");
      $(this)
        .find("#tweet-text")
        .siblings(".error")
        .html("Please enter a valid tweet!");
      $(this).find("#tweet-text").siblings(".error").fadeIn();
    }
    e.preventDefault();
  });

  loadTweets();
});

const loadTweets = () => {
  $.ajax({
    method: "GET",
    url: "/tweets",
  }).done(function (response) {
    $("#tweets-container").html("");
    renderTweets(response);
  });
};

const createTweetElement = (tweet) => {
  const time = timeago.format(tweet.created_at);

  const $tweetHeaderContent = `<div><img src='${tweet.user.avatars}'><span>${tweet.user.name}</span></div><span class="muted">${tweet.user.handle}</span> `;
  const $tweetHeader = $(`<header>${$tweetHeaderContent}</header>`);

  const $tweetMain = $(
    `<main><p>${escape(tweet.content.text)}</p> <hr /></main>`
  );
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
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
