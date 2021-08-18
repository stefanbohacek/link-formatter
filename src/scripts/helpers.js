"use strict";

function unshiftShiftedElements(shiftedEls){
  if (shiftedEls.length > 0){
/* Only necessary when overflow on body is initially set to hidden.
   Basically, .shifted elements add scrollbar to the browser, before they slide back up.
   But if a page is long, the scrollbar is necessary. 
   
    setTimeout(function(){
      document.body.style.overflow = 'auto';      
    }, shiftedEls.length * 300);
*/    
    Array.prototype.forEach.call(shiftedEls, function(el, index) {
      setTimeout(
        function(){
          el.classList.remove('shifted');
          el.classList.add('unshifted');
        },
        10*index*index);
    });
  }  
}

export {unshiftShiftedElements};