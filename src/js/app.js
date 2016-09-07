var toggleHamburger = (function() {
  const $hamburger = $('span .fa-bars');
  const $close     = $('span .fa-times');

  $close.hide();

  $hamburger.click(function(e) {
    $(this).toggle(function() {
      $(this).hide();
      $close.show('slow');
    });
  });

  $close.click(function(e) {
    $(this).toggle(function() {
      $(this).hide();
      $hamburger.show('slow');
    });
  });
}());

var highlightActiveLink = (function() {
  const currentUrl = window.location;
  const urlPartialPath = window.location.pathname.split('/')[1];
  const $linksToHighlight = $('nav li a');

  $linksToHighlight.each(function() {
    if (this.href.includes(urlPartialPath)) {
      $(this).addClass('active');
    }
  });
}());
