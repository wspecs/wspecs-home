(function(server){

  function request(link, cb, json){
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
          cb(xhr.responseText);
        } else {
          cb('');
        }
      }
    };
  }

  window.request = request;

})("http://servone.wspecs.com/wapp/");
