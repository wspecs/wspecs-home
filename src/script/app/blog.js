(function(wquery){

  var BLOGS = [];
  var DIV = '#blog';

  /**
   * @param {{
   *  img: string,
   *  title: string,
   *  author: string,
   *  time: string,
   *  link: string
   * }} blog
   * @return {string}
   */
  function blogHtml(blog) {
    var html = '<div class="col-1-3">';
    html += '<img src="' + blog.img + '" alt="' + blog.title + '">';
    html += '<div class="summary">';
    html += '<h3>' + blog.title + '</h3>';
    html += '<h6>';
    html += '<i class="icon-author"></i> ' + blog.author;
    html += '<i class="icon-date"></i> ' + app.formatDate(blog.time);
    html += '</h6>';
    html += '<p>' + blog.summary + '</p>';
    html += '<a class="action-button" href="' + blog.link + '" ';
    html += 'target="_blank">READ</a>';
    html += '</div>';
    html += '</div>';
    return html;
  }


  /**
   * @param {[{
   *  img: string,
   *  title: string,
   *  author: string,
   *  time: string,
   *  link: string
   * }]} blogs
   */
  function addBlogs(blogs) {
    var blogPeak = blogs || BLOGS;
    blogPeak.forEach(function(blog) {
      wquery.append(DIV + ' .row', blogHtml(blog));
    });
  }


  /**
   * Fetch latest blog info.
   */
  request('/peak/post', function(data) {
    BLOGS = data
    addBlogs();
    app.animateActionButton();
  });

})(_WQ);
