$(document).ready(function () {
  $("form textarea").on("input", function (event) {
    let length = $(this).val().length;

    if (140 - length < 0) {
      let sliced = $(this).val().slice(0, 141);
      $(this).val($.trim(sliced));
      $(this).siblings("div").find("output").html(0);
      $(this).addClass("invalid-input");
      $(this).siblings(".error").html("Maximum 140 characters!");
      $(this).siblings(".error").fadeIn();
      event.preventDefault();
    } else {
      $(this).siblings(".error").hide();
      $(this).removeClass("invalid-input");
      $(this)
        .siblings("div")
        .find("output")
        .html(140 - length);
    }
  });
});
