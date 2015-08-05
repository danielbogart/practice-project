'use strict';

(function(){

    $(document).ready(function() {

        // declare vars to be used
        var itemOutput = '';
        var responseData;
        var freeItemData = 'http://www.getitfree.us/api/posts.json?filter=popular&limit=8';

        $.getJSON( freeItemData, {
            format: "json"
        }).done(function(response) {

            // set global responseData to JSON response for use in product cookie
            responseData = response;

            // build html for each free sample option
            $.each(response.data, function(index, value) {
                itemOutput += '<div class="col-md-3 item-wrapper">'
                              + '<div class="item-container">'
                                + '<img class="img-responsive product-image" src="' + value.images["0"] + '"/>'
                                + '<h4 class="title center-text">' + value.title + '</h4>'
                                + '<div class="description">' + value.description + '</div>'
                                + '<a href="/signup.html" class="item-link" id="product-' + value.id + '">'
                                  + '<button class="btn btn-md btn-danger">Claim This Freebie</button>'
                                + '</a>'
                              + '</div>'
                            + '</div>';
            });

            // append to gif-results div
            $(itemOutput).appendTo("#gif-results");

        });

        function setProductCookies(id){
          var product_id = id.slice(8);

          $.each(responseData.data, function(index, value) {
            if (value.id === product_id) {
              document.cookie='product_image=' + value.images['0'];
              document.cookie='product_title=' + value.meta_title;
            }
          });
        }

        $('#landing-page').on('click', '.item-link', function(){
          setProductCookies(this.id);
        });

    });

})();
