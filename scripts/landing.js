var animatePoints = function() {
  var revealPoint = function() {
    // 'this' refers to the current element with the 'point' class and sets css properties for opacity and transform
    $(this).css({
      opacity: 1,
      transform: 'scaleX(1) translateY(0)'
    });
  };
  //will iterate through each HTML element with 'point' class and call revealPoint passing that element as 'this'
  $.each($('.point'), revealPoint);
};

//Once the dom is loaded this function executes
//This function check the the height of the window
//If the height is greater than 950 it will call the animatePoints immediately
//Otherwise, animatePoints will be called once the page has been scrolled to or past the desired scroll distance

$(window).load(function() {
  if ($(window).height() > 950) {
    animatePoints();
  }
  var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
  $(window).scroll(function(event) {
    if ($(window).scrollTop() >= scrollDistance) {
      animatePoints();
    }
  });