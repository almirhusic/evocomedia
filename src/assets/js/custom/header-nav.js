import $ from 'jquery';

$( document ).ready( function ($) {
  var headerNav = {
    init: function () {
      headerNav.dom();
      headerNav.events();
      headerNav.checkUrl();
    },

    dom: function () {
      headerNav.$header = $('#header');
      headerNav.$nav = headerNav.$header.find('#header-nav');
      headerNav.$navToggle = headerNav.$nav.find('#header-nav-toggle');
      headerNav.$menuItems = headerNav.$nav.find('> ul');
      headerNav.$menuLinks = headerNav.$menuItems.find('> li > a');
      headerNav.$logo = headerNav.$header.find('.header-logo');
      headerNav.$main = $('#main');
    },

    events: function () {

      //open navigation
      headerNav.$navToggle.on('click', function () {
        if(!headerNav.$menuItems.hasClass('active')){
          headerNav.openNav();
        }else{
          headerNav.closeNav();
        }
      });

      //show section for clicked ID
      headerNav.$menuLinks.on('click', function () {        
        var sectionId = $(this).attr('href');

        headerNav.closeNav();
        headerNav.showSection(sectionId);    
      });

      //close all section on logo click
      headerNav.$logo.on('click', function () {
        headerNav.closeNav();
        headerNav.closeSections();
      });
    },

    openNav: function () {
      headerNav.$navToggle.addClass('active');
      headerNav.$menuItems.addClass('active');
    },

    closeNav: function () {
      headerNav.$navToggle.removeClass('active');
      headerNav.$menuItems.removeClass('active');
    },

    showSection: function(sectionId){
      var sectionId = sectionId || false;
      var $section = $(sectionId);

      if($section.length){
        headerNav.closeSections(sectionId);
      }
    },

    closeSections: function (exclude) {
      headerNav.$menuLinks.each( function () {
        var sectionId = $(this).attr('href');
        var $section = headerNav.$main.find(sectionId);
        
        if(sectionId != exclude){
          $section.removeClass('active');
        }
        else{
          $section.addClass('active');
        }
      });
    },

    checkUrl: function () {
      var sectionId = location.hash;
      headerNav.showSection(sectionId);
    }
  }

  headerNav.init();
});