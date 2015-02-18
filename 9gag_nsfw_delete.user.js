// ==UserScript==
// @name        NSFW Deleter
// @namespace   com.stakesagaquo.9gag
// @description Removes NSFW posts (9gag displays a click-to-show option).
// @include     http://9gag.com/*
// @include     http://9gag.com/
// @include     http://9gag.tv/*
// @include     http://9gag.tv/
// @version     1.2.2
// @grant       none
// @downloadURL https://raw.githubusercontent.com/StakeSagaQuo/9gag-delete-nsfw/master/9gag_nsfw_delete.user.js
// @updateURL https://raw.githubusercontent.com/StakeSagaQuo/9gag-delete-nsfw/master/9gag_nsfw_delete.user.js
// ==/UserScript==

jQuery(document).ready(function () {
    // remove the nsfw links
    jQuery('a[href$="nsfw"]').parents('li').remove();
});

// multi-browser compatibility
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var myObserver = new MutationObserver(mutationHandler);

var obsConfig = {
    childList: true,
    attributes: true,
    subtree: true,
    attributeFilter: ['class']
};

myObserver.observe(document, obsConfig);

function mutationHandler(mutationRecords) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
            var count = list.children.length;
          list.children[count-1].innerHTML =
              "Element " + count + " has been injected!";
      }
    });

    mutationRecords.forEach(function (mutation) {

        if (mutation.type == "childList"
            && typeof mutation.addedNodes == "object"
            && mutation.addedNodes.length
            ) {
            for (var J = 0, L = mutation.addedNodes.length; J < L; ++J) {
                check_for_nsfw(mutation.addedNodes[J]);
            }
        }
        else if (mutation.type == "attributes") {
            check_for_nsfw(mutation.target);
        }
    });
}

function check_for_nsfw(node) {
    //-- Only process element nodes
    if (node.nodeType === 1) {
        j_node = jQuery(node);

        // on ajax (scroll to bottom, initial page load), delete nsfw posts
        if ((j_node).is('a')) {
            console.log('a');
            console.log(j_node);
            j_node.find('.badge-nsfw-entry-cover').addBack('.badge-nsfw-entry-cover, .nsfw-post').parents('article').remove();
        }

        // remove any sidebar items that contain NSFW in text (not the best way to do it, but they don't have a class).
        if ((j_node).is('li')) {
            console.log('li');
            //console.log(j_node);
            jQuery("li.badge-featured-item:contains('NSFW')").remove(); // sidebar links
        }
        if ((j_node).is('div')) {
            console.log('div');
            // console.log(j_node);
            jQuery("div.badge-grid-item:contains('NSFW')").remove(); // 9gag.tv links. Almost all NSFW videos have this text.
        }


    }
}

/*
 // remove new posts as you scroll
 jQuery( document ).ajaxComplete(function() {
 // on ajax (scroll to bottom, initial page load), delete nsfw posts
 jQuery('.badge-nsfw-entry-cover, .nsfw-post').parents('article').remove();

 // remove any sidebar items that contain NSFW in text (not the best way to do it, but they don't have a class).
 jQuery("li.badge-featured-item:contains('NSFW')").remove(); // sidebar links

 jQuery("div.badge-grid-item:contains('NSFW')").remove(); // 9gag.tv links. Almost all NSFW videos have this text.
 });
 */
