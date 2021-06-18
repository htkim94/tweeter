$(document).ready(function () {
  $("#new-text").on("input", function () {
    const textInput = $("#new-text").val();
    const counter = $("#new-text")
      .parent()
      .children(".submitLine")
      .children(".counter");
    const result = 140 - textInput.length;
    if (result < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "");
    }
    counter[0].innerHTML = result;
  });
});
