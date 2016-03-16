(function() {
  var fs = require('fs');

  /**
   * Create script to quickly restart application.
   * @param {string} appName
   * @param {string} base
   */
  function createReloadFile(appName, base) {
    var file = fs.readFileSync('src/bash/template.sh', 'utf-8');
    file = file.replace(/{pid}/g, process.pid);
    file = file.replace(/{appName}/g, appName);
    file = file.replace(/{base}/g, base);
    fs.writeFile('src/bash/reload.sh', file, 'utf-8');
  }

  module.exports = createReloadFile;
})();
