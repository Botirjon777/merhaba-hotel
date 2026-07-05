'use client';
import React from "react";
import {useEffect} from "react";
import "./be-style.css";
import {useLocale} from "next-intl";

export default function BeSearchForm({ extraClass }: { extraClass?: string }) {
  const locale = useLocale();
  const searchForm = (w: any) => {
    // @ts-ignore
    !function(e,n){
      // @ts-ignore
      var t="bookingengine",o="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
      // @ts-ignore
      if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
        // @ts-ignore
        !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
            a.onerror=a.onload=function(n,i)
                // @ts-ignore
            {return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
            ["uz-ibe.hopenapi.com", "ibe.hopenapi.com", "ibe.behopenapi.com"])}
    }(window, [
      ["setContext", "BE-INT-safirhotel-uz_2026-06-03", locale],
      ["embed", "search-form", {
        container: "be-search-form"
      }]
    ]);
  };

  useEffect(() => {
    searchForm(window);
  }, [locale]);

  useEffect(() => {
    const blockSearch = document.querySelector('#block-search') as HTMLElement | null;
    if (!blockSearch) return;
    // Placeholder keeps the layout height when the form goes fixed,
    // so the page below it doesn't jump up/down on toggle
    const placeholder = document.createElement('div');
    blockSearch.parentNode?.insertBefore(placeholder, blockSearch);
    const scrollFix = () => {
      const isFixed = blockSearch.classList.contains('block-search--fixed');
      // Measure the anchor from the element that is currently in normal flow
      const anchor = isFixed ? placeholder : blockSearch;
      const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
      const shouldFix = window.scrollY >= anchorTop && window.innerWidth >= 1200;
      if (shouldFix && !isFixed) {
        const styles = window.getComputedStyle(blockSearch);
        placeholder.style.height = `${
          blockSearch.offsetHeight +
          parseFloat(styles.marginTop) +
          parseFloat(styles.marginBottom)
        }px`;
        blockSearch.classList.add('block-search--fixed');
      } else if (!shouldFix && isFixed) {
        placeholder.style.height = '0px';
        blockSearch.classList.remove('block-search--fixed');
      }
    };
    scrollFix();
    window.addEventListener('scroll', scrollFix);
    window.addEventListener('resize', scrollFix);
    return () => {
      placeholder.remove();
      window.removeEventListener('scroll', scrollFix);
      window.removeEventListener('resize', scrollFix);
    };
  }, []);

  return (
      <div id="block-search" className={`block-search ${extraClass || ""}`}>
        <div id="be-search-form" className="be-container">
          <div className="flex items-center justify-center py-5">
            <div className="w-7 h-7 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
          </div>
          <a href="https://exely.com/" rel="nofollow" target="_blank" className="sr-only">Hotel management software</a>
        </div>
      </div>
  )
}