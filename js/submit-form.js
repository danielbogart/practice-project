(function(){

    $(document).ready(function() {

      // attach a submit handler to the form
      $('#signupForm').submit(function(event) {

        // stop form from submitting normally
        event.preventDefault();

        // get values from elements on the page
        var $form = $( this );
        var url = 'http://submissions.herokuapp.com/api/submissions';

        // function to get cookie value by name
        function getCookie(name) {
          var value = '; ' + document.cookie;
          var parts = value.split('; ' + name + '=');
          if (parts.length == 2) return parts.pop().split(';').shift();
        }

        $.each($form[0], function(index, element) {
          if (element.name === 'applicant') {
            element.value = 'DB';
          }
          else if (element.name === 'cookie') {
            element.value = 'image: ' + getCookie('product_image')
                            + 'title: ' + getCookie('product_title')
                            + 'source: ' + getCookie('source');
          }
        });

        console.log($form.serialize());

        // send the data with a post request
        var posting = $.post( url, $form.serialize());

        // alert that form was submitted
        posting.done(function( data ) {
          alert('Successfully submitted form');
        }).fail(function() {
          alert( 'Error submitting form' );
        });
      });

    });

})();
