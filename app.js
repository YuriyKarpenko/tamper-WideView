// ==UserScript==
// @name            WideView
// @namespace       http://tampermonkey.net/
// @license         MIT
// @version         0.1.3.2
// @description     Removes sidebars + stretches post area to full browser width
// @description:ru  Удаляет боковые панели + растягивает область поста на всю ширину браузера
// @author          Prog57
// @match           *://*.habr.com/*
// @match           *://*.microsoft.com/*
// @match           *://*.stackoverflow.com/*
// @match           *://rus-linux.net/*
// @match           *://riptutorial.com/*
// @match           *://bitbucket.org/*
// @match           *://*.atlassian.net/*
// @icon            https://www.google.com/s2/favicons?sz=64&domain=habr.com
// @grant           none
// @downloadURL     https://update.greasyfork.org/scripts/498363/WideView.user.js
// @updateURL       https://update.greasyfork.org/scripts/498363/WideView.meta.js
// ==/UserScript==

(function () {
    'use strict';

    const apply = function (toWide, toHide, toMargin, percent) {
        // debugger;
        let els = document.querySelectorAll(toHide) || [];
        // els.forEach(el => el.style.cssText += 'display: none;');
        els.forEach(el => el.remove());

        percent ||= 100;
        els = document.querySelectorAll(toWide) || [];
        els.forEach(el => el.style.cssText += `max-width: ${percent}%; width: ${percent}%`);

        document.querySelectorAll(toMargin)
            .forEach(el => el.style.cssText += 'margin: 0;');
    }

    const run = function () {
        const host = window.location.host;
        if (/habr\.com/.test(host)) {
            apply(".tm-page-width, .tm-page__main_has-sidebar, .tm-article-presenter",
                ".column_sidebar, .layout__navbar, .tm-page__sidebar");
        }
        else if (/-linux\.net/.test(host)) {
            apply("",
                "#left_col");
        }
        else if (/microsoft\.com/.test(host)) {
            apply(".modular-content-container, #main-column",
                "#ms--additional-resources");
        }
        else if (/stackoverflow\.com/.test(host)) {
            apply("body > .container, #content, #mainbar",
                "#sidebar, #left-sidebar, #onetrust-banner-sdk");
        }
        else if (/riptutorial\.com/.test(host)) {
            apply(".section-article",
                "#cookie-consent, div.section-sidebar");
        }
        else if (/bitbucket\.org/.test(host)) {
            apply(null,
                "div.css-19vvwff.ehpgwqe0");
        }
        else if (/atlassian\.net/.test(host)) {
            apply(null,
                "div.css-zolx62, link[href*='shared~vendor~atlassian'], script[data-defer-skip], .css-17lamoy");
        }
    }

    setTimeout(run, 1000);
    setTimeout(run, 2000);
})();
