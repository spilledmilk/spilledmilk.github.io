$(document).foundation();

// $(document).ready(function() {
//
//   $('#reset').click(function() {
//     $('.envelope').removeClass('open');
//     setTimeout(function() {
//       $('.envelope').addClass('open');
//     }, 500);
//   });
// });
//
// // text on top flap
// var div = document.getElementsByClassName( 'letter' );
// div.insertAdjacentHTML( 'beforeBegin', 'my text must be added here' );

$(document).ready(() => {
  $(".buildings").delay(700).fadeIn(700);
  $(".trees").delay(600).fadeIn(600);
  $(".bushes").delay(500).fadeIn(500);
  $(".street").delay(400).fadeIn(400);

  $(".text").delay(2000).fadeIn(900);

  $(".hello").delay(2000).fadeIn(900);
});
