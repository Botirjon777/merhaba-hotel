"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const NAVBAR_DESKTOP = 80;
const NAVBAR_MOBILE = 64;
const GAP = 16;

function getScrollOffset(target: HTMLElement) {
  let offset = (window.innerWidth >= 768 ? NAVBAR_DESKTOP : NAVBAR_MOBILE) + GAP;
  // On wide screens the booking search bar fixes itself under the navbar
  // once scrolled past — include its height when the target sits below it
  const blockSearch = document.getElementById("block-search");
  if (blockSearch && window.innerWidth >= 1200) {
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const blockTop = blockSearch.getBoundingClientRect().top + window.scrollY;
    if (
      blockSearch.classList.contains("block-search--fixed") ||
      targetTop > blockTop
    ) {
      offset += blockSearch.offsetHeight;
    }
  }
  return offset;
}

export function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    const el = hash
      ? document.getElementById(decodeURIComponent(hash.slice(1)))
      : null;

    if (!el) {
      // Plain navigation — jump to top
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Strip the hash so the browser's native anchor jump doesn't fight ours
    history.replaceState(null, "", window.location.pathname + window.location.search);

    const targetTop = () =>
      el.getBoundingClientRect().top + window.scrollY - getScrollOffset(el);

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };
    // If the user starts scrolling on their own, stop auto-correcting
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchmove", cancel, { passive: true });

    const initial = setTimeout(() => {
      window.scrollTo({ top: targetTop(), behavior: "smooth" });
    }, 100);

    // Late-loading content (booking widget, images) shifts the layout after
    // the first scroll — re-correct once the page height settles.
    let settle: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(settle);
      settle = setTimeout(() => {
        if (!cancelled && Math.abs(window.scrollY - targetTop()) > 4) {
          window.scrollTo({ top: targetTop(), behavior: "smooth" });
        }
      }, 250);
    });
    observer.observe(document.body);
    const stopWatching = setTimeout(() => observer.disconnect(), 3000);

    return () => {
      clearTimeout(initial);
      clearTimeout(settle);
      clearTimeout(stopWatching);
      observer.disconnect();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
    };
  }, [pathname]);

  return null;
}
