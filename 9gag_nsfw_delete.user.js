// ==UserScript==
// @name        NSFW Deleter
// @namespace   com.stakesagaquo.9gag
// @description Removes NSFW posts (9gag displays a click-to-show option).
// @include     http://9gag.com/*
// @include     http://9gag.com/
// @include     http://9gag.tv/*
// @include     http://9gag.tv/
// @version     1.5.0
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

 bruteforce_sidebar_nsfw(); // manually check all remaining sidebar items.
}

/**
 * Sometimes, a sidebar NSFW shows up without any meta-data saying it is nsfw.
 * This function loads every sidebar item remaining, and checks the other page for
 * the nsfw flag within the main post.
*/
function bruteforce_sidebar_nsfw(){
    var sidebar_href = '';
    jQuery("li.badge-featured-item:not(.ssqclean)").each(function () {
        sidebar_href = (jQuery(this).find('.img-container a').attr('href'));
        if (sidebar_href.match(document.domain)){
            // can only load content from same domain - cross site origin policy
            ajax_nsfw_remove(sidebar_href, this);

            /*jQuery.ajax({
                type: "GET",
                context: this,
                url: sidebar_href,
                success: function(data){
                    if (jQuery(data).find('#individual-post div.nsfw-post').length){
                        // found a NSFW post that wasn't flagged as such on the sidebar link.
                        // remove it.
                        jQuery(this).remove();
                    }
                }
            });*/
        }
        jQuery(this).addClass('ssqclean');
        // add a flag so other ajax calls don't cause the sidebar pages
        // to load again unnecessarily.
        // don't put this in the ajax call, or else it may not get added quickly enough
        // before the next call, causing recursion.
    });
    // new sidebar ticker
    jQuery("#jsid-sidebar-ticker-items-container li:not(.ssqclean)").each(function () {
        var id = jQuery(this).children('a').data('entrykey'); // sidebar ticker doesn't have link, but datakey is all we need
        sidebar_href = '/gag/' + id;
        if (id) {
            ajax_nsfw_remove(sidebar_href, this);
        }
        jQuery(this).addClass('ssqclean');

    });
}

function ajax_nsfw_remove(url, element){
    jQuery.ajax({
        type: "GET",
        url: url,
        success: function(data){
            if (jQuery(data).find('#individual-post div.nsfw-post').length){
                // found a NSFW post that wasn't flagged as such on the sidebar link.
                // remove it.
                jQuery(element).remove();
            }
        }
    });
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
