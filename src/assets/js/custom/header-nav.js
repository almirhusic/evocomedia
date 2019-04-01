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
      headerNav.$nav = headerNav.$header.find('#nav');
      headerNav.$navToggle = headerNav.$nav.find('#menuBtn');
      headerNav.$menuItems = headerNav.$nav.find('.menu-items');
      headerNav.$logo = headerNav.$header.find('.logo');
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
      headerNav.$menuItems.on('click', function (e) {
        var sectionId = e.target.href.substring(e.target.href.indexOf('#'));
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
      headerNav.$menuItems.children('li').each(function(){
        var $menuItem = $(this);
        var $menuLink = $menuItem.find('> a');
        var sectionId = $menuLink.attr('href');
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