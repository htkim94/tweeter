$(document).ready(function() {
  $('#new-text').on('input', function() {
    const button = $('button');
    const textInput = $('#new-text').val();
    const counter = $('#new-text').parent().children('.submitLine').children('.counter');
    const result = 140 - textInput.length;
    if (result < 0) {
      counter.css('color', 'red');
      button.prop('disabled', true);
    } else {
      counter.css('color', '');
      button.prop('disabled', false);
    }
    counter[0].innerHTML = result;
  })

});