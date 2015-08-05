'use strict';

(function(){

    $(document).ready(function() {

      // call function on page load
      setSourceCookie();

      function setSourceCookie() {
          var url = window.location.href;

          // set source cookie for the three options
          if(url.indexOf('?source=Facebook') !== -1) {
            document.cookie='source=Facebook';
          } else if(url.indexOf('?source=Google') !== -1) {
            document.cookie='source=Google';
          } else if(url.indexOf('?source=Twitter') !== -1) {
            document.cookie='source=Twitter';
          } else {
            document.cookie='source=No source specified';
          }
      }

    });

})();
