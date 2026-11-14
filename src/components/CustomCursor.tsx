"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[role='button']",
  "[role='link']",
  "[role='tab']",
  "[role='switch']",
  "[role='checkbox']",
  "[role='menuitem']",
  "[tabindex]:not([tabindex='-1'])",
  ".tab",
  ".chip",
  ".rail",
  ".ctl",
  ".knob",
  ".dotb",
  ".vwrap",
  ".jcard-in",
  ".contact-btn",
  ".totop",
  ".blog-post",
  ".blog-nav-btn",
  "[data-cursor='hover']",
  "[data-cursor='pointer']",
].join(",");

const DEFAULT_SVG = `<svg width="61" height="62" viewBox="0 0 61 62" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_194_273" fill="#1D0201"/>
<mask id="stroke1_194_273" maskUnits="userSpaceOnUse" x="-0.865417" y="-0.803223" width="62" height="63" fill="black">
<rect fill="white" x="-0.865417" y="-0.803223" width="62" height="63"/>
<use xlink:href="#stroke0_194_273"/>
</mask>
<path d="M43.4881 2.19678L54.8431 12.5603L26.7621 20.2736L57.9748 48.7608L49.8249 57.6905L18.5562 29.1521L13.4896 57.8702L2.13458 47.5066L7.54749 11.0217L43.4881 2.19678Z" stroke-width="4" stroke="#FFF2D0" mask="url(#stroke1_194_273)"/>
<defs>
<path id="stroke0_194_273" d="M43.4881 2.19678L54.8431 12.5603L26.7621 20.2736L57.9748 48.7608L49.8249 57.6905L18.5562 29.1521L13.4896 57.8702L2.13458 47.5066L7.54749 11.0217L43.4881 2.19678Z"/>
</defs>
</svg>`;

const HOVER_SVG = `<svg width="51" height="68" viewBox="0 0 51 68" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_195_291" fill="#1D0201"/>
<use xlink:href="#stroke1_195_291" fill="#1D0201"/>
<use xlink:href="#stroke2_195_291" fill="#1D0201"/>
<use xlink:href="#stroke3_195_291" fill="#1D0201"/>
<use xlink:href="#stroke4_195_291" fill="#1D0201"/>
<use xlink:href="#stroke5_195_291" fill="#1D0201"/>
<use xlink:href="#stroke6_195_291" fill="#1D0201"/>
<use xlink:href="#stroke7_195_291" fill="#1D0201"/>
<path d="M22.444 14.8116C24.1443 14.2159 26.4967 13.699 28.9991 14.0683L28.3396 4.77262C28.0599 1.20196 22.936 1.02388 22.444 4.58008V14.8116Z" fill="#1D0201"/>
<mask id="stroke8_195_291" maskUnits="userSpaceOnUse" x="-0.993301" y="-0.998047" width="52" height="69" fill="black">
<rect fill="white" x="-0.993301" y="-0.998047" width="52" height="69"/>
<use xlink:href="#stroke0_195_291"/>
<use xlink:href="#stroke1_195_291"/>
<use xlink:href="#stroke2_195_291"/>
<use xlink:href="#stroke3_195_291"/>
<use xlink:href="#stroke4_195_291"/>
<use xlink:href="#stroke5_195_291"/>
<use xlink:href="#stroke6_195_291"/>
<use xlink:href="#stroke7_195_291"/>
<path d="M22.444 14.8116C24.1443 14.2159 26.4967 13.699 28.9991 14.0683L28.3396 4.77262C28.0599 1.20196 22.936 1.02388 22.444 4.58008V14.8116Z"/>
</mask>
<path d="M10.0615 34.2268L7.80661 28.6641C6.43833 25.2995 1.33316 26.8621 2.0811 30.4224L4.5067 39.5802L11.1842 35.9467C10.703 35.4617 10.3263 34.8889 10.0601 34.2293L10.0615 34.2268ZM17.3629 37.0183C15.8771 37.7812 13.9827 37.7241 12.5638 36.9641L5.75282 42.3237C5.32692 42.6589 5.24931 43.2688 5.58962 43.6906C8.22286 46.9544 16.9993 57.3132 17.6763 58.9011C21.3186 51.7943 18.3868 40.4404 17.3629 37.0183ZM38.7998 59.0477C24.76 55.5932 19.7268 59.575 18.5972 60.758C19.1976 62.1283 19.5914 63.6086 19.8675 65.0802L39.9903 64.3505L38.7998 59.0477ZM39.1578 57.4137L47.7186 40.4137C47.8469 40.1589 47.8603 39.8614 47.7554 39.5962L46.5215 36.4763C46.2621 36.0663 45.6421 35.9636 45.261 36.2666L44.1072 37.1381C43.7384 37.433 43.1565 37.3235 42.9077 36.9176L40.8751 33.634C40.6162 33.3049 40.3263 33.2559 39.9797 33.4758L38.6732 34.4851C38.2913 34.8614 37.6144 34.7155 37.383 34.2413L34.7593 30.0736C34.5156 29.6746 34.0026 29.543 33.5962 29.7814L31.7352 30.858C31.4668 31.0086 31.1047 30.9962 30.8525 30.816C30.8062 30.7769 30.766 30.7386 30.7213 30.6972L26.8772 27.247C26.2191 26.6514 25.2187 26.5672 24.4648 27.075L20.7634 29.2563L20.2998 32.8726C20.1528 34.0879 19.6051 35.183 18.7896 36.01C19.5501 38.3799 22.2092 47.6149 20.6084 55.3497C20.4252 56.2349 21.4035 57.1017 22.2687 56.8398C25.6621 55.8128 31.0006 55.4131 39.1617 57.4137L39.1578 57.4137ZM32.7751 28.3435C33.9484 27.6601 35.4425 28.0335 36.1661 29.1882L37.2417 30.8984L37.0004 22.1501C37.0002 20.9926 36.2466 20.0348 35.1527 19.7777L31.2246 18.8549L32.0492 28.7671L32.7709 28.344L32.7751 28.3435ZM38.9707 32.1742C39.9824 31.3438 41.5928 31.6412 42.2762 32.7577L42.8629 33.7058C42.9197 31.8705 43.082 28.5275 43.1291 26.7928C43.1468 25.648 42.3788 24.6532 41.2607 24.3925L38.6996 23.7809C38.7638 23.7655 38.809 32.4163 38.9707 32.1742ZM46.2884 34.4811L46.2869 34.4834C45.6665 34.357 45.0173 34.4788 44.483 34.8052L44.675 30.329L45.8313 30.4388C47.0588 30.5615 47.9902 31.5903 48.0067 32.8396L48.0924 33.4629C48.1758 34.0695 46.8883 34.6034 46.2884 34.4811ZM22.2104 16.7081L21.0214 27.1934L23.5862 25.681C24.9269 24.7762 26.7557 24.9179 27.9766 26.0156L30.3687 28.1625C30.2723 26.7398 29.1926 16.8209 29.116 15.7677C26.3124 15.3079 23.8001 15.8872 22.2104 16.7081ZM22.444 14.8116C24.1443 14.2159 26.4967 13.699 28.9991 14.0683L28.3396 4.77262C28.0599 1.20196 22.936 1.02388 22.444 4.58008V14.8116Z" stroke-width="4" stroke="#FFF2D0" mask="url(#stroke8_195_291)"/>
<defs>
<path id="stroke0_195_291" d="M10.0615 34.2268L7.80661 28.6641C6.43833 25.2995 1.33316 26.8621 2.0811 30.4224L4.5067 39.5802L11.1842 35.9467C10.703 35.4617 10.3263 34.8889 10.0601 34.2293L10.0615 34.2268Z"/>
<path id="stroke1_195_291" d="M17.3629 37.0183C15.8771 37.7812 13.9827 37.7241 12.5638 36.9641L5.75282 42.3237C5.32692 42.6589 5.24932 43.2688 5.58962 43.6906C8.22286 46.9544 16.9993 57.3132 17.6763 58.9011C21.3186 51.7943 18.3868 40.4404 17.3629 37.0183Z"/>
<path id="stroke2_195_291" d="M38.7998 59.0477C24.76 55.5932 19.7268 59.575 18.5972 60.758C19.1976 62.1283 19.5914 63.6086 19.8675 65.0802L39.9903 64.3505L38.7998 59.0477Z"/>
<path id="stroke3_195_291" d="M39.1578 57.4137L47.7186 40.4137C47.8469 40.1589 47.8603 39.8614 47.7554 39.5962L46.5215 36.4763C46.2621 36.0663 45.6421 35.9636 45.261 36.2666L44.1072 37.1381C43.7384 37.433 43.1565 37.3235 42.9077 36.9176L40.8751 33.634C40.6162 33.3049 40.3263 33.2559 39.9797 33.4758L38.6732 34.4851C38.2913 34.8614 37.6144 34.7155 37.383 34.2413L34.7593 30.0736C34.5156 29.6746 34.0026 29.543 33.5962 29.7814L31.7352 30.858C31.4668 31.0086 31.1047 30.9962 30.8525 30.816C30.8062 30.7769 30.766 30.7386 30.7213 30.6972L26.8772 27.247C26.2191 26.6514 25.2187 26.5672 24.4648 27.075L20.7634 29.2563L20.2998 32.8726C20.1528 34.0879 19.6051 35.183 18.7896 36.01C19.5501 38.3799 22.2092 47.6149 20.6084 55.3497C20.4252 56.2349 21.4035 57.1017 22.2687 56.8398C25.6621 55.8128 31.0006 55.4131 39.1617 57.4137L39.1578 57.4137Z"/>
<path id="stroke4_195_291" d="M32.7751 28.3435C33.9484 27.6601 35.4425 28.0335 36.1661 29.1882L37.2417 30.8984L37.0004 22.1501C37.0002 20.9926 36.2466 20.0348 35.1527 19.7777L31.2246 18.8549L32.0492 28.7671L32.7709 28.344L32.7751 28.3435Z"/>
<path id="stroke5_195_291" d="M38.9707 32.1742C39.9824 31.3438 41.5928 31.6412 42.2762 32.7577L42.8629 33.7058C42.9197 31.8705 43.082 28.5275 43.1291 26.7928C43.1469 25.648 42.3788 24.6532 41.2607 24.3925L38.6996 23.7809C38.7638 23.7655 38.809 32.4163 38.9707 32.1742Z"/>
<path id="stroke6_195_291" d="M46.2884 34.4811C46.8883 34.6034 48.1758 34.0695 48.0924 33.4629L48.0067 32.8396C47.9902 31.5903 47.0588 30.5615 45.8313 30.4388L44.675 30.329L44.483 34.8052C45.0173 34.4788 45.6665 34.357 46.2869 34.4834L46.2884 34.4811Z"/>
<path id="stroke7_195_291" d="M22.2104 16.7081L21.0214 27.1934L23.5862 25.681C24.9269 24.7762 26.7557 24.9179 27.9766 26.0156L30.3687 28.1625C30.2723 26.7398 29.1926 16.8209 29.116 15.7677C26.3124 15.3079 23.8001 15.8872 22.2104 16.7081Z"/>
</defs>
</svg>`;

const CLICKED_SVG = `<svg width="51" height="55" viewBox="0 0 51 55" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_195_292" fill="#1D0201"/>
<use xlink:href="#stroke1_195_292" fill="#1D0201"/>
<use xlink:href="#stroke2_195_292" fill="#1D0201"/>
<use xlink:href="#stroke3_195_292" fill="#1D0201"/>
<use xlink:href="#stroke4_195_292" fill="#1D0201"/>
<use xlink:href="#stroke5_195_292" fill="#1D0201"/>
<use xlink:href="#stroke6_195_292" fill="#1D0201"/>
<use xlink:href="#stroke7_195_292" fill="#1D0201"/>
<path d="M22.444 8.39036C24.1443 7.79469 26.4967 7.27779 28.9991 7.64708L28.3396 4.7726C28.0599 1.20194 22.936 1.02386 22.444 4.58006V8.39036Z" fill="#1D0201"/>
<mask id="stroke8_195_292" maskUnits="userSpaceOnUse" x="-0.993301" y="-0.998047" width="52" height="56" fill="black">
<rect fill="white" x="-0.993301" y="-0.998047" width="52" height="56"/>
<use xlink:href="#stroke0_195_292"/>
<use xlink:href="#stroke1_195_292"/>
<use xlink:href="#stroke2_195_292"/>
<use xlink:href="#stroke3_195_292"/>
<use xlink:href="#stroke4_195_292"/>
<use xlink:href="#stroke5_195_292"/>
<use xlink:href="#stroke6_195_292"/>
<use xlink:href="#stroke7_195_292"/>
<path d="M22.444 8.39036C24.1443 7.79469 26.4967 7.27779 28.9991 7.64708L28.3396 4.7726C28.0599 1.20194 22.936 1.02386 22.444 4.58006V8.39036Z"/>
</mask>
<path d="M30.7213 20.2646C31.0067 20.5805 31.4668 20.576 31.7352 20.4254L33.5962 19.3488C34.0026 19.1104 34.5156 19.242 34.7593 19.641L37.383 23.8086C37.6144 24.2829 38.2913 24.4288 38.6732 24.0525L39.9797 23.0431C40.3263 22.8233 40.6162 22.8723 40.8751 23.2014L42.9077 26.485C43.1565 26.8909 43.7384 27.0004 44.1072 26.7055L45.261 25.834C45.6421 25.531 46.2621 25.6337 46.5215 26.0436L47.7436 29.1338C47.8553 29.4162 47.8326 29.734 47.682 29.9977L39.1578 44.9159L39.1617 44.9158C31.0006 42.9152 25.6621 43.315 22.2687 44.342C21.4035 44.6039 20.4252 43.7371 20.6084 42.8519C22.2092 35.1171 19.5501 25.8821 18.7896 23.5122C19.6051 22.6853 20.1528 21.5901 20.2998 20.3748L20.7634 18.8236L24.4648 16.6424C25.2187 16.1345 26.2191 16.2188 26.8772 16.8144L30.7213 20.2646ZM30.7213 20.2646C30.675 20.2255 30.766 20.306 30.7213 20.2646ZM10.0615 21.7291L7.80661 16.1663C6.43833 12.8017 1.33316 14.3643 2.0811 17.9246L4.5067 27.0825L11.1842 23.4489C10.703 22.9639 10.3263 22.3911 10.0601 21.7315L10.0615 21.7291ZM17.3629 24.5206C15.8771 25.2834 13.9827 25.2263 12.5638 24.4663L5.75282 29.8259C5.32692 30.1611 5.24932 30.771 5.58962 31.1928C8.22286 34.4566 16.9993 44.8154 17.6763 46.4032C21.3186 39.2965 18.3868 27.9427 17.3629 24.5206ZM38.7998 46.5499C24.76 43.0954 19.7268 47.0772 18.5972 48.2602C19.1976 49.6305 19.5914 51.1108 19.8675 52.5824L39.9903 51.8527L38.7998 46.5499ZM32.7751 17.9109C33.9484 17.2275 35.4425 17.6009 36.1661 18.7556L37.2417 20.4658L37.0004 13.2175C37.0002 12.0601 36.2466 11.1023 35.1527 10.8452L31.2246 9.92234L32.0492 18.3344L32.7709 17.9114L32.7751 17.9109ZM38.9707 21.7415C39.9824 20.9112 41.5928 21.2086 42.2762 22.3251L42.8629 23.2732C42.9197 21.4379 43.082 19.595 43.1291 17.8603C43.1468 16.7155 42.3788 15.7207 41.2607 15.46L38.6996 14.8484C38.7638 14.833 38.809 21.9837 38.9707 21.7415ZM46.2884 24.0485L46.2869 24.0508C45.6665 23.9244 45.0173 24.0462 44.483 24.3726L44.675 19.8964L45.8313 20.0061C47.0588 20.1289 47.9902 21.1576 48.0067 22.407L48.1861 23.2133C48.3985 24.1677 47.2464 24.2438 46.2884 24.0485ZM22.2104 10.2869L21.0214 16.7607L23.5862 15.2483C24.9269 14.3435 26.7557 14.4853 27.9766 15.583L30.3687 17.7299C30.2723 16.3072 29.1926 10.3997 29.116 9.34646C26.3124 8.88673 23.8001 9.466 22.2104 10.2869ZM22.444 8.39036C24.1443 7.79469 26.4967 7.27779 28.9991 7.64708L28.3396 4.7726C28.0599 1.20194 22.936 1.02386 22.444 4.58006V8.39036Z" stroke-width="4" stroke="#FFF2D0" mask="url(#stroke8_195_292)"/>
<defs>
<path id="stroke0_195_292" d="M10.0615 21.7291L7.80661 16.1663C6.43833 12.8017 1.33316 14.3643 2.0811 17.9246L4.5067 27.0825L11.1842 23.4489C10.703 22.9639 10.3263 22.3911 10.0601 21.7315L10.0615 21.7291Z"/>
<path id="stroke1_195_292" d="M17.3629 24.5206C15.8771 25.2834 13.9827 25.2263 12.5638 24.4663L5.75282 29.8259C5.32692 30.1611 5.24932 30.771 5.58962 31.1928C8.22286 34.4566 16.9993 44.8154 17.6763 46.4032C21.3186 39.2965 18.3868 27.9427 17.3629 24.5206Z"/>
<path id="stroke2_195_292" d="M38.7998 46.5499C24.76 43.0954 19.7268 47.0772 18.5972 48.2602C19.1976 49.6305 19.5914 51.1108 19.8675 52.5824L39.9903 51.8527L38.7998 46.5499Z"/>
<path id="stroke3_195_292" d="M39.1578 44.9159L47.682 29.9977C47.8326 29.734 47.8553 29.4162 47.7436 29.1338L46.5215 26.0436C46.2621 25.6337 45.6421 25.531 45.261 25.834L44.1072 26.7055C43.7384 27.0004 43.1565 26.8909 42.9077 26.485L40.8751 23.2014C40.6162 22.8723 40.3263 22.8233 39.9797 23.0431L38.6732 24.0525C38.2913 24.4288 37.6144 24.2829 37.383 23.8086L34.7593 19.641C34.5156 19.242 34.0026 19.1104 33.5962 19.3488L31.7352 20.4254C31.4668 20.576 31.0067 20.5805 30.7213 20.2646C30.766 20.306 30.6751 20.2255 30.7213 20.2646L26.8772 16.8144C26.2191 16.2188 25.2187 16.1345 24.4648 16.6424L20.7634 18.8236L20.2998 20.3748C20.1528 21.5901 19.6051 22.6853 18.7896 23.5122C19.5501 25.8821 22.2092 35.1171 20.6084 42.8519C20.4252 43.7371 21.4035 44.6039 22.2687 44.342C25.6621 43.315 31.0006 42.9152 39.1617 44.9158L39.1578 44.9159Z"/>
<path id="stroke4_195_292" d="M32.7751 17.9109C33.9484 17.2275 35.4425 17.6009 36.1661 18.7556L37.2417 20.4658L37.0004 13.2175C37.0002 12.0601 36.2466 11.1023 35.1527 10.8452L31.2246 9.92234L32.0492 18.3344L32.7709 17.9114L32.7751 17.9109Z"/>
<path id="stroke5_195_292" d="M38.9707 21.7415C39.9824 20.9112 41.5928 21.2086 42.2762 22.3251L42.8629 23.2732C42.9197 21.4379 43.082 19.595 43.1291 17.8603C43.1469 16.7155 42.3788 15.7207 41.2607 15.46L38.6996 14.8484C38.7638 14.833 38.809 21.9837 38.9707 21.7415Z"/>
<path id="stroke6_195_292" d="M46.2884 24.0485C47.2464 24.2438 48.3985 24.1677 48.1861 23.2133L48.0067 22.407C47.9902 21.1576 47.0588 20.1289 45.8313 20.0061L44.675 19.8964L44.483 24.3726C45.0173 24.0462 45.6665 23.9244 46.2869 24.0508L46.2884 24.0485Z"/>
<path id="stroke7_195_292" d="M22.2104 10.2869L21.0214 16.7607L23.5862 15.2483C24.9269 14.3435 26.7557 14.4853 27.9766 15.583L30.3687 17.7299C30.2723 16.3072 29.1926 10.3997 29.116 9.34646C26.3124 8.88673 23.8001 9.466 22.2104 10.2869Z"/>
</defs>
</svg>`;

function isInteractive(el: Element | null): boolean {
  if (!el) return false;
  if (el.closest(INTERACTIVE_SELECTOR)) return true;

  // Fallback: check computed style on target and immediate parents
  let cur: Element | null = el;
  let count = 0;
  while (cur && count < 3 && cur !== document.body && cur !== document.documentElement) {
    if (cur instanceof HTMLElement) {
      const cursor = window.getComputedStyle(cur).cursor;
      if (cursor === "pointer" || cursor === "grab" || cursor === "grabbing") {
        return true;
      }
    }
    cur = cur.parentElement;
    count++;
  }
  return false;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate for devices with fine pointer (mouse / trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    const htmlEl = document.documentElement;
    htmlEl.classList.add("has-custom-cursor");

    let isDown = false;
    let lastX = -9999;
    let lastY = -9999;
    let isHover = false;
    let currentState: "default" | "hover" | "clicked" = "default";

    const updateState = (state: "default" | "hover" | "clicked") => {
      if (currentState !== state) {
        currentState = state;
        cursorEl.dataset.state = state;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      cursorEl.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
      cursorEl.classList.add("is-visible");

      const target = e.target as Element | null;
      isHover = isInteractive(target);

      updateState(isDown ? "clicked" : isHover ? "hover" : "default");
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.buttons !== 1) return; // Primary button
      isDown = true;
      updateState("clicked");
    };

    const onPointerUp = () => {
      isDown = false;
      const target = document.elementFromPoint(lastX, lastY);
      isHover = isInteractive(target);
      updateState(isHover ? "hover" : "default");
    };

    const onMouseLeave = (e: MouseEvent) => {
      // If moving outside viewport boundary
      if (!e.relatedTarget || e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        cursorEl.classList.remove("is-visible");
      }
    };

    const onMouseEnter = () => {
      cursorEl.classList.add("is-visible");
    };

    const onBlur = () => {
      isDown = false;
      cursorEl.classList.remove("is-visible");
    };

    const onScroll = () => {
      if (lastX >= 0 && lastY >= 0 && !isDown) {
        const target = document.elementFromPoint(lastX, lastY);
        isHover = isInteractive(target);
        updateState(isHover ? "hover" : "default");
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.documentElement.addEventListener("mouseenter", onMouseEnter, { passive: true });
    window.addEventListener("blur", onBlur, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      htmlEl.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      data-state="default"
      aria-hidden="true"
    >
      <div
        className="cursor-icon cursor-default"
        dangerouslySetInnerHTML={{ __html: DEFAULT_SVG }}
      />
      <div
        className="cursor-icon cursor-hover"
        dangerouslySetInnerHTML={{ __html: HOVER_SVG }}
      />
      <div
        className="cursor-icon cursor-clicked"
        dangerouslySetInnerHTML={{ __html: CLICKED_SVG }}
      />
    </div>
  );
}

