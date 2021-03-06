// ==UserScript==
// @name         webassign edits
// @namespace    https://github.com/jfmherokiller
// @version      1.567890
// @description  a magic script to remove some of the pretification of webassign to make copy paste easier
// @author       jfmherokiller
// @match        http://www.webassign.net/web/Student/Assignment-Responses/*
// @match        https://www.webassign.net/web/Student/Assignment-Responses/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    function parenify(input) {
        return "(" + input + ")";
    }

    function wolframlinkgen(input, element) {
        var cool = jQuery('<img src="https://www.wolframalpha.com/favicon.ico" /></a>');
        cool.on("click", function() {
            window.open(`https://www.wolframalpha.com/input/?i=${encodeURIComponent(input)}`, '_blank');
        });
        cool.appendTo(element);
    }

    jQuery(".watexsqrt").each(function() {
        var raticand = jQuery(this).find(".watexsqrtradicand").text();
        var squarecontent = jQuery(this).find(".watexsqrtrootcontent").text();
        jQuery(this).text(parenify(raticand) + "^" + parenify("1/" + squarecontent));
    });
    jQuery(".indent").has(".symimage").each(function() {
        jQuery(this).text(jQuery(this).children("img").attr("alt").split("middot").join("*"));
    });
    jQuery(".watexline").each(function(index2, item) {
        //add exponent sign to the problem and unwrap it
        jQuery(this).find("sup").each(function() {
            jQuery(this).text(function(index, text) {
                return "^" + parenify(text);
            });
            jQuery(this).replaceWith(this.childNodes);
        });
        jQuery(this).find(".watexnumerator,.watexdenominator").each(function() {
            jQuery(this).text(parenify(jQuery(this).text()));
        });
        jQuery(this).find(".watexnumerator").each(function() {
            jQuery(this).replaceWith(jQuery(this).text() + "/");
        });
        jQuery(this).find(".watexnumerator,.watexdenominator").each(function() {
            jQuery(this).replaceWith(jQuery(this).text());
        });
        jQuery(this).find(".watexfraction > tbody > tr").each(function() {
            var t = jQuery(this);
            var n = t.next();
            t.html(t.html() + n.html());
            n.remove();
        });
    });
    jQuery(".watexsumcomplex").each(function() {
        var sumcontent = jQuery(this).find(".watexsumcontent").text();
        var sumbelow = jQuery(this).find(".watexsumbelowblock").text();
        var sumabove = jQuery(this).find(".watexsumaboveblock").text();
        if (sumabove === "∞") {
            sumabove = "infinity";
        }
        var mystring = "sum " + sumcontent + "," + sumbelow + " to " + sumabove;
        jQuery(this).text(mystring);
        wolframlinkgen(mystring, jQuery(this));
    });
    jQuery(".watexparenright").remove();
})();
