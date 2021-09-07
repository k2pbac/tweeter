$(document).ready(function () {
  $("#tweet-text").on("input", function (event) {
    let length = $(this).val().length;

    if (140 - length < 0) {
      let sliced = $(this).val().slice(0, 140);
      $(this).val($.trim(sliced));
      $(this).siblings("div").find("output").html(0);
      $(this).addClass("invalid-input");
      $(this).siblings(".error").show();
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
