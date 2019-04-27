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
      main.msg = '';

      main.$form = document.forms["contact-form"];
      main.$name = main.$form["name"]; 
      main.$lastName = main.$form["last_name"];      
      main.$email = main.$form["email"];
      main.$message = main.$form["message"];
    },

    events: function () {      
      var $form = main.$contactForm,
          url = 'https://script.google.com/macros/s/AKfycbyLFw6qF9-l5Bv9HXuWsvBN4hnQ3fRDGwFriYKWISfbQq72JWg3/exec'
      
      $(main.$submit).unbind('click.form-submit');
      $(main.$submit).on('click.form-submit', function(e) {
        e.preventDefault();
        var formValid = main.validateForm();
        
        if(formValid) {
          var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: $form.serialize(),
            success: main.successMessage()
          });
        } else {
          main.failureMessage();
          main.msg = '';
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

      if(main.msg != '') {
        return false;
      }
      return true;
    },

    validateText: function ($text) {
      var reg = /^[A-Za-z]+$/;

      if($text.name == "name") {
        if($text.value.length <= 2 || !reg.test($text.value)) {
          main.msg += "Polje NAME je obavezno i mora sadržavati više od 2 slova";
          main.$name.classList.add('error');
          main.$name.previousElementSibling.classList.add('error');
          return false;
        } else {
          main.$name.classList.remove('error');
          main.$name.previousElementSibling.classList.remove('error');
        }
      } else if ($text.name == "last_name") {
        if($text.value.length <= 2 || !reg.test($text.value)) {
          main.msg += "\nPolje LAST NAME je obavezno i mora sadržavati više od 2 slova";
          main.$lastName.classList.add('error');
          main.$lastName.previousElementSibling.classList.add('error');
          return false;
        } else {
          main.$lastName.classList.remove('error');
          main.$lastName.previousElementSibling.classList.remove('error');
        }
      } else if ($text.name == "message") {
        if($text.value.length <= 20) {
          main.msg += "\nPolje MESSAGE je obavezno i mora sadržavati više od 20 karaktera";
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
      var reg = /\S+@\S+\.\S+/;
      if(!reg.test(email.value) || email.value.length <= 0) {
        main.$email.classList.add('error');
        main.msg += "\nPolje EMAIL je obavezno ili nije u korektnom formatu.";
        main.$email.previousElementSibling.classList.add('error');
        return false;
      } else {
        main.$email.classList.remove('error');
        main.$email.previousElementSibling.classList.remove('error');
        return true;
      }
    },

    successMessage: function () {
      alert("Uspješno poslano");
      location.reload();
    },

    failureMessage: function () {
      //alert(main.msg);
      return false;
    }
  }

  main.init();
});
