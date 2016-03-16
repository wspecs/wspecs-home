(function(wquery, scroll){

  /**
   * Set click events for code's title from 'Hack the specs'
   */
  app.codeHeaderClick = function() {
    var code_spans = document.querySelectorAll('.code span');
    for (var i = 0; i < code_spans.length; i++) {
      code_spans[i].onclick = codeSpanClick;
    }
  }


  /**
   * @param {Event} e
   */
  function codeSpanClick(e){
    if (e.target.className !== "active"){
      var commands = wquery.$('.code span');
      for (var i = 0; i < commands.length; i++) {
        commands[i].className = "";
      }
      app.selectCommandInfo(e.target.id);
    }
  }


  /**
   * Set click handler for smooth scroll links.
   */
  app.scrollClick = function() {
    var nodes = document.querySelectorAll('.scroll');
    for (var index in nodes){
      nodes[index].onclick = smoothScroll;
    }
  }


  /**
   * @param {Event} e
   */
  function smoothScroll(e){
    e.preventDefault();
    var id = (e.target.hash || e.target.name).replace("#", "");
    scroll.To(id);
  }



  /**
   * @param {HTMLElement} element
   * @param {number} to - Pixel location from the top of the document.
   * @param {number} duration - time in milliseconds.
   */
  function scrollTo(element, to, duration) {
    if (duration < 0) {
      return;
    }
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      scrollTo(element, to, duration - 10);
    }, 10);
  }

})(_WQ, scroll);
