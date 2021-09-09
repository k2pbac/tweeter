$(document).ready(function () {
  $("form textarea").on("input", function (event) {
    let length = $(this).val().length;

    if (140 - length < 0) {
      $(this).siblings("div").find("output").html(0);
      $(this).siblings(".error").html("Maximum 140 characters!");
      $(this).siblings(".error").fadeIn();
      $(this)
        .siblings("div")
        .find("output")
        .html(140 - length)
        .addClass("addFont");
      event.preventDefault();
    } else {
      $(this).siblings(".error").hide();
      $(this)
        .siblings("div")
        .find("output")
        .html(140 - length)
        .removeClass("addFont");
    }
  });
});
