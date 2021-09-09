$(document).ready(function () {
  $("#floatingUp").on("click", () => {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown("slow", "linear", function () {
      $(this).find("form textarea").focus();
    });
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
