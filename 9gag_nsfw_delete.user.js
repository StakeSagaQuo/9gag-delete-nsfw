// ==UserScript==
// @name        NSFW Deleter
// @namespace   com.stakesagaquo.9gag
// @description Removes NSFW posts (9gag displays a click-to-show option).
// @include     http://9gag.com/*
// @include     http://9gag.com/
// @version     1.1
// @grant       none
// @downloadURL https://raw.githubusercontent.com/StakeSagaQuo/9gag-delete-nsfw/master/9gag_nsfw_delete.user.js
// @updateURL https://raw.githubusercontent.com/StakeSagaQuo/9gag-delete-nsfw/master/9gag_nsfw_delete.user.js
// ==/UserScript==

jQuery( document ).ready(function(){
  // remove the nsfw links
  jQuery('a[href$="nsfw"]').parents('li').remove(); 
});
jQuery( document ).ajaxComplete(function() {
  // remove new posts as you scroll
  jQuery('.badge-nsfw-entry-cover, .nsfw-post').parents('article').remove(); // on ajax (scroll to bottom, initial page load), delete nsfw posts
});

