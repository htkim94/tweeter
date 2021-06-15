$(document).ready(function() {
  console.log('document is ready');
  $('#tweet-text').on('input', function() {
    const textInput = $('#tweet-text').val();
    const counter = $('#tweet-text').parent().children('.submitLine').children('.counter');
    const result = 140 - textInput.length;
    if (result < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '');
    }
    counter[0].innerHTML = result;
  })

});