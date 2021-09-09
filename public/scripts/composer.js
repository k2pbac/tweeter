$(document).ready(function () {
  //Stretch ~ if the second button is clicked scroll to top of page and toggle & focus textarea
  $("#floatingUp").on("click", () => {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown("slow", "linear", function () {
      $(this).find("form textarea").focus();
    });
  });

  //Get the current height of scroll to show the second button and remove nav button
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
