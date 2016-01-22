(function(wquery, scroll){

  window.app = {};
  app.LOADED = false;
  app.DATA = false;
  
  function load() {
    console.log('ok');
    if (!app.DATA || app.LOADED) {
      return;
    }
    
    app.LOADED = true;
    wquery.hide('.wspecs');
    if (false) {
     initialize();
   }
   else {
     loadPage();
   }

   var current_slide = 0;

   function setSlide(slide_number){
    wquery.empty('.welcome .center');
    wquery.append('.welcome .center', '<h1>' + app.DATA.landing[slide_number].title + '</h1>');
    wquery.append('.welcome .center', '<p>' + app.DATA.landing[slide_number].sub + '</p>');
    if (slide_number === 0){
      wquery.animate('.welcome .center h1', 'slide 5s ease-in');
    }
    wquery.animate('.welcome .center p', 'reveal_bottom 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards');
    current_slide = slide_number;
  }

  (function slideLoop(i){
    if (i >= app.DATA.landing.length){
      i = 0;
    }
    setSlide(i);
    setTimeout(function(){
      slideLoop(i + 1);
    }, 10000);
  })(0);

  function initialize(){
   wquery.empty('.line');
   wquery.append('.line', '<p>$ ' + app.DATA.console[0] + '</p>');

   (function theLoop (i) {
     setTimeout(function () {
       wquery.empty('.line');
       wquery.append('.past-line', '<p>$ ' + app.DATA.console[i-1] + '</p>');
       wquery.append('.line', '<p>$ ' + app.DATA.console[i] + '</p>');

       if (++i < app.DATA.console.length) {
         theLoop(i);
       }
       else {
         wquery.animate('.loader_page', 'start_page 2.5s 1');
         loadPage();
       }
     }, Math.floor((Math.random() * 1750) + 50));
   })(1);
 }

 function loadPage(){
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

var code_spans = document.querySelectorAll('.code span');
for (var i = 0; i < code_spans.length; i++) {
  code_spans[i].onclick = codeSpanClick;
}

function codeSpanClick(e){
  if (e.target.className !== "active"){
    var commands = wquery.$('.code span');
    for (var i = 0; i < commands.length; i++) {
      commands[i].className = "";
    }
    selectCommandInfo(e.target.id);
  }
}

function selectCommandInfo(selector){
  var index = parseInt(selector.replace("info-cmd-", ""));
  wquery.$$("#" + selector).className = "active";
  var paragraphs = app.DATA.specs.commands[index].content;
  wquery.empty("#welcome .info");
  for (var i = 0; i < paragraphs.length; i++) {
    wquery.append("#welcome .info", paragraphs[i], 'p');
  }

  paragraphs = wquery.$('.info p');
  for (i = 0; i < paragraphs.length; i++) {
   var paragraph = paragraphs[i];
   if (isElementInViewport(paragraph)){
     paragraph.style.animation = 'reveal_right 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
   }
 }
}

selectCommandInfo('info-cmd-2');

var nodes = document.querySelectorAll('.scroll');
for (var index in nodes){
  nodes[index].onclick = smoothScroll;
}

function smoothScroll(e){
  e.preventDefault();
  var id = (e.target.hash || e.target.name).replace("#", "");
  scroll.To(id);
  console.dir(scroll);
}

function scrollTo(element, to, duration) {
  if (duration < 0) {
    return;
  }
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) {
      return;
    }
    scrollTo(element, to, duration - 10);
  }, 10);
}

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

function animateWelcome(){
  var elements = wquery.$('.code span, .code span strong');
  for (var index = 0; index < elements.length; index++){
    var element = elements[index];
    if (isElementInViewport(element)){
      element.style.animation = 'reveal_left 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
    }
  }
}

function animateHeader(){
  var elements = wquery.$('.container h2');
  for (var index = 0; index < elements.length; index++){
    var element = elements[index];
    if (isElementInViewport(element)){
      element.style.animation = 'reveal_top 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
    }
  }
}

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

  elements = wquery.$('.action-button');
  for (index = 0; index < elements.length; index++){
   element = elements[index];
   if (isElementInViewport(element)){
     element.style.animation = 'reveal_bottom 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
   }
 }
}

function animateQuotes(){
  var element = wquery.$$('#quotes h3');
  if (isElementInViewport(element)){
    element.style.animation = 'reveal_within 2s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
  }
}

function animateServices(){
  var elements = wquery.$('#services .col-1-3');
  for (var index = 0; index < elements.length; index++){
    var element = elements[index];
    if (isElementInViewport(element)){
      element.style.animation = 'reveal_bottom 3s cubic-bezier(0, 1, 0.5, 1) 1 normal forwards';
    }
  }
}

function scrollHandler() {
  animateWelcome();
  animateHeader();
  animateAppsElements();
  animateQuotes();
  animateServices();
}

window.onscroll = scrollHandler;


} // End of laod function


request("app", function(data){
  app.DATA = JSON.parse(data);
  load();
});
document.addEventListener('DOMContentLoaded', load, false);
})(_WQ, scroll);
