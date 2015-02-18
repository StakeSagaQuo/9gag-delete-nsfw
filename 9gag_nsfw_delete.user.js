// ==UserScript==
// @name        NSFW Deleter
// @namespace   com.stakesagaquo.9gag
// @description Removes NSFW posts (9gag displays a click-to-show option).
// @include     http://9gag.com/*
// @include     http://9gag.com/
// @include     http://9gag.tv/*
// @include     http://9gag.tv/
// @version     1.2.1
// @grant       none
// @downloadURL https://raw.githubusercontent.com/StakeSagaQuo/9gag-delete-nsfw/master/9gag_nsfw_delete.user.js
// @updateURL https://raw.githubusercontent.com/StakeSagaQuo/9gag-delete-nsfw/master/9gag_nsfw_delete.user.js
// ==/UserScript==

jQuery( document ).ready(function(){
  // remove the nsfw links
  jQuery('a[href$="nsfw"]').parents('li').remove(); 
  
  // remove any sidebar items that contain NSFW in text (not the best way to do it, but they don't have a class).
  // these don't get populated by scrolling, so no need to do it on ajax complete.
  jQuery("li.badge-featured-item:contains('NSFW')").remove(); // sidebar links
  
});

// remove new posts as you scroll
jQuery( document ).ajaxComplete(function() {
  // on ajax (scroll to bottom, initial page load), delete nsfw posts
  jQuery('.badge-nsfw-entry-cover, .nsfw-post').parents('article').remove();   
  
  jQuery("div.badge-grid-item:contains('NSFW')").remove(); // 9gag.tv links. Almost all NSFW videos have this text.
});
