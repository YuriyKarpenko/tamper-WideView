// ==UserScript==
// @name          WideView
// @namespace     http://tampermonkey.net/
// @license       MIT
// @version       0.1.1
// @description   Удаляет боковые панели + растягивает область поста на всю ширину браузера
// @author        Prog57
// @match         *://*.habr.com/*
// @match         *://*.microsoft.com/*
// @match         *://*.stackoverflow.com/*
// @match         *://rus-linux.net/*
// @icon          https://www.google.com/s2/favicons?sz=64&domain=habr.com
// @grant         none
// @downloadURL   https://update.greasyfork.org/scripts/498363/WideView.user.js
// @updateURL     https://update.greasyfork.org/scripts/498363/WideView.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const apply = function(toWide, toHide, toMatrgin){
        // debugger;
        let els = document.querySelectorAll(toHide) || [];
        els.forEach(el => el.style.cssText += 'display: none;');

        const percent = 100;
        els = document.querySelectorAll(toWide) || [];
        els.forEach(el => el.style.cssText += `max-width: ${percent}%; width: ${percent}%`);

        document.querySelectorAll('.page, .layout__body')
            .forEach(el => el.style.cssText += 'margin: 0;');
    }

    const run = function() {
        const host = window.location.host;
        if(/\.habr\.com/.test(host)) {
            apply(".tm-page-width, .tm-page__main_has-sidebar, .tm-article-presenter", ".column_sidebar, .layout__navbar, .tm-page__sidebar");
        }
        else if(/-linux\.net/.test(host)) {
            apply("", "#left_col");
        }
        else if(/\.microsoft\.com/.test(host)) {
            apply(".modular-content-container, #main-column", "#ms--additional-resources");
        }
        else if(/\.stackoverflow\.com/.test(host)) {
            apply("body > .container, #content, #mainbar", "#sidebar, #left-sidebar");
        }
    }


    setTimeout(run, 1000);
})();
