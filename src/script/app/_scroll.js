window.scroll = (function() {

  var elementPosition = function(a) {
    return function() {
      return a.getBoundingClientRect().top;
    };
  };

  var scrolling = function( elementID ) {

    var el = document.getElementById( elementID );
    elPos = elementPosition( el );
    var duration = Math.sqrt(Math.abs(elPos() - document.body.scrollTop)) * 
    Math.cbrt(Math.abs(elPos() - document.body.scrollTop)) * 1.8;
    var increment = Math.round( Math.abs( elPos() )/ 40 ),
    time = Math.round( duration/increment ),
    prev = 0,
    E;

    function scroller() {
      E = elPos();
      if (E === prev) {
        return;
      } else {
        prev = E;
      }
      increment = (E > -20 && E < 20) ? ((E > - 5 && E < 5) ? 1 : 5) : increment;

      if (E > 1 || E < -1) {
        if (E < 0) {
          window.scrollBy( 0,-increment );
        } else {
          window.scrollBy( 0,increment );
        }
        setTimeout(scroller, time);
      }
    }

    scroller();
  };

  return {
    To: scrolling
  }

})();