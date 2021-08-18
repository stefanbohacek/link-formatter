(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      }, 10 * index * index);
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
    Cookies.set('urls', el_textarea_urls.value, { expires: 7 });
  }, false);

  document.getElementById('format_html').addEventListener('click', function (ev) {
    Cookies.set('format', 'html', { expires: 7 });
  });

  document.getElementById('format_markdown').addEventListener('click', function (ev) {
    Cookies.set('format', 'markdown', { expires: 7 });
  });

  el_cb_wrap_list.addEventListener('click', function (ev) {
    if (el_cb_wrap_list.checked === true) {
      Cookies.set('wrap-list', 'yes', { expires: 7 });
    } else {
      Cookies.remove('wrap-list');
    }
  });

  el_cb_show_domain.addEventListener('click', function (ev) {
    if (el_cb_show_domain.checked === true) {
      Cookies.set('show-domain', 'yes', { expires: 7 });
    } else {
      Cookies.remove('show-domain');
    }
    console.log(Cookies.get('show-domain'));
  });
});

},{"./helpers.js":1,"./ready.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3JiZC9wbnBtLXZvbHVtZS8zN2E2NTRiOS1hNTJjLTRmOWMtOWZhYi04MjgyNGU4NTZiMzMvbm9kZV9tb2R1bGVzLy5yZWdpc3RyeS5ucG1qcy5vcmcvYnJvd3Nlci1wYWNrLzYuMS4wL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9oZWxwZXJzLmpzIiwic3JjL3NjcmlwdHMvcmVhZHkuanMiLCJzcmMvc2NyaXB0cy9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7O0FBRUEsU0FBUyxzQkFBVCxDQUFnQyxVQUFoQyxFQUEyQztBQUN6QyxNQUFJLFdBQVcsTUFBWCxHQUFvQixDQUF4QixFQUEwQjtBQUM1Qjs7Ozs7Ozs7QUFRSSxVQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsQ0FBd0IsSUFBeEIsQ0FBNkIsVUFBN0IsRUFBeUMsVUFBUyxFQUFULEVBQWEsS0FBYixFQUFvQjtBQUMzRCxpQkFDRSxZQUFVO0FBQ1IsV0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixTQUFwQjtBQUNBLFdBQUcsU0FBSCxDQUFhLEdBQWIsQ0FBaUIsV0FBakI7QUFDRCxPQUpILEVBS0UsS0FBRyxLQUFILEdBQVMsS0FMWDtBQU1ELEtBUEQ7QUFRRDtBQUNGOztRQUVPLHNCLEdBQUEsc0I7OztBQ3ZCUjs7Ozs7a0JBRXdCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxFQUFmLEVBQW1CO0FBQ2hDLE1BQUksU0FBUyxVQUFULEtBQXdCLFNBQTVCLEVBQXNDO0FBQ3BDO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsYUFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsRUFBOUM7QUFDRDtBQUNGOzs7QUNSRDs7QUFFQTs7OztBQUNBOzs7O0FBRUEscUJBQU0sWUFBVTtBQUNkLE1BQUksbUJBQW1CLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUF2QjtBQUFBLE1BQ0ksa0JBQWtCLFNBQVMsY0FBVCxDQUF3QixjQUF4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LGFBQVosQ0FBWjtBQUNELEdBUkQ7QUFTRCxDQTdFRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiB1bnNoaWZ0U2hpZnRlZEVsZW1lbnRzKHNoaWZ0ZWRFbHMpe1xuICBpZiAoc2hpZnRlZEVscy5sZW5ndGggPiAwKXtcbi8qIE9ubHkgbmVjZXNzYXJ5IHdoZW4gb3ZlcmZsb3cgb24gYm9keSBpcyBpbml0aWFsbHkgc2V0IHRvIGhpZGRlbi5cbiAgIEJhc2ljYWxseSwgLnNoaWZ0ZWQgZWxlbWVudHMgYWRkIHNjcm9sbGJhciB0byB0aGUgYnJvd3NlciwgYmVmb3JlIHRoZXkgc2xpZGUgYmFjayB1cC5cbiAgIEJ1dCBpZiBhIHBhZ2UgaXMgbG9uZywgdGhlIHNjcm9sbGJhciBpcyBuZWNlc3NhcnkuIFxuICAgXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJzsgICAgICBcbiAgICB9LCBzaGlmdGVkRWxzLmxlbmd0aCAqIDMwMCk7XG4qLyAgICBcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHNoaWZ0ZWRFbHMsIGZ1bmN0aW9uKGVsLCBpbmRleCkge1xuICAgICAgc2V0VGltZW91dChcbiAgICAgICAgZnVuY3Rpb24oKXtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlmdGVkJyk7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndW5zaGlmdGVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIDEwKmluZGV4KmluZGV4KTtcbiAgICB9KTtcbiAgfSAgXG59XG5cbmV4cG9ydCB7dW5zaGlmdFNoaWZ0ZWRFbGVtZW50c307IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlYWR5KGZuKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpe1xuICAgIGZuKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuKTtcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByZWFkeSBmcm9tIFwiLi9yZWFkeS5qc1wiO1xuaW1wb3J0IHt1bnNoaWZ0U2hpZnRlZEVsZW1lbnRzfSBmcm9tIFwiLi9oZWxwZXJzLmpzXCI7XG5cbnJlYWR5KGZ1bmN0aW9uKCl7XG4gIHZhciBlbF91cmxzX3RleHRhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKSxcbiAgICAgIGVsX2NiX3dyYXBfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYi13cmFwLWxpc3QnKSxcbiAgICAgIGVsX2NiX3Nob3dfZG9tYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NiLXNob3ctZG9tYWluJyksXG4gICAgICBlbF90ZXh0YXJlYV91cmxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VybHMnKTtcbiAgXG4gIC8qIFJlYWQgb3B0aW9ucyBzYXZlZCBpbiBjb29raWVzLiAqL1xuICBcbiAgaWYgKENvb2tpZXMuZ2V0KCdmb3JtYXQnKSl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1hdF8nICsgQ29va2llcy5nZXQoJ2Zvcm1hdCcpKS5jaGVja2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChDb29raWVzLmdldCgnd3JhcC1saXN0JykgPT09ICd5ZXMnKXtcbiAgICBlbF9jYl93cmFwX2xpc3QuY2hlY2tlZCA9IHRydWU7XG4gIH1cbiAgZWxzZXtcbiAgICBlbF9jYl93cmFwX2xpc3QuY2hlY2tlZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKENvb2tpZXMuZ2V0KCdzaG93LWRvbWFpbicpID09PSAneWVzJyl7XG4gICAgZWxfY2Jfc2hvd19kb21haW4uY2hlY2tlZCA9IHRydWU7XG4gIH1cbiAgZWxzZXtcbiAgICBlbF9jYl9zaG93X2RvbWFpbi5jaGVja2VkID0gZmFsc2U7XG4gIH1cbiAgXG4gIGlmIChDb29raWVzLmdldCgndXJscycpKXtcbiAgICBlbF90ZXh0YXJlYV91cmxzLnZhbHVlID0gQ29va2llcy5nZXQoJ3VybHMnKTsgIFxuICB9XG4gIFxuICAvKiBFdmVudCBoYW5kbGVycyAqL1xuICBcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdC1idXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChlbF91cmxzX3RleHRhcmVhLnZhbHVlLmxlbmd0aCA+IDApe1xuICAgICAgZXYudGFyZ2V0LmlubmVySFRNTCA9ICdHZW5lcmF0aW5nIGNvZGUuLi4nO1xuICAgICAgZXYudGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1mb3JtXCIpLnN1Ym1pdCgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgYWxlcnQoJ05vIFVSTHMgdG8gcHJvY2Vzcy4nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgXG4gIGVsX3RleHRhcmVhX3VybHMuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICBDb29raWVzLnNldCgndXJscycsIGVsX3RleHRhcmVhX3VybHMudmFsdWUsIHsgZXhwaXJlczogNyB9KTtcbiAgfSwgZmFsc2UpO1xuXG4gIFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybWF0X2h0bWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICBDb29raWVzLnNldCgnZm9ybWF0JywgJ2h0bWwnLCB7IGV4cGlyZXM6IDcgfSk7XG4gIH0pO1xuICBcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1hdF9tYXJrZG93bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgIENvb2tpZXMuc2V0KCdmb3JtYXQnLCAnbWFya2Rvd24nLCB7IGV4cGlyZXM6IDcgfSk7XG4gIH0pOyAgXG4gIFxuICBlbF9jYl93cmFwX2xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgaWYgKGVsX2NiX3dyYXBfbGlzdC5jaGVja2VkID09PSB0cnVlKXtcbiAgICAgIENvb2tpZXMuc2V0KCd3cmFwLWxpc3QnLCAneWVzJywgeyBleHBpcmVzOiA3IH0pO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgQ29va2llcy5yZW1vdmUoJ3dyYXAtbGlzdCcpO1xuICAgIH1cbiAgfSk7XG4gIFxuICBlbF9jYl9zaG93X2RvbWFpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICBpZiAoZWxfY2Jfc2hvd19kb21haW4uY2hlY2tlZCA9PT0gdHJ1ZSl7XG4gICAgICBDb29raWVzLnNldCgnc2hvdy1kb21haW4nLCAneWVzJywgeyBleHBpcmVzOiA3IH0pO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgQ29va2llcy5yZW1vdmUoJ3Nob3ctZG9tYWluJyk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKENvb2tpZXMuZ2V0KCdzaG93LWRvbWFpbicpKTtcbiAgfSk7XG59KTtcbiJdfQ==
