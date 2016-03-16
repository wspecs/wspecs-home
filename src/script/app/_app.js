(function(wquery, scroll){
  /**
   * Define the global application abject.
   */

  window.app = app || {}

  /**
   * Load page after the console animation is over.
   */
  app.loadPage = function() {
    app.animatePage();
    app.startSlides();
  }
  
})(_WQ, scroll);
