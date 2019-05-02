import $ from 'jquery';

$( document ).ready( function ($) {
  var main = {
    init: function(){
      main.dom();
      main.events();
    },

    dom: function () {
      main.$contactForm = $('form#contact-form');
      main.$submit = $('#submit-form');
      main.$msgError = $('.error-message');
      main.$msgSuccess = $('.success-message');

      main.$form = document.forms["contact-form"];
      main.$name = main.$form["name"]; 
      main.$lastName = main.$form["last_name"];      
      main.$email = main.$form["email"];
      main.$message = main.$form["message"];
    },

    events: function () {      
      var url = 'https://script.google.com/macros/s/AKfycbyLFw6qF9-l5Bv9HXuWsvBN4hnQ3fRDGwFriYKWISfbQq72JWg3/exec'
      
      $(main.$submit).unbind('click.form-submit');
      $(main.$submit).on('click.form-submit', function(e) {
        e.preventDefault();
        var formValid = main.validateForm();

        if(formValid) {
          var $formData = {
            'name': main.$name.value,
            'last_name': main.$lastName.value,
            'email': main.$email.value,
            'message': main.$message.value
          }
          var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: $formData,
            encode: true
          }).done(function(data) {
            main.$msgError.removeClass('is-active');
            main.$msgSuccess.addClass('is-active');            
            main.$msgSuccess.delay(1000).fadeOut(3000);
            main.clearFields();
          })
          .fail(function(data) {
            main.$msgError.addClass('is-active');
            main.$msgSuccess.removeClass('is-active');
          });
        } else {
          main.$msgError.addClass('is-active');
          main.$msgSuccess.removeClass('is-active');
        }
      });
      
      $(main.$name).on('change', function() {
        main.validateText(main.$name);
      });

      $(main.$lastName).on('change', function() {
        main.validateText(main.$lastName);
      });

      $(main.$email).on('change', function() {
        main.validateText(main.$email);
      });

      $(main.$message).on('change', function() {
        main.validateText(main.$message);
      });
    },

    clearFields: function () {
      main.$name.value = '';
      main.$lastName.value = '';
      main.$email.value = '';
      main.$message.value = '';
    },

    validateForm: function () {
      main.$form = document.forms["contact-form"];
      main.$name = main.$form["name"]; 
      main.$lastName = main.$form["last_name"];      
      main.$email = main.$form["email"];
      main.$message = main.$form["message"];
      
      var nameValid = main.validateText(main.$name);
      var lastNameValid = main.validateText(main.$lastName);
      var emailValid = main.validateEmail(main.$email);
      var messageValid = main.validateText(main.$message);

      if(!nameValid || !lastNameValid || !emailValid || !messageValid) {
        return false;
      }
      return true;
    },

    validateText: function ($text) {
      var reg = /^[A-Za-z]+$/;

      if($text.name == "name") {
        if($text.value.length <= 2 || !reg.test($text.value)) {
          main.$name.classList.add('error');
          main.$name.previousElementSibling.classList.add('error');
          return false;
        } else {
          main.$name.classList.remove('error');
          main.$name.previousElementSibling.classList.remove('error');
        }
      } else if ($text.name == "last_name") {
        if($text.value.length <= 2 || !reg.test($text.value)) {
          main.$lastName.classList.add('error');
          main.$lastName.previousElementSibling.classList.add('error');
          return false;
        } else {
          main.$lastName.classList.remove('error');
          main.$lastName.previousElementSibling.classList.remove('error');
        }
      } else if ($text.name == "message") {
        if($text.value.length <= 20) {
          main.$message.classList.add('error');
          main.$message.previousElementSibling.classList.add('error');
          return false;
        } else {
          main.$message.classList.remove('error');
          main.$message.previousElementSibling.classList.remove('error');
        }
      }

      return true;
    },

    validateEmail: function (email) {
      var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      
      if(!reg.test(email.value) || email.value.length <= 0) {
        main.$email.classList.add('error');
        main.$email.previousElementSibling.classList.add('error');
        return false;
      } else {
        main.$email.classList.remove('error');
        main.$email.previousElementSibling.classList.remove('error');
        return true;
      }
    }
  }

  main.init();
});
