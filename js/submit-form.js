'use strict';

(function(){

    $(document).ready(function() {

      // declare globals
      var product_image = getCookie('product_image');
      var product_title = getCookie('product_title');
      var source = getCookie('source');
      var freebieTemplate, userInfoTemplate;

      // function to sanitize form inputs before submission
      function sanitizeString(str){
        str = str.replace(/[^a-z0-9áéíóúñü@# \.,_-]/gim,"");
        return str.trim();
      }

      // function to get cookie value by name
      function getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length == 2) { return parts.pop().split(';').shift(); }
      }

      // attach a submit handler to the form
      $('#signupForm').submit(function(event) {

        var url = 'http://submissions.herokuapp.com/api/submissions';
        var posting;

        // get values from elements on the page
        var $form = $( this );

        // stop form from submitting normally
        event.preventDefault();

        // sanitize inputs, find cookie form element, set to concatenated cookies
        $.each($form[0], function(index, element) {
          element.value = sanitizeString(element.value);

          if (!element.value) {

            // add error class to invalid or empty inputs
            $('#'+element.name).addClass('validation-error');
          } else {

            // remove errors for valid inputs
            $('#'+element.name).removeClass('validation-error');

            // attach user info to session storage for use in thank you page
            sessionStorage.setItem(element.name, element.value);

            // concatenate cookies, attach to cookie hidden field
            if (element.name === 'cookie') {
              element.value = 'image: ' + product_image +
                            ', title: ' + product_title +
                            ', source: ' + source;
            }
          }

        });

        // send the data with a post request
        posting = $.post( url, $form.serialize());

        // direct user to thank you page or handle errors
        posting.done(function( data ) {
          window.location.href = "/thank-you.html";
        }).fail(function(xhr, textStatus, errorThrown) {
          alert("Error submitting signup. Please enter missing fields and only use letters, numbers, and email formatting");
        });

      });

      // build freebie template
      freebieTemplate = '<div class="col-md-6 item-wrapper">' +
                          '<div class="item-container">' +
                            '<h4>You picked</h4>' +
                            '<hr>' +
                            '<img class="img-responsive product-image" src="' + product_image + '"/>' +
                            '<h4 class="title center-text">' + product_title + '</h4>' +
                          '</div>' +
                        '</div>';

      // show freebie
      $('#user-information').append(freebieTemplate);

      // attach user info to correct elements
      $('.name').html(sessionStorage.getItem('firstName'));
      $('#full-name').html(sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName'));
      $('#phone').html(sessionStorage.getItem('phone'));
      $('#email').html(sessionStorage.getItem('email'));
      $('#street').html(sessionStorage.getItem('street'));
      $('#city').html(sessionStorage.getItem('city'));
      $('#state').html(sessionStorage.getItem('state'));
      $('#zip').html(sessionStorage.getItem('zip'));

    });

})();
