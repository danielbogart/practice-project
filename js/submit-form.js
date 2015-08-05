(function(){

    $(document).ready(function() {

      // attach a submit handler to the form
      $("#signupForm").submit(function(event) {

        // stop form from submitting normally
        event.preventDefault();

        // get values from elements on the page
        var $form = $( this );
        var url = "http://submissions.herokuapp.com/api/submissions";

        // pure javascript function to get cookie value by name
        function getCookie(name) {
          var value = "; " + document.cookie;
          var parts = value.split("; " + name + "=");
          if (parts.length == 2) return parts.pop().split(";").shift();
        }

        $form[0][8].value = "DB";
        $form[0][9].value = getCookie("product_image") + getCookie("product_title") + getCookie("source");

        console.log($form[0][9].value);

        // send the data with a post request
        var posting = $.post( url, $form.serialize());

        // alert that form was submitted
        posting.done(function( data ) {
          alert('Successfully submitted form');
        }).fail(function() {
          alert( "Error submitting form" );
        });
      });

    });

})();
