// ==UserScript==
// @name        NSFW Deleter
// @namespace   com.stakesagaquo.9gag
// @description Removes NSFW posts (9gag displays a click-to-show option).
// @include     http://9gag.com/*
// @include     http://9gag.com/
// @include     http://9gag.tv/*
// @include     http://9gag.tv/
// @version     1.3
// @grant       none
// @downloadURL https://raw.githubusercontent.com/StakeSagaQuo/9gag-delete-nsfw/master/9gag_nsfw_delete.user.js
// @updateURL https://raw.githubusercontent.com/StakeSagaQuo/9gag-delete-nsfw/master/9gag_nsfw_delete.user.js
// ==/UserScript==

jQuery(document).ready(function () {
    // remove the nsfw links
    jQuery('a[href$="nsfw"]').parents('li').remove();
});

function remove_ajax_nsfw(){
    // on ajax (scroll to bottom, initial page load), delete nsfw posts
 jQuery('.badge-nsfw-entry-cover, .nsfw-post').parents('article').remove();

 // remove any sidebar items that contain NSFW in text (not the best way to do it, but they don't have a class).
 jQuery("li.badge-featured-item:contains('NSFW')").remove(); // sidebar links

 jQuery("div.badge-grid-item:contains('NSFW')").remove(); // 9gag.tv links. Almost all NSFW videos have this text.

 jQuery("#jsid-post-container[data-title*='NSFW']").remove(); // 9gag.tv current video
}

 // remove new posts as you scroll
 jQuery( document ).ajaxComplete(remove_ajax_nsfw);

/**
 * Use Mutation Observers to delete nodes quickly after they are added to the DOM
 */
// multi-browser compatibility
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var myObserver = new MutationObserver(remove_ajax_nsfw);

var obsConfig = {
    childList: true,
    subtree: true
};

//var root_articles = document.querySelector('#list-view-2');

myObserver.observe(document, obsConfig);