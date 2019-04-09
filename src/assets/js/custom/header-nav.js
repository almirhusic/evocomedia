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
      headerNav.$navToggle.unbind('click.nav-toggle');
      headerNav.$navToggle.on('click.nav-toggle', function () {
        if( !headerNav.$nav.hasClass('is-expanded') ) {
          headerNav.openNav();
        } else {
          headerNav.closeNav();
        }
      });

      //show section for clicked ID
      headerNav.$menuLinks.unbind('click.menu-links');
      headerNav.$menuLinks.on( 'click.menu-links', function () {        
        var sectionId = $(this).attr('href');

        headerNav.closeNav();
        headerNav.showSection(sectionId);    
      });

      //close all section on logo click
      headerNav.$logo.unbind('click.logo');
      headerNav.$logo.on( 'click.logo', function () {
        headerNav.closeNav();
        headerNav.closeSections('');
      });
    },

    openNav: function () {
      headerNav.$nav.addClass('is-expanded');
      headerNav.$navToggle.addClass('is-active');
    },

    closeNav: function () {
      headerNav.$nav.removeClass('is-expanded');
      headerNav.$navToggle.removeClass('is-active');
    },

    showSection: function(sectionId){
      var sectionId = sectionId || false;
      var $section = $(sectionId);

      if($section.length){
        headerNav.closeSections(sectionId);
        $section.addClass('is-active');
      }
    },

    closeSections: function (exclude) {
      headerNav.$menuLinks.each( function () {
        var sectionId = $(this).attr('href');
        var $section = headerNav.$main.find(sectionId);
        
        if(sectionId != exclude){
          $section.removeClass('is-active');
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