(function(wquery){

  /**
   * Handler to start the application.
   */
  function load() {
    wquery.hide('.wspecs');
    app.reboot();
    app.animate();
  }

  document.addEventListener('DOMContentLoaded', load, false);
})(_WQ);
