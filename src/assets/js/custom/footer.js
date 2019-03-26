import $ from 'jquery';
window.jQuery = $;

$( document ).ready( function ($) {
  var footer = {
    init: function () {
      footer.dom();
      footer.events();
    },

    dom: function () {
      footer.$footer = $('footer');
    },

    events: function () {
      footer.positionFooter();
    },

    positionFooter: function () {
      var footerHeight = footer.$footer.height();
      var footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";


      console.log("FH: " + footerHeight);
      console.log("FT: " + footerTop);
      console.log("WH: " + $(window).height());
      console.log("DBH: " + $(document.body).height());

      if( ($(document.body).height() - footerHeight) < $(window).height()){
        footer.$footer.css({position: "absolute", bottom: 0, left: 0});
      }else{
        footer.$footer.css({position: "static"});
      }

      //console.log(footerTop);
    }
  }

  footer.init();
});
