(function(wquery, scroll){

  /**
   * Create page loading effect with fade out like old TV shutting down.
   */
  function animatePage(){
    wquery.animate('.line', 'quickhide 3s linear');
    wquery.animate('.loader-container', 'hide 3s linear');
    wquery.animate('.past-line', 'quickhide 3s ease-out');
    wquery.animate('.wspecs', 'show 3s ease-in');

    setTimeout(function(){
      wquery.show('.wspecs');
    }, 1000);

    setTimeout(function(){
      wquery.hide('.loader_page');
    }, 3000);
  }


  /**
   * Check to see if a HTML is on the screen.
   * @param {HTMLElement} element
   * @return {boolean}
   */
  function isElementInViewport (element) {
    var rect = element.getBoundingClientRect();
    var diff = rect.bottom - rect.top;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= diff + (window.innerHeight || document.documentElement.clientHeight) && 
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }


  /**
   * Create animation for codeblock information.
   */
  function animateWelcome(){
    var elements = wquery.$('.code span, .code span strong');
    for (var index = 0; index < elements.length; index++){
      var element = elements[index];
      if (isElementInViewport(element)){
        element.style.animation = 'reveal_left 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
      }
    }
  }


  /**
   * Slowing ease appliction headers from the top.
   */
  function animateHeader(){
    var elements = wquery.$('.container h2');
    for (var index = 0; index < elements.length; index++){
      var element = elements[index];
      if (isElementInViewport(element)){
        element.style.animation = 'reveal_top 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
      }
    }
  }


  /**
   * Show animation for latest app. Ease image and app's feature.
   */
  function animateAppsElements(){
    var element = wquery.$$('#apps h3');
    if (isElementInViewport(element)){
      element.style.animation = 'reveal_left 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
    }

    element = wquery.$$('#apps h4');
    if (isElementInViewport(element)){
      element.style.animation = 'reveal_left 2.5s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
    }

    element = wquery.$$('#apps p');
    if (isElementInViewport(element)){
      element.style.animation = 'reveal_left 2.5s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
    }

    element = wquery.$$('#apps img');
    if (isElementInViewport(element)){
      element.style.animation = 'reveal_right 2.5s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
    }

    var elements = wquery.$('#apps span');
    for (var index = 0; index < elements.length; index++){
      element = elements[index];
      if (isElementInViewport(element)){
        element.style.animation = 'reveal_left 4s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
      }
    }
    animateActionButton();
  }

  /**
   * Make action button float from the bottom of the page.
   */
  function animateActionButton() {
    var elements = wquery.$('.action-button');
    var animation = 'reveal_bottom 2s cubic-bezier(0, 1, 0.5, 1) 1 normal ' + 
                    'forwards'
    for (index = 0; index < elements.length; index++){
      element = elements[index];
      if (isElementInViewport(element)){
        element.style.animation = animation
      }
   }
  }


  /**
   * Show quote from center of page.
   */
  function animateQuotes(){
    var element = wquery.$$('#quotes h3');
    if (isElementInViewport(element)){
      element.style.animation = 'reveal_within 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
    }
  }


  /**
   * Show service blocks by easing them from the bottom.
   */
  function animateServices(){
    var elements = wquery.$('#services .col-1-3');
    for (var index = 0; index < elements.length; index++){
      var element = elements[index];
      if (isElementInViewport(element)){
        element.style.animation = 'reveal_bottom 3s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
      }
    }
  }


  /**
   * Slowing ease appliction headers from the top.
   */
  function animateCodeInfo() {
    var paragraphs = wquery.$('.info p');
    var animation = 'reveal_right 2s cubic-bezier(0, 1, 0.5, 1) 1 normal ' +
                    'forwards';
    for (i = 0; i < paragraphs.length; i++) {
       var paragraph = paragraphs[i];
       if (isElementInViewport(paragraph)){
         paragraph.style.animation = animation;
       }
     }
  }


  /**
   * Apply neccearry animation when user scroll the page.
   */
  function scrollHandler() {
    animateCodeInfo();
    animateHeader();
    animateWelcome();
    animateAppsElements();
    animateActionButton();
    animateQuotes();
    animateServices();
  }

  app.animatePage = animatePage;
  app.animateActionButton = animateActionButton;
  app.animateCodeInfo = animateCodeInfo;
  app.animateServices = animateServices;
  app.animate = function() {
    window.onscroll = scrollHandler;
  }

})(_WQ, scroll);
