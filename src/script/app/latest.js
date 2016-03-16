(function(wquery){

  var DIV = '#apps';

  /**
   * @param {{
   *  !title: string,
   *  !type: string
   *  !summary: string,
   *  !button: {
   *   !link: string,
   *   !action: string
   *  },
   *  !preview: string,
   *  !features: Array<string>
   * }} app
   */
  function addLatestApp(app) {
    wquery.html(DIV + ' h3', app.title);
    wquery.html(DIV + ' h4', app.type);
    wquery.html(DIV + ' p', app.summary);
    wquery.html(DIV + ' a', app.button.action);
    wquery.$$(DIV + ' a').href = app.button.link;
    wquery.$$(DIV + ' img').src = app.preview;
    wquery.empty(DIV + ' .features');
    var html = '<span><i class="icono-check"></i> {}</span>';
    app.features.forEach(function(feature) {
      wquery.append(DIV + ' .features', html.replace('{}', feature));
    });
  }


  /**
   * fetch information about the latest app.
   */
  request('/peak/app', function(data) {
    addLatestApp(data);
  });

})(_WQ);
