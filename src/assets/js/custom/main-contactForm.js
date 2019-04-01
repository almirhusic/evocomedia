import $ from 'jquery';

$( document ).ready( function ($) {
  var main = {
    init: function(){
      main.dom();
      main.events();
    },

    dom: function () {
      main.$contactForm = $('form#test-form');
      main.$submit = $('#submit-form');
    },

    events: function () {      
      var $form = main.$contactForm,
          url = 'https://script.google.com/macros/s/AKfycbyLFw6qF9-l5Bv9HXuWsvBN4hnQ3fRDGwFriYKWISfbQq72JWg3/exec'

      $(main.$submit).on('click', function(e) {
        e.preventDefault();
        var jqxhr = $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          data: $form.serialize(),
          success: location.reload()
        });
      })
    }
  }

  main.init();
});
