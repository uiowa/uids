$('#superfish-main-accordion li a.menuparent').click(function () {
 // $('#superfish-main-accordion li ul').removeClass('sf-hidden');
  //$(this).closest("ul").toggleClass('sf-hidden');
  $(this).siblings('ul').toggleClass('sf-hidden');
  $(this).parent().toggleClass('sf-expanded');
  //$('#superfish-main-accordion li').addClass('sf-expanded');

  $(this).toggleClass('active');
});
