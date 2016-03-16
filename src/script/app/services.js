(function(wquery){

  var DIV = '#services';
  var SERVICES = [];

  /**
   * @param {{
   *  !title: string,
   *  !icon: string,
   *  !content: string
   * }} service
   * @return {string}
   */
  function serviceHtml(service) {
    var html = '<div class="col-1-3">';
    html += '<div>';
    html += '<h4><i class="icon-' + service.icon + '"></i></h4>';
    html += '</div>';
    html += '<div>';
    html += '<h4>' + service.title + '</h4>';
    html += '<p>' + service.content + '</p>';
    return html;
  }

  /**
   * @param {!Array<object>} services
   */
  function attachRow(services) {
    servs.forEach(function(service) {
      wquery.append(DIV + ' .row', serviceHtml(service));
    });
  }


  /**
   * @param {[{
   *  service: string,
   *  icon: string,
   *  content: string
   * }]} services
   */
  function attachServices(services) {
    var servs = services || SERVICES;
    servs.forEach(function(service, index) {
      var i = parseInt((index) / 3, 10);
      wquery.append(DIV + ' .row' + i, serviceHtml(service));
    });
    app.animateServices();
  }


  /**
   * Fetch information to load tiles for the service section.
   */
  request('/services', function(data) {
    SERVICES = data;
    attachServices();
  });

})(_WQ);
