$('form').submit(function () {
  if ($('input').val()) {
    var inputValue = $('input').val();
    $('ul').append('<li>' + inputValue + '<a href="">x</a></li>');
  }
  $('input').val(' ');
  return false;
});
$(document).on('click', 'a', function (e) {
  e.preventDefault();
  $(this).parent().slideUp(250, function () {
    $(this).remove();
  });
});