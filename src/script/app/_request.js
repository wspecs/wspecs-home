(function(){

  /**
   * @type {string}
   */
  var server = app.serverUrl;

  /**
   * Perform GET and POST requests.
   * @param {!string} link
   * @param {!Requester~requestCallback} cb
   * @param {Object} json
   */
  function request(link, cb, json){
    if (!server) {
      console.log('%c Error', 'font-size: 24, color: red');
      return;
    }
    var type;
    if (json !== undefined) {
      type = "POST";
    }
    else {
      type = "GET";
      json = null;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(type, server + link, true);
    if (type === "POST") {
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(json);
    xhr.onloadend = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var header = xhr.getResponseHeader('Content-Type').toLowerCase();
          var json_header = 'application/json';
          if (header.indexOf(json_header) > -1) {
            var data = JSON.parse(xhr.responseText);
            cb(data);
          }
          else {
            cb(xhr.responseText);
          }
        } else {
          cb('');
        }
      }
    };
  }

  window.request = request;

})();
