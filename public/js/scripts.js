(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function unshiftShiftedElements(shiftedEls) {
  if (shiftedEls.length > 0) {
    /* Only necessary when overflow on body is initially set to hidden.
       Basically, .shifted elements add scrollbar to the browser, before they slide back up.
       But if a page is long, the scrollbar is necessary. 
       
        setTimeout(function(){
          document.body.style.overflow = 'auto';      
        }, shiftedEls.length * 300);
    */
    Array.prototype.forEach.call(shiftedEls, function (el, index) {
      setTimeout(function () {
        el.classList.remove('shifted');
        el.classList.add('unshifted');
      }, 55 * index * index);
    });
  }
}

exports.unshiftShiftedElements = unshiftShiftedElements;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ready;
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

},{}],3:[function(require,module,exports){
"use strict";

var _ready = require("./ready.js");

var _ready2 = _interopRequireDefault(_ready);

var _helpers = require("./helpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ready2.default)(function () {
  (0, _helpers.unshiftShiftedElements)(document.getElementsByClassName('shifted'));

  var el_urls_textarea = document.getElementById('urls'),
      el_cb_wrap_list = document.getElementById('cb-wrap-list'),
      el_cb_show_domain = document.getElementById('cb-show-domain'),
      el_textarea_urls = document.getElementById('urls');

  /* Read options saved in cookies. */

  if (Cookies.get('format')) {
    document.getElementById('format_' + Cookies.get('format')).checked = true;
  }

  if (Cookies.get('wrap-list') === 'yes') {
    el_cb_wrap_list.checked = true;
  } else {
    el_cb_wrap_list.checked = false;
  }

  if (Cookies.get('show-domain') === 'yes') {
    el_cb_show_domain.checked = true;
  } else {
    el_cb_show_domain.checked = false;
  }

  if (Cookies.get('urls')) {
    el_textarea_urls.value = Cookies.get('urls');
  }

  /* Event handlers */

  document.getElementById('submit-button').addEventListener('click', function (ev) {
    ev.preventDefault();
    if (el_urls_textarea.value.length > 0) {
      ev.target.innerHTML = 'Generating code...';
      ev.target.disabled = true;
      document.getElementById("main-form").submit();
    } else {
      alert('No URLs to process.');
      return false;
    }
  });

  el_textarea_urls.addEventListener('input', function () {
    Cookies.set('urls', el_textarea_urls.value);
  }, false);

  document.getElementById('format_html').addEventListener('click', function (ev) {
    Cookies.set('format', 'html');
  });

  document.getElementById('format_markdown').addEventListener('click', function (ev) {
    Cookies.set('format', 'markdown');
  });

  el_cb_wrap_list.addEventListener('click', function (ev) {
    if (el_cb_wrap_list.checked === true) {
      Cookies.set('wrap-list', 'yes');
    } else {
      Cookies.remove('wrap-list');
    }
  });

  el_cb_show_domain.addEventListener('click', function (ev) {
    if (el_cb_show_domain.checked === true) {
      Cookies.set('show-domain', 'yes');
    } else {
      Cookies.remove('show-domain');
    }
    console.log(Cookies.get('show-domain'));
  });
});

},{"./helpers.js":1,"./ready.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9oZWxwZXJzLmpzIiwic3JjL3NjcmlwdHMvcmVhZHkuanMiLCJzcmMvc2NyaXB0cy9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7O0FBRUEsU0FBUyxzQkFBVCxDQUFnQyxVQUFoQyxFQUEyQztBQUN6QyxNQUFJLFdBQVcsTUFBWCxHQUFvQixDQUF4QixFQUEwQjtBQUM1Qjs7Ozs7Ozs7QUFRSSxVQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FBd0IsSUFBeEIsQ0FBNkIsVUFBN0IsRUFBeUMsVUFBUyxFQUFULEVBQWEsS0FBYixFQUFvQjtBQUMzRCxpQkFDRSxZQUFVO0FBQ1IsV0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixTQUFwQjtBQUNBLFdBQUcsU0FBSCxDQUFhLEdBQWIsQ0FBaUIsV0FBakI7QUFDRCxPQUpILEVBS0UsS0FBRyxLQUFILEdBQVMsS0FMWDtBQU1ELEtBUEQ7QUFRRDtBQUNGOztRQUVPLHNCLEdBQUEsc0I7OztBQ3ZCUjs7Ozs7a0JBRXdCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxFQUFmLEVBQW1CO0FBQ2hDLE1BQUksU0FBUyxVQUFULEtBQXdCLFNBQTVCLEVBQXNDO0FBQ3BDO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsYUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsRUFBOUM7QUFDRDtBQUNGOzs7QUNSRDs7QUFFQTs7OztBQUNBOzs7O0FBRUEscUJBQU0sWUFBVTtBQUNkLHVDQUF1QixTQUFTLHNCQUFULENBQWdDLFNBQWhDLENBQXZCOztBQUVBLE1BQUksbUJBQW1CLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUF2QjtBQUFBLE1BQ0ksa0JBQWtCLFNBQVMsY0FBVCxDQUF3QixjQUF4QixDQUR0QjtBQUFBLE1BRUksb0JBQW9CLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsQ0FGeEI7QUFBQSxNQUdJLG1CQUFtQixTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FIdkI7O0FBS0E7O0FBRUEsTUFBSSxRQUFRLEdBQVIsQ0FBWSxRQUFaLENBQUosRUFBMEI7QUFDeEIsYUFBUyxjQUFULENBQXdCLFlBQVksUUFBUSxHQUFSLENBQVksUUFBWixDQUFwQyxFQUEyRCxPQUEzRCxHQUFxRSxJQUFyRTtBQUNEOztBQUVELE1BQUksUUFBUSxHQUFSLENBQVksV0FBWixNQUE2QixLQUFqQyxFQUF1QztBQUNyQyxvQkFBZ0IsT0FBaEIsR0FBMEIsSUFBMUI7QUFDRCxHQUZELE1BR0k7QUFDRixvQkFBZ0IsT0FBaEIsR0FBMEIsS0FBMUI7QUFDRDs7QUFFRCxNQUFJLFFBQVEsR0FBUixDQUFZLGFBQVosTUFBK0IsS0FBbkMsRUFBeUM7QUFDdkMsc0JBQWtCLE9BQWxCLEdBQTRCLElBQTVCO0FBQ0QsR0FGRCxNQUdJO0FBQ0Ysc0JBQWtCLE9BQWxCLEdBQTRCLEtBQTVCO0FBQ0Q7O0FBRUQsTUFBSSxRQUFRLEdBQVIsQ0FBWSxNQUFaLENBQUosRUFBd0I7QUFDdEIscUJBQWlCLEtBQWpCLEdBQXlCLFFBQVEsR0FBUixDQUFZLE1BQVosQ0FBekI7QUFDRDs7QUFFRDs7QUFFQSxXQUFTLGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLFVBQVMsRUFBVCxFQUFZO0FBQzdFLE9BQUcsY0FBSDtBQUNBLFFBQUksaUJBQWlCLEtBQWpCLENBQXVCLE1BQXZCLEdBQWdDLENBQXBDLEVBQXNDO0FBQ3BDLFNBQUcsTUFBSCxDQUFVLFNBQVYsR0FBc0Isb0JBQXRCO0FBQ0EsU0FBRyxNQUFILENBQVUsUUFBVixHQUFxQixJQUFyQjtBQUNBLGVBQVMsY0FBVCxDQUF3QixXQUF4QixFQUFxQyxNQUFyQztBQUNELEtBSkQsTUFLSTtBQUNGLFlBQU0scUJBQU47QUFDQSxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBWEQ7O0FBY0EsbUJBQWlCLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQyxZQUFXO0FBQ3BELFlBQVEsR0FBUixDQUFZLE1BQVosRUFBb0IsaUJBQWlCLEtBQXJDO0FBQ0QsR0FGRCxFQUVHLEtBRkg7O0FBS0EsV0FBUyxjQUFULENBQXdCLGFBQXhCLEVBQXVDLGdCQUF2QyxDQUF3RCxPQUF4RCxFQUFpRSxVQUFTLEVBQVQsRUFBWTtBQUMzRSxZQUFRLEdBQVIsQ0FBWSxRQUFaLEVBQXNCLE1BQXRCO0FBQ0QsR0FGRDs7QUFJQSxXQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDLGdCQUEzQyxDQUE0RCxPQUE1RCxFQUFxRSxVQUFTLEVBQVQsRUFBWTtBQUMvRSxZQUFRLEdBQVIsQ0FBWSxRQUFaLEVBQXNCLFVBQXRCO0FBQ0QsR0FGRDs7QUFJQSxrQkFBZ0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFVBQVMsRUFBVCxFQUFZO0FBQ3BELFFBQUksZ0JBQWdCLE9BQWhCLEtBQTRCLElBQWhDLEVBQXFDO0FBQ25DLGNBQVEsR0FBUixDQUFZLFdBQVosRUFBeUIsS0FBekI7QUFDRCxLQUZELE1BR0k7QUFDRixjQUFRLE1BQVIsQ0FBZSxXQUFmO0FBQ0Q7QUFDRixHQVBEOztBQVNBLG9CQUFrQixnQkFBbEIsQ0FBbUMsT0FBbkMsRUFBNEMsVUFBUyxFQUFULEVBQVk7QUFDdEQsUUFBSSxrQkFBa0IsT0FBbEIsS0FBOEIsSUFBbEMsRUFBdUM7QUFDckMsY0FBUSxHQUFSLENBQVksYUFBWixFQUEyQixLQUEzQjtBQUNELEtBRkQsTUFHSTtBQUNGLGNBQVEsTUFBUixDQUFlLGFBQWY7QUFDRDtBQUNELFlBQVEsR0FBUixDQUFZLFFBQVEsR0FBUixDQUFZLGFBQVosQ0FBWjtBQUNELEdBUkQ7QUFTRCxDQS9FRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gdW5zaGlmdFNoaWZ0ZWRFbGVtZW50cyhzaGlmdGVkRWxzKXtcbiAgaWYgKHNoaWZ0ZWRFbHMubGVuZ3RoID4gMCl7XG4vKiBPbmx5IG5lY2Vzc2FyeSB3aGVuIG92ZXJmbG93IG9uIGJvZHkgaXMgaW5pdGlhbGx5IHNldCB0byBoaWRkZW4uXG4gICBCYXNpY2FsbHksIC5zaGlmdGVkIGVsZW1lbnRzIGFkZCBzY3JvbGxiYXIgdG8gdGhlIGJyb3dzZXIsIGJlZm9yZSB0aGV5IHNsaWRlIGJhY2sgdXAuXG4gICBCdXQgaWYgYSBwYWdlIGlzIGxvbmcsIHRoZSBzY3JvbGxiYXIgaXMgbmVjZXNzYXJ5LiBcbiAgIFxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7ICAgICAgXG4gICAgfSwgc2hpZnRlZEVscy5sZW5ndGggKiAzMDApO1xuKi8gICAgXG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChzaGlmdGVkRWxzLCBmdW5jdGlvbihlbCwgaW5kZXgpIHtcbiAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpZnRlZCcpO1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3Vuc2hpZnRlZCcpO1xuICAgICAgICB9LFxuICAgICAgICA1NSppbmRleCppbmRleCk7XG4gICAgfSk7XG4gIH0gIFxufVxuXG5leHBvcnQge3Vuc2hpZnRTaGlmdGVkRWxlbWVudHN9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWFkeShmbikge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKXtcbiAgICBmbigpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmbik7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgcmVhZHkgZnJvbSBcIi4vcmVhZHkuanNcIjtcbmltcG9ydCB7dW5zaGlmdFNoaWZ0ZWRFbGVtZW50c30gZnJvbSBcIi4vaGVscGVycy5qc1wiO1xuXG5yZWFkeShmdW5jdGlvbigpe1xuICB1bnNoaWZ0U2hpZnRlZEVsZW1lbnRzKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NoaWZ0ZWQnKSk7XG4gIFxuICB2YXIgZWxfdXJsc190ZXh0YXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmxzJyksXG4gICAgICBlbF9jYl93cmFwX2xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Itd3JhcC1saXN0JyksXG4gICAgICBlbF9jYl9zaG93X2RvbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYi1zaG93LWRvbWFpbicpLFxuICAgICAgZWxfdGV4dGFyZWFfdXJscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cmxzJyk7XG4gIFxuICAvKiBSZWFkIG9wdGlvbnMgc2F2ZWQgaW4gY29va2llcy4gKi9cbiAgXG4gIGlmIChDb29raWVzLmdldCgnZm9ybWF0Jykpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtYXRfJyArIENvb2tpZXMuZ2V0KCdmb3JtYXQnKSkuY2hlY2tlZCA9IHRydWU7XG4gIH1cblxuICBpZiAoQ29va2llcy5nZXQoJ3dyYXAtbGlzdCcpID09PSAneWVzJyl7XG4gICAgZWxfY2Jfd3JhcF9saXN0LmNoZWNrZWQgPSB0cnVlO1xuICB9XG4gIGVsc2V7XG4gICAgZWxfY2Jfd3JhcF9saXN0LmNoZWNrZWQgPSBmYWxzZTsgICAgXG4gIH1cblxuICBpZiAoQ29va2llcy5nZXQoJ3Nob3ctZG9tYWluJykgPT09ICd5ZXMnKXtcbiAgICBlbF9jYl9zaG93X2RvbWFpbi5jaGVja2VkID0gdHJ1ZTtcbiAgfVxuICBlbHNle1xuICAgIGVsX2NiX3Nob3dfZG9tYWluLmNoZWNrZWQgPSBmYWxzZTsgICAgXG4gIH1cbiAgXG4gIGlmIChDb29raWVzLmdldCgndXJscycpKXtcbiAgICBlbF90ZXh0YXJlYV91cmxzLnZhbHVlID0gQ29va2llcy5nZXQoJ3VybHMnKTsgIFxuICB9XG4gIFxuICAvKiBFdmVudCBoYW5kbGVycyAqL1xuICBcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChlbF91cmxzX3RleHRhcmVhLnZhbHVlLmxlbmd0aCA+IDApe1xuICAgICAgZXYudGFyZ2V0LmlubmVySFRNTCA9ICdHZW5lcmF0aW5nIGNvZGUuLi4nO1xuICAgICAgZXYudGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1mb3JtXCIpLnN1Ym1pdCgpOyAgICBcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIGFsZXJ0KCdObyBVUkxzIHRvIHByb2Nlc3MuJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgXG4gIFxuICBlbF90ZXh0YXJlYV91cmxzLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgQ29va2llcy5zZXQoJ3VybHMnLCBlbF90ZXh0YXJlYV91cmxzLnZhbHVlKTtcbiAgfSwgZmFsc2UpO1xuXG4gIFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybWF0X2h0bWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICBDb29raWVzLnNldCgnZm9ybWF0JywgJ2h0bWwnKTtcbiAgfSk7XG4gIFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybWF0X21hcmtkb3duJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgQ29va2llcy5zZXQoJ2Zvcm1hdCcsICdtYXJrZG93bicpO1xuICB9KTsgIFxuICBcbiAgZWxfY2Jfd3JhcF9saXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgIGlmIChlbF9jYl93cmFwX2xpc3QuY2hlY2tlZCA9PT0gdHJ1ZSl7XG4gICAgICBDb29raWVzLnNldCgnd3JhcC1saXN0JywgJ3llcycpOyAgICBcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIENvb2tpZXMucmVtb3ZlKCd3cmFwLWxpc3QnKTsgICAgXG4gICAgfVxuICB9KTtcbiAgXG4gIGVsX2NiX3Nob3dfZG9tYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgIGlmIChlbF9jYl9zaG93X2RvbWFpbi5jaGVja2VkID09PSB0cnVlKXtcbiAgICAgIENvb2tpZXMuc2V0KCdzaG93LWRvbWFpbicsICd5ZXMnKTsgICAgXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBDb29raWVzLnJlbW92ZSgnc2hvdy1kb21haW4nKTsgICAgXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKENvb2tpZXMuZ2V0KCdzaG93LWRvbWFpbicpKTtcbiAgfSk7XG59KTtcbiJdfQ==
