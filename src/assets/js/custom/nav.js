import $ from 'jquery';

$( document ).ready( function ($) {
  var headerNav = {
    init: function () {
      headerNav.dom();
      headerNav.events();
    },

    dom: function () {
      headerNav.$header = $('#header');
      headerNav.$nav = headerNav.$header.find('#nav');
      headerNav.$navToggle = headerNav.$nav.find('#menuBtn');
      headerNav.$menuItems = headerNav.$nav.find('.menu-items');
      headerNav.$logo = headerNav.$header.find('.logo');
      headerNav.$main = $("#main");
    },

    events: function () {

      headerNav.checkUrl();

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
        var sectionID = e.target.href.substring(e.target.href.indexOf('#'));
        headerNav.showSection(sectionID);    
      });

      //close all section on logo click
      headerNav.$logo.on("click", function () {
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

    showSection: function(sectionID){
      headerNav.closeSections();
      if(sectionID.length > 1){
        var targetDiv = headerNav.$main.find(sectionID);
      targetDiv.addClass("active");
      }
    },

    closeSections: function () {
      headerNav.$menuItems.children().each(function(key, value){
        var sectionID = $(value).children().attr("href");
        var targetDiv = headerNav.$main.find(sectionID);
        if(targetDiv.hasClass("active")) {
          targetDiv.removeClass("active");
        }
      });
    },

    checkUrl: function () {
        var sectionID = location.hash;
        headerNav.showSection(sectionID);
    }
  }

  headerNav.init();
});