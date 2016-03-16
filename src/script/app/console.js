(function(wquery){

  var TYPING_LINE_SPEED = 500;  // ms
  var LINES = [];

  /**
   * @param {!Array<string>} lines
   * @param {!nubmer} index
   */
  function appendLine(lines, index) {
    wquery.empty('.line');
    wquery.append('.past-line', '<p>$ ' + lines[index - 1] + '</p>');
    wquery.append('.line', '<p>$ ' + lines[index] + '</p>');
  }


  /**
   * Start typing animation.
   * @param {Array<string>} lines
   */
  function runScript(lines){
    lines = lines || LINES;
     (function theLoop (i) {
       setTimeout(function () {
         appendLine(lines, i);
         if (++i < lines.length) {
           theLoop(i);
         }
         else {
           wquery.animate('.loader_page', 'start_page 2.5s 1');
           app.loadPage();
         }
       }, Math.floor((Math.random() * TYPING_LINE_SPEED) + 100));
    })(1);
  }


  /**
   * Fetch data to start console animation.
   */
  app.reboot = function() {
    request('/console', function(data) {
      LINES = data;
      wquery.empty('.line');
      wquery.append('.line', '<p>$ ' + LINES[0] + '</p>');
      runScript();
    });
  }

})(_WQ);
