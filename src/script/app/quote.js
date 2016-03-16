(function(wquery){

  var DIV = '#quotes';

  /**
   * @param {!{
   *  !quote: string,
   *  !author: string,
   *  info: string
   * }} quote
   */
  function addQuoteDuJour(quote) {
    wquery.html(DIV + ' h3', quote.quote);
    var html = '<span>' + quote.author + '</span> ' + quote.info;
    wquery.html(DIV + ' p', html);
  }


  /**
   * Fetch quotes to populate quote du jour.
   */
  request('/peak/quote', function(data) {
    addQuoteDuJour(data);
  });

})(_WQ);
