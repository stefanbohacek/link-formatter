"use strict";

import ready from "./ready.js";
import {unshiftShiftedElements} from "./helpers.js";

ready(function(){
  var el_urls_textarea = document.getElementById('urls'),
      el_cb_wrap_list = document.getElementById('cb-wrap-list'),
      el_cb_show_domain = document.getElementById('cb-show-domain'),
      el_textarea_urls = document.getElementById('urls');
  
  /* Read options saved in cookies. */
  
  if (Cookies.get('format')){
    document.getElementById('format_' + Cookies.get('format')).checked = true;
  }

  if (Cookies.get('wrap-list') === 'yes'){
    el_cb_wrap_list.checked = true;
  }
  else{
    el_cb_wrap_list.checked = false;
  }

  if (Cookies.get('show-domain') === 'yes'){
    el_cb_show_domain.checked = true;
  }
  else{
    el_cb_show_domain.checked = false;
  }
  
  if (Cookies.get('urls')){
    el_textarea_urls.value = Cookies.get('urls');  
  }
  
  /* Event handlers */
  
  document.getElementById('submit-button').addEventListener('click', function(ev){
    ev.preventDefault();
    if (el_urls_textarea.value.length > 0){
      ev.target.innerHTML = 'Generating code...';
      ev.target.disabled = true;
      document.getElementById("main-form").submit();
    }
    else{
      alert('No URLs to process.');
      return false;
    }
  });
  
  
  el_textarea_urls.addEventListener('input', function() {
    Cookies.set('urls', el_textarea_urls.value, { expires: 7 });
  }, false);

  
  document.getElementById('format_html').addEventListener('click', function(ev){
    Cookies.set('format', 'html', { expires: 7 });
  });
  
  document.getElementById('format_markdown').addEventListener('click', function(ev){
    Cookies.set('format', 'markdown', { expires: 7 });
  });  
  
  el_cb_wrap_list.addEventListener('click', function(ev){
    if (el_cb_wrap_list.checked === true){
      Cookies.set('wrap-list', 'yes', { expires: 7 });
    }
    else{
      Cookies.remove('wrap-list');
    }
  });
  
  el_cb_show_domain.addEventListener('click', function(ev){
    if (el_cb_show_domain.checked === true){
      Cookies.set('show-domain', 'yes', { expires: 7 });
    }
    else{
      Cookies.remove('show-domain');
    }
    console.log(Cookies.get('show-domain'));
  });
});
