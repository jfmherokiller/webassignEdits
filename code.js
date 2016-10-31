// ==UserScript==
// @name         webassign edits
// @namespace    https://github.com/jfmherokiller
// @version      1.56
// @description  a magic script to remove some of the pretification of webassign to make copy paste easier
// @author       jfmherokiller
// @match        http://www.webassign.net/web/Student/Assignment-Responses/*
// @match        https://www.webassign.net/web/Student/Assignment-Responses/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    jQuery(".indent").has(".symimage").text(jQuery(".indent").has(".symimage").children("img").attr("alt").split("middot").join("*"));
    jQuery(".watexline").each(function(index2,item) {
        //add exponent sign to the problem and unwrap it
        jQuery( this ).find("sup").each(function() {
            jQuery( this ).text(function( index,text ) {
                return "^" + text;
            });
            jQuery( this ).replaceWith(this.childNodes);
        });
        jQuery(this).find(".watexnumerator,.watexdenominator").each(function() { 
            jQuery(this).text("("+ jQuery(this).text() +")");
        });
        jQuery(this).find(".watexnumerator").each(function() {
            jQuery(this).replaceWith(jQuery(this).text()+"/");
        });
        jQuery(this).find(".watexnumerator,.watexdenominator").each(function() {
            jQuery(this).replaceWith(jQuery(this).text());
        });
        jQuery(this).find(".watexfraction > tbody > tr").each(function()
                                                   {
            var t = jQuery(this);
            var n = t.next();
            t.html(t.html() + n.html());
            n.remove();
        });
    });
})();
