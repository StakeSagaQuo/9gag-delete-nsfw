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

  // link for user to set prefs
  jQuery('#jsid-header-funny-menu').parents('li').after('<li id="9gag_delete_nsfw_preferences"><a href=""><span class="label new">NSFW Prefs</span></a></li>')
  
  // get user prefs
  var user_prefs_array = JSON.parse(GM_getValue("9gag_delete_nsfw_preferences"));
  //JSON.stringify(array));

  for (var key in user_prefs_array) {
    // loop through pref array
    // if hide=true, remove the link
    if ((user_prefs_array.hasOwnProperty(key)) && user_prefs_array[key] == 'true')){
      // user wants this category hidden
      jQuery('a[href$="' + key + '"]').parents('li').remove(); 
    }
  }
  
  // save preferences
  
});

function saveprefs(){
  // check 'form' in preferences popup. save the categories user wants hidden.
  // delete old prefs and overwrite with new ones.
}

jQuery( document ).ajaxComplete(function() {
  // remove new posts as you scroll
  jQuery('.badge-nsfw-entry-cover, .nsfw-post').parents('article').remove(); // on ajax (scroll to bottom, initial page load), delete nsfw posts
});

// let user save preferences in chrome (firefox has these functions already)
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
