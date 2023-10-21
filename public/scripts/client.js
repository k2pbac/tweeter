require("firebase-functions/logger/compat");

$(document).ready(function () {
  // Add Particles to header element (small bubbles floating)
  tsParticles.loadJSON(
    "tsparticles",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/XjRprX_particles.json?",
    function () {}
  );

  //Display the form when the top right button is clicked
  $("#displayForm").on("click", function () {
    //Toggle the textarea to be visible or not
    $(".new-tweet").slideToggle(0.5, function (event) {
      $(this).find("form textarea").focus();

      //Check if the textarea is currently visible, set padding to make flush with the header
      if ($(this).css("display") == "none") {
        $(".container").attr("style", "padding-top: 40px");
      } else {
        $(".container").attr("style", "padding-top: 100px");
      }
    });
  });

  //on form submit prevent default and submit post request if conditions met
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
      const $textArea = $(this).find("#tweet-text").siblings(".error");
      $(this).find("#tweet-text").addClass("invalid-input");
      $($textArea).fadeOut();
      $($textArea).html("Please enter a valid tweet!");
      $($textArea).fadeIn();
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
    $("#tweets-container").empty();
    renderTweets(response);
  });
};

const createTweetElement = (tweet) => {
  console.log(tweet);
  const time = timeago.format(tweet.created_at);
  const $tweetHeaderContent = `<div></div> `;
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
