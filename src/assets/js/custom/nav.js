import $ from 'jquery';
window.jQuery = $;

$( document ).ready( function ($) {
  var headerNav = {
    init: function() {
      headerNav.dom();
      headerNav.events();
    },

    dom: function () {
      headerNav.$window = $(window);
      headerNav.$header = $('header');
      headerNav.$nav = headerNav.$header.find('.nav');
      headerNav.$navToggle = headerNav.$nav.find('#menuBtn');
      headerNav.$navLinks = headerNav.$nav.find('.menu-items');
      headerNav.$main = $('main');
      headerNav.$logo = $('.logo');
    },

    events: function () {
      //logo click close all sections
      headerNav.$logo.children(":first").click(function () {
        headerNav.closeSections("");
      });

      headerNav.checkUrl();

      //toggle nav
      headerNav.$navToggle.unbind();
      headerNav.$navToggle.on('click', function () {
        if(headerNav.$navLinks.hasClass('inactive')){
          headerNav.openNav();

          //nav li item clicked
          headerNav.$navLinks.children().unbind('click').click( function (e) {
            var href = $(e.target).parent().attr('href');
            headerNav.showSection(href);
            headerNav.closeNav();
          });
        }else{
          headerNav.closeNav();
        }
      });
    },

    openNav: function () {
      headerNav.$navLinks.removeClass('inactive');
      headerNav.changeIcon();
    },

    closeNav: function () {
      headerNav.$navLinks.addClass('inactive');
      headerNav.changeIcon();
    },

    showSection: function (href) {
      var contentToShow = headerNav.$main.find(href);
      contentToShow.removeClass('inactive');
      headerNav.closeSections(href);
    },

    closeSections: function (href) {
      var IDs = $("main div[id]").map(function() { return this.id; }).get();
      $.each(IDs, function(key, value){
        if(value.length){
          if(value != href.substring(1, href.length)){
            $('#' + value).addClass('inactive');
          }
        }
      });
    },

    checkUrl: function () {
      var targetDiv = location.hash;
      headerNav.showSection(targetDiv);
    },

    changeIcon: function () {
      if(headerNav.$navToggle.hasClass('active')){
        headerNav.$navToggle.removeClass('active');
      }else{
        headerNav.$navToggle.addClass('active');
      }
    }
  }

  headerNav.init();
});
