(function(wquery, scroll){

   var SLIDES = [];
   var DIV = '.welcome .center';
   var LOOP_TIME = 10000;

   /**
    * Emphasize one of the word from wpecs's model and show its subtitle.
    * @param {!number} slideNumber
    * @param {[{title: string, sub: string}]} slides
    */
   function setSlide(slideNumber, slides){
    slides = slides || SLIDES;
    wquery.empty(DIV);
    wquery.append(DIV, '<h1>' + slides[slideNumber].title + '</h1>');
    wquery.append(DIV, '<p>' + slides[slideNumber].sub + '</p>');
    if (slideNumber === 0){
      wquery.animate(DIV + ' h1', 'slide 5s ease-in');
    }
    var animation = 'reveal_bottom 2s cubic-bezier(0, 1, 0.5, 1) ' +
                    '1 normal forwards';
    wquery.animate(DIV + ' p', animation);
  }

   /**
    * Run Inspire, Improve, Server animation.
    * Self calling loop inside the function.
    */
   function startSlides() {
     (function slideLoop(i){
       if (i >= SLIDES.length){
          i = 0;
        }
        setSlide(i);
        setTimeout(function(){
          slideLoop(i + 1);
        }, LOOP_TIME);
     })(0);
   }
   app.startSlides = startSlides;


   /**
    * Fetch data to set landing page information.
    */
   request('/landing', function(data) {
     SLIDES = data;
     startSlides();
     app.scrollClick();
   });

})(_WQ, scroll);
