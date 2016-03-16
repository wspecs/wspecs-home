(function(wquery){

  var SPECS = {};
  var DIV = '#welcome';

  /**
   * Set the info line of code.
   * @param {string} selector
   */
  function selectCommandInfo(selector){
    var index = parseInt(selector.replace("info-cmd-", ""));
    wquery.empty("#welcome .info");
    wquery.$$("#" + selector).className = "active";
    var paragraphs = SPECS.commands[index].content;
    paragraphs.forEach(function(par) {
      wquery.append("#welcome .info", par, 'p');
    });
    app.animateCodeInfo();
 }

  /**
   * @param {!{
   *  !tile: string, 
   *  !command: string
   * }} cmd
   * @param {!number} index
   * @return {string}
   */
  function cmdHtml(cmd, index) {
    var html = '<span id="info-cmd-' + index + '">';
    html += '<strong>' + cmd.command + '</strong> ' + cmd.title;
    html += '</span>';
    return html;
  }


  /**
   * @param {[{
   *  title: string,
   *  command: string
   * }]} commands
   */
  function addCommands(commands) {
    wquery.empty(DIV + ' .code');
    var cmds = commands || SPECS.commands;
    cmds.forEach(function(cmd, index) {
      wquery.append(DIV + ' .code', cmdHtml(cmd, index));
    });
  }


  /**
   * Fecth command to populate welcom ('Hack the specs') section.
   */
  request('/specs', function(data) {
    SPECS = data
    wquery.html(DIV + ' h2', data.title);
    addCommands();
    selectCommandInfo('info-cmd-2');
    app.codeHeaderClick();
  });

  app.selectCommandInfo = selectCommandInfo;
})(_WQ);
