$(document).ready(function () {
  $("#floatingUp").on("click", () => {
    $(window).scrollTop(0);
    $("#tweet-text").focus();
  });

  $(window).scroll(function (event) {
    if ($(this).scrollTop() >= 120) {
      $("#floatingUp").fadeIn();
      $("#hideArrows").fadeOut();
    } else {
      $("#floatingUp").fadeOut();
      $("#hideArrows").fadeIn();
    }
  });
});
