$(document).ready(function () {
  //On input into the textarea, update the char count if a letter (not space, enter, ctrl)
  $("form textarea").on("input", function (event) {
    let length = $(this).val().length;

    // Add error class and toggle error if char count goes over 140
    if (140 - length < 0) {
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
