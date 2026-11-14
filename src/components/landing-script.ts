import { gsap } from "gsap";
import { LOGO } from "@/lib/tech-logos";
import { PROJECTS } from "@/lib/constants/projects";
import { SKILLS, type Skill } from "@/lib/constants/skills";

/* Imperative behaviour of the landing page.
   Returns a cleanup function so React strict-mode / unmounts leave nothing behind. */

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; g: number };
type Section = { id: string; label: string; short?: string; icon?: string; sub?: number; y?: number };
type PanelCfg = { st: number; nl: number; dots: number[][]; tx: number; tw: number; ta: string; txt: string };

export function initLanding(root: HTMLElement): () => void {
  const $ = <T extends Element = HTMLElement>(id: string) => root.querySelector<T>("#" + id)!;
  const q = (s: string) => root.querySelectorAll<HTMLElement>(s);
  const ac = new AbortController();
  const sig = { signal: ac.signal };
  const ctx = gsap.context(() => {}, root);
  const cleanups: Array<() => void> = [];

  const fit = $<HTMLElement>("fit"), board = $<HTMLElement>("board"), herobg = $<HTMLElement>("herobg");
  const pslot = $<HTMLElement>("pslot"), rail = $<HTMLElement>("rail");
  const hnav = $<HTMLElement>("hnav"), vnav = $<HTMLElement>("vnav"), stick = $<HTMLElement>("stick"), robot = $<HTMLElement>("robot");
  const tabs = $<HTMLElement>("tabs"), vwrap = $<HTMLElement>("vwrap"), tech = $<HTMLElement>("tech"), desc = $<HTMLElement>("desc"), playIcon = $<HTMLElement>("playIcon");
  const bPrev = $<HTMLElement>("bPrev"), bPlay = $<HTMLElement>("bPlay"), bNext = $<HTMLElement>("bNext"), knob = $<HTMLElement>("knob"), ticks = $<SVGElement>("ticks");
  const visit = $<HTMLAnchorElement>("visit");
  const vid = $<HTMLVideoElement>("vid");
  const root$ = document.documentElement;

  /* ---- hero background: dots that get pushed away from the cursor and light up ---- */
  const cv = $<HTMLCanvasElement>("dots"), cx = cv.getContext("2d")!;
  const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let dots: Dot[] = [], DPR = 1, mx = -9999, my = -9999, vis = true, raf = 0, S = 1;

  function buildDots() {
    const W = root$.clientWidth, H = 1080 * S, sp = 20 * S;
    DPR = Math.min(devicePixelRatio || 1, 2);
    cv.width = W * DPR; cv.height = H * DPR; dots = [];
    const off = (W - 1920 * S) / 2, x0 = ((off % sp) + sp) % sp + sp / 2;
    for (let y = sp / 2; y < H; y += sp)
      for (let x = x0 - sp; x < W + sp; x += sp) dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, g: 0 });
    draw();
  }
  function step() {
    const R = 230 * S, R2 = R * R;
    for (const d of dots) {
      const dx = d.hx - mx, dy = d.hy - my, q = dx * dx + dy * dy;
      let tx = d.hx, ty = d.hy, glow = 0;
      if (q < R2) {
        const dist = Math.sqrt(q) || 1, f = 1 - dist / R, push = f * f * 60 * S;
        tx += (dx / dist) * push; ty += (dy / dist) * push; glow = f;
      }
      d.vx = (d.vx + (tx - d.x) * 0.11) * 0.78; d.vy = (d.vy + (ty - d.y) * 0.11) * 0.78;
      d.x += d.vx; d.y += d.vy; d.g += (glow - d.g) * 0.18;
    }
  }
  function draw() {
    cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.clearRect(0, 0, cv.width, cv.height);
    cx.fillStyle = "#fff"; cx.globalAlpha = 0.11; cx.beginPath(); const r0 = 1.3 * S;
    for (const d of dots) if (d.g < 0.03) { cx.moveTo(d.x + r0, d.y); cx.arc(d.x, d.y, r0, 0, 6.2832); }
    cx.fill();
    for (const d of dots) if (d.g >= 0.03) {
      cx.globalAlpha = 0.11 + d.g * 0.6; cx.beginPath(); cx.arc(d.x, d.y, (1.3 + d.g * 1.9) * S, 0, 6.2832); cx.fill();
    }
  }
  function loop() { if (!vis) { raf = 0; return; } step(); draw(); raf = requestAnimationFrame(loop); }
  const kick = () => {
    vis = scrollY < 1080 * S && !document.hidden;
    if (vis && !raf && !still) raf = requestAnimationFrame(loop);
  };
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY + scrollY; }, sig);
  root$.addEventListener("mouseleave", () => { mx = my = -9999; }, sig);
  addEventListener("scroll", kick, { passive: true, signal: ac.signal });
  document.addEventListener("visibilitychange", kick, sig);
  cleanups.push(() => cancelAnimationFrame(raf));

  /* ---- scale the 1920px board to the window ---- */
  const JT = 3722; // Journey start top (after badges section)
  const BLOGS_TOP = 4802; // 3722 + 1080 (Blogs starts immediately after Journey)
  const CONTACT_TOP = 5902; // 4802 + 1100
  const BH = 7002; // 5902 + 1100 total board height

  let targetFlight = 0;
  let smoothFlight = 0;
  let off = 0;

  // Global smooth scrolling state: dampens and reduces the scrolling speed across the whole website
  let targetScrollY = 0;
  let smoothScrollY = 0;
  let isWheelScrolling = false;
  let wheelTimeout: number | undefined;

  const resize = () => {
    S = Math.min(root$.clientWidth / 1920, innerHeight / 1080);
    board.style.transform = `scale(${S})`;
    fit.style.width = 1920 * S + "px";
    herobg.style.height = 1080 * S + "px";
    buildDots(); kick();
    fit.style.height = BH * S + "px";
    board.style.height = BH + "px";
    const szone = root.querySelector<HTMLElement>("#szone");
    if (szone) szone.style.height = (BH - 1206) + "px";
    off = (root$.clientWidth - 1920 * S) / 2 / S;
  };

  /* ---- screen reveal animations on scroll ---- */
  const revealedSecs = new Set<string>();
  const revealSec = (id: string) => {
    if (revealedSecs.has(id)) return;
    revealedSecs.add(id);
    const sec = root.querySelector<HTMLElement>("#" + id);
    if (!sec) return;
    const items = sec.querySelectorAll<HTMLElement>(".rv");
    gsap.to(items, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "expo.out", overwrite: "auto" });
  };

  const checkReveals = (boardScrollY: number) => {
    if (boardScrollY >= 500) revealSec("about");
    if (boardScrollY >= BLOGS_TOP - 900) revealSec("blogs");
    if (boardScrollY >= CONTACT_TOP - 900) revealSec("contact");
  };

  const updatePin = () => {
    const scrollY_board = window.scrollY / S;

    const stickY = Math.min(Math.max(scrollY_board - 1206, 0), BH - 1206 - 785);
    stick.style.transform = `translate3d(${-off}px, ${stickY}px, 0)`;

    if (scrollY_board < JT - 200) {
      targetFlight = 0;
    } else if (scrollY_board > JT + 200) {
      targetFlight = 1;
    }

    checkReveals(scrollY_board);
  };

  addEventListener("scroll", () => {
    if (!isWheelScrolling) {
      targetScrollY = window.scrollY;
      smoothScrollY = window.scrollY;
    }
    updatePin();
  }, { passive: true, signal: ac.signal });
  addEventListener("resize", () => { resize(); updatePin(); }, sig);
  resize();
  targetScrollY = window.scrollY;
  smoothScrollY = window.scrollY;
  updatePin();

  /* ---- hero: build both states ---- */
  const panel = (c: PanelCfg, alt: boolean) => `<div class="panel${alt ? " alt" : ""}">
 <div class="pbg">
  <img class="a wm" src="/assets/manav-wordmark.svg" alt="">
  <img class="a photo" src="/assets/manav-desk.png" alt="Developer at a desk with two monitors">
 </div>
 <div class="a step" style="left:-8px;width:479px;top:${c.st}px;height:${848 - c.st}px"></div>
 <img class="a cor" style="left:471px;top:${c.st + 342}px" src="/assets/subtract.svg" alt="">
 <img class="a cor" style="left:0;top:${c.st - 100}px" src="/assets/subtract.svg" alt="">
 <i class="seam" style="left:-8px;width:11px;top:${c.st - 75}px;height:77px"></i>
 <i class="seam" style="left:-8px;width:108px;top:${c.st - 2}px;height:4px"></i>
 ${c.st + 442 <= 840 ? '<i class="seam" style="left:471px;width:75px;top:837px;height:11px"></i><i class="seam" style="left:469px;width:4px;top:' + (c.st + 346) + 'px;height:102px"></i>' : ""}
 <i class="seam" style="left:${c.nl + 25}px;width:862px;top:-8px;height:11px"></i>
 <div class="a clip" style="top:${c.st}px;height:${840 - c.st}px"><img src="/assets/ma-wordmark.svg" style="top:${232 - c.st}px" alt=""></div>
 <div class="a notch" style="left:${c.nl}px">
  <div class="nshape"><img src="/assets/subtract-1.svg" alt=""><div class="nfill"></div><img class="r" src="/assets/subtract-2.svg" alt=""></div>
  ${c.dots.map(([x, w]) => `<span class="a dots" style="left:${x}px;width:${w}px"></span>`).join("")}
  <a class="a ntxt" style="left:${c.tx}px;width:${c.tw}px;text-align:${c.ta}" href="mailto:manavadwani@gmail.com">${c.txt}</a>
 </div></div>`;
  const A_: PanelCfg = { st: 398, nl: 155, dots: [[126, 46], [365, 424]], tx: 180, tw: 218, ta: "left", txt: "<span>MANAV R.</span><span>ADWANI</span>" };
  const B_: PanelCfg = { st: 498, nl: 445, dots: [[130, 304], [743, 46]], tx: 439, tw: 297, ta: "right", txt: '<span>MANAVADWANI</span><span><span class="at">@</span>GMAIL.COM</span>' };
  pslot.innerHTML = panel(A_, false) + panel(B_, true);
  const pB = pslot.querySelectorAll<HTMLElement>(".panel")[1];

  /* ---- portfolio sections (shared by the hero bar and the sticky bar) ---- */
  const SECS: Section[] = [
    {
      id: "about",
      label: "About me",
      short: "About",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg>',
      y: 1100,
    },
    {
      id: "skills",
      label: "Badges · Skillset",
      short: "Skills",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
      sub: 1,
      y: 2230,
    },
    {
      id: "projects",
      label: "Projects",
      short: "Projects",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>',
      y: 2552,
    },
    {
      id: "journey",
      label: "Journey",
      short: "Journey",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
      y: JT,
    },
    {
      id: "blogs",
      label: "Blogs",
      short: "Blogs",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
      y: BLOGS_TOP,
    },
    {
      id: "contact",
      label: "Contact me",
      short: "Contact",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
      y: CONTACT_TOP,
    },
  ];
  const cls = (x: Section) => (x.sub ? "sub " : "") + (x.y == null ? "off" : "");
  hnav.innerHTML = SECS.map((x) => `<li class="${cls(x)}" data-id="${x.id}"><a href="#${x.id}" tabindex="${x.y == null ? -1 : 0}" aria-label="${x.label}"><span class="t"><span class="hnav-icon">${x.icon}</span><span class="hnav-label">${x.short || x.label}</span></span></a></li>`).join("");
  vnav.innerHTML = SECS.map((x) => `<li class="${cls(x)}" data-id="${x.id}"><button class="dotb" aria-label="${x.label}" ${x.y == null ? 'aria-disabled="true"' : ""}></button><span class="tip">${x.label}${x.y == null ? " · soon" : ""}</span></li>`).join("");
  const go = (id: string) => {
    const x = SECS.find((z) => z.id === id);
    if (!x || x.y == null) return;
    if (x.id === "journey") {
      targetFlight = 0;
    } else if (x.id === "blogs" || x.id === "contact") {
      targetFlight = 1;
    }
    targetScrollY = x.y * S;
    smoothScrollY = x.y * S;
    scrollTo({ top: x.y * S, behavior: "smooth" });
  };
  document.addEventListener("click", (e) => {
    const li = (e.target as Element).closest<HTMLElement>("#hnav li,#vnav li");
    if (!li || !root.contains(li)) return;
    e.preventDefault(); go(li.dataset.id!);
  }, sig);
  const spy = () => {
    const pos = (window.scrollY / S) + 300; let cur: string | null = null;
    SECS.forEach((x) => { if (x.y != null && x.y <= pos) cur = x.id; });
    root.querySelectorAll<HTMLElement>("#hnav li,#vnav li").forEach((li) => li.classList.toggle("on", li.dataset.id === cur));
  };
  addEventListener("scroll", spy, { passive: true, signal: ac.signal });

  /* Rail modes: idle -> hover the bar = section list -> hover the link circle = contact + socials */
  gsap.set(q("#hnav .t"), { yPercent: 130 }); gsap.set(q(".ctext"), { y: 800 }); gsap.set(q(".socimg"), { yPercent: 110 });
  let mode: "idle" | "sections" | "contact" = "idle";
  function setMode(m: typeof mode) {
    if (m === mode) return;
    const prev = mode; mode = m; const open = m !== "idle", E = "expo.out";
    gsap.to(pB, { clipPath: open ? "inset(-24px -24px -24px -24px)" : "inset(-24px 0px -24px 1458px)", duration: open ? 0.9 : 0.7, ease: "expo.inOut", overwrite: "auto" });
    const nav = { yPercent: m === "sections" ? 0 : m === "contact" ? -130 : 130, duration: 0.6, stagger: 0.05, ease: "power3.out", overwrite: "auto" as const };
    if (m === "idle" && prev === "contact") gsap.set(q("#hnav .t"), { yPercent: 130 }); else gsap.to(q("#hnav .t"), nav);
    gsap.to(q(".ctext"), { y: m === "contact" ? 0 : 800, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    gsap.to(q("#botPill"), { height: m === "contact" ? 308 : 162, duration: 0.7, ease: E, overwrite: "auto" });
    gsap.to(q(".socimg"), { yPercent: m === "contact" ? 0 : 110, duration: 0.7, ease: E, overwrite: "auto" });
    gsap.to(q(".linkc"), { yPercent: m === "contact" ? 120 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
  }
  const inBot = (e: Event) => ((e.target as Element).closest("#botPill") ? "contact" : "sections");
  if (matchMedia("(hover:hover)").matches) {
    rail.addEventListener("mouseover", (e) => setMode(inBot(e)), sig);
    rail.addEventListener("mouseleave", () => setMode("idle"), sig);
  }
  rail.addEventListener("focusin", (e) => setMode(inBot(e)), sig);
  rail.addEventListener("focusout", (e) => { if (!rail.contains(e.relatedTarget as Node)) setMode("idle"); }, sig);
  rail.addEventListener("click", (e) => {
    if (!matchMedia("(hover:none)").matches || (e.target as Element).closest("a")) return;
    setMode((e.target as Element).closest("#botPill") ? "contact" : mode === "sections" ? "idle" : "sections");
  }, sig);

  ["about", "blogs", "contact"].forEach((id) => {
    const sec = $(id);
    if (!sec) return;
    const items = sec.querySelectorAll<HTMLElement>(".rv");
    gsap.set(items, { opacity: 0, y: 34 });
    const io = new IntersectionObserver((en, ob) => {
      if (!en[0].isIntersecting) return;
      ob.disconnect();
      revealSec(id);
    }, { threshold: 0.05 });
    io.observe(sec);
    cleanups.push(() => io.disconnect());
  });

  /* blogs: glow that follows the cursor inside a card */
  q("#blogs .post").forEach((c) => c.addEventListener("pointermove", (e) => {
    const r = c.getBoundingClientRect(), s = r.width / (c as HTMLElement).offsetWidth, ev = e as PointerEvent;
    (c as HTMLElement).style.setProperty("--mx", (ev.clientX - r.left) / s + "px");
    (c as HTMLElement).style.setProperty("--my", (ev.clientY - r.top) / s + "px");
  }, sig));
  q("#blogs .post.soon").forEach((c) => c.addEventListener("click", (e) => e.preventDefault(), sig));

  /* contact: copy e-mail + back to top */
  const copyBtn = root.querySelector<HTMLButtonElement>("#copyMail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(copyBtn.dataset.email || ""); copyBtn.textContent = "COPIED ✓"; }
      catch { copyBtn.textContent = "PRESS CTRL+C"; }
      setTimeout(() => { copyBtn.textContent = "COPY"; }, 1800);
    }, sig);
  }
  const toTop = root.querySelector<HTMLElement>("#toTop");
  if (toTop) {
    toTop.addEventListener("click", () => {
      targetFlight = 0;
      targetScrollY = 0;
      smoothScrollY = 0;
      scrollTo({ top: 0, behavior: "smooth" });
    }, sig);
  }

  /* ---- about: lively robot (GSAP) ---- */
  const img = robot.querySelector("img")!;
  gsap.to(robot, { y: -16, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.to(robot, { rotation: 0.8, duration: 4.4, ease: "sine.inOut", yoyo: true, repeat: -1, transformOrigin: "50% 100%" });
  gsap.set(robot, { transformPerspective: 900 });
  gsap.to(robot, { "--glow": "34px", duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
  const rx = gsap.quickTo(robot, "rotationY", { duration: 0.8, ease: "power3" });
  const ry = gsap.quickTo(robot, "rotationX", { duration: 0.8, ease: "power3" });
  const ix = gsap.quickTo(img, "x", { duration: 0.9, ease: "power3" });
  const aboutSec = $("about");
  aboutSec.addEventListener("pointermove", (e) => {
    const r = board.getBoundingClientRect(), s = r.width / 1920, x = (e.clientX - r.left) / s / 1920 - 0.5, y = (e.clientY - r.top) / s;
    rx(x * 14); ry(-(y - 1600) / 900 * 6); ix(-x * 18);
  }, sig);

  /* ---- badges: endless left->right marquee; hover pauses + expands the name ---- */
  const bt = root.querySelector<HTMLElement>("#btrack");
  if (bt) {
    const chipHTML = (k: Skill) => {
      const l = LOGO[k];
      return `<div class="chip" title="${l.n}"><i></i><div class="in"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${l.p}"/></svg><b>${l.n}</b></div></div>`;
    };
    const half = SKILLS.concat(SKILLS).map(chipHTML).join("");
    bt.innerHTML = half + half;
    bt.style.setProperty("--w", (bt.offsetWidth / 2) + "px");

    bt.addEventListener("mouseenter", () => { bt.style.animationPlayState = "paused"; }, sig);
    bt.addEventListener("mouseleave", () => { bt.style.animationPlayState = "running"; }, sig);
  }

  /* ---- projects: player + volume knob ---- */
  let cur = 0;
  const sync = () => {
    playIcon.style.display = vid.paused ? "grid" : "none";
    bPlay.textContent = vid.paused ? "▶" : "❚❚";
  };
  function renderTabs() {
    tabs.innerHTML = '<button class="tab sm" data-d="-1" aria-label="Previous">&lt;</button>' +
      PROJECTS.map((p, i) => i === cur
        ? `<div class="cur"><img src="/assets/tab-current.svg" alt=""><span>${p.label}</span></div>`
        : `<button class="tab" data-i="${i}">${p.label}</button>`).join("") +
      '<button class="tab sm" data-d="1" aria-label="Next">&gt;</button>';
  }
  function load(i: number) {
    cur = (i + PROJECTS.length) % PROJECTS.length; const p = PROJECTS[cur]; renderTabs();
    vid.src = p.video; vid.load(); desc.textContent = p.desc;
    tech.innerHTML = p.tech.length
      ? p.tech.map((k) => { const l = LOGO[k]; return `<div class="lg" style="--c:${l.c}" title="${l.n}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${l.p}"/></svg><span>${l.n}</span></div>`; }).join("")
      : '<div class="lg tba" title="Coming soon">?</div>';
    vid.setAttribute("aria-label", p.title); tech.classList.toggle("dense", p.tech.length > 6);
    if (p.website) {
      visit.href = p.website; visit.classList.remove("off"); visit.removeAttribute("aria-disabled"); visit.removeAttribute("tabindex");
      visit.setAttribute("aria-label", `Visit ${p.title} website`);
    } else {
      visit.removeAttribute("href"); visit.classList.add("off"); visit.setAttribute("aria-disabled", "true"); visit.tabIndex = -1;
      visit.setAttribute("aria-label", `${p.title} website coming soon`);
    }
    gsap.fromTo(q("#vwrap,#desc,#visit"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", onComplete() { if (!p.website) gsap.set(visit, { opacity: 0.35 }); } });
    gsap.fromTo(q("#tech .lg"), { scale: 0.3, rotate: -14, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "back.out(2.2)", clearProps: "transform" });
    sync();
  }
  tabs.addEventListener("click", (e) => {
    const b = (e.target as Element).closest<HTMLElement>("button");
    if (!b) return;
    load(b.dataset.i !== undefined ? +b.dataset.i : cur + +b.dataset.d!);
  }, sig);
  const toggle = () => (vid.paused ? vid.play().catch(() => {}) : vid.pause());
  vwrap.addEventListener("click", toggle, sig);
  bPlay.addEventListener("click", toggle, sig);
  bPrev.addEventListener("click", () => { vid.currentTime = Math.max(0, vid.currentTime - 5); }, sig);
  bNext.addEventListener("click", () => { vid.currentTime = Math.min(isFinite(vid.duration) ? vid.duration : Infinity, vid.currentTime + 5); }, sig);
  (["play", "pause", "ended"] as const).forEach((ev) => vid.addEventListener(ev, sync, sig));
  cleanups.push(() => { vid.pause(); vid.removeAttribute("src"); vid.load(); });

  // knob: ticks + drag/wheel/keys -> video.volume
  for (let a = -135; a <= 135; a += 45) {
    const r = (a * Math.PI) / 180, l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute("x1", String(Math.sin(r) * 78)); l.setAttribute("y1", String(-Math.cos(r) * 78));
    l.setAttribute("x2", String(Math.sin(r) * 94)); l.setAttribute("y2", String(-Math.cos(r) * 94));
    ticks.append(l);
  }
  let vol = 0.7;
  const spin = gsap.quickTo(q("#dial"), "rotation", { duration: 0.15, ease: "power2.out" });
  gsap.set(q("#dial"), { svgOrigin: "0 0" });
  function setVol(v: number) {
    vol = Math.min(1, Math.max(0, v)); vid.volume = vol; vid.muted = vol === 0;
    spin(-135 + vol * 270); knob.setAttribute("aria-valuenow", String(Math.round(vol * 100)));
  }
  const fromPointer = (e: PointerEvent) => {
    const r = knob.getBoundingClientRect();
    let a = (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI;
    if (Math.abs(a) > 135) a = a > 0 ? 135 : -135;
    return (a + 135) / 270;
  };
  knob.addEventListener("pointerdown", (e) => { knob.setPointerCapture(e.pointerId); knob.classList.add("drag"); setVol(fromPointer(e)); }, sig);
  knob.addEventListener("pointermove", (e) => { if (knob.hasPointerCapture(e.pointerId)) setVol(fromPointer(e)); }, sig);
  knob.addEventListener("pointerup", () => knob.classList.remove("drag"), sig);
  knob.addEventListener("wheel", (e) => { e.preventDefault(); setVol(vol - Math.sign(e.deltaY) * 0.05); }, { passive: false, signal: ac.signal });
  knob.addEventListener("keydown", (e) => {
    const k = ({ ArrowUp: 0.05, ArrowRight: 0.05, ArrowDown: -0.05, ArrowLeft: -0.05 } as Record<string, number>)[e.key];
    if (k) { e.preventDefault(); setVol(vol + k); }
  }, sig);
  gsap.set(q("#dial"), { rotation: -135 + vol * 270 }); setVol(vol); load(cur); spy();

  /* ---- journey: horizontal track with Millennium Falcon flying across all 5 milestones ---- */
  const PER = 1214.5, F = 414.4, D = (PER - 2 * F) / 2, TOP = 297, BOT = 527, T0 = -67.7, HP = PER / 2;
  const ITEMS: [string, string, string][] = [
    ["B.Tech CSE", "UPES Dehradun", "2022–2026"],
    ["Dev Intern", "Wildlife Inst.", "Jun–Jul 2025"],
    ["Freelance Dev", "Aurena · Libaas", "2026"],
    ["Co-Founder", "Amaippu", "2026–Now"],
    ["Consultant", "Sewarth Health", "2026–Now"],
  ];
  const DD = "M544 125L440.99 0L327.5 0L313.733 11.217H271.485H229.238L218 0.268L103.01 0L0 125L103.01 250H440.99L544 125Z";
  const VD = "M544 125L440.99 250L327.5 250L313.733 238.783H271.485H229.238L218 249.732L103.01 250L0 125L103.01 0H440.99L544 125Z";
  const shipEl = $<HTMLElement>("ship");
  const jsvgEl = $<SVGSVGElement>("jsvg");
  const cardsEl = $<HTMLElement>("cards");

  // Build SVG circuit track with clean termination at Card 4 (no repeat, no extra loop)
  const G = '<g id="jG" clip-path="url(#jfc)"><path d="M473 189L346.699 39H139.5H-67.6992L-194 189" fill="none" stroke="#9B0000" stroke-width="10"/><path d="M448 201L330.788 64H186.5L177.072 74H138.5H103L93.5721 64H-53.7884L-171 201" fill="none" stroke="#3B3B3B" stroke-width="2"/><path d="M499 178L363.61 14H141.5H-80.6101L-216 178" fill="none" stroke="#3B3B3B" stroke-width="2"/><path d="M163.516 55L175.88 40H106.12L118.484 55H163.516Z" fill="#9B0000" stroke="#9B0000" stroke-width="2"/><circle cx="79" cy="81" r="5" stroke="#3B3B3B" stroke-width="2" fill="none"/><circle cx="201" cy="81" r="5" stroke="#3B3B3B" stroke-width="2" fill="none"/></g>';
  const termPads = `
    <g id="jTerm">
      <circle cx="2776" cy="297" r="10" fill="#9B0000"/>
      <circle cx="2776" cy="297" r="5" fill="#FFF2D0"/>
      <line x1="2776" y1="282" x2="2776" y2="312" stroke="#9B0000" stroke-width="4"/>
      <circle cx="2750" cy="322" r="4" stroke="#3B3B3B" stroke-width="2" fill="none"/>
      <circle cx="2750" cy="272" r="4" stroke="#3B3B3B" stroke-width="2" fill="none"/>
    </g>
  `;
  const uses = `
    <use href="#jG" transform="matrix(-1 0 0 -1 ${887 - PER} 566)"/>
    <use href="#jG" transform="translate(0 258)"/>
    <use href="#jG" transform="matrix(-1 0 0 -1 887 566)"/>
    <use href="#jG" transform="translate(${PER} 258)"/>
    <use href="#jG" transform="matrix(-1 0 0 -1 ${887 + PER} 566)"/>
    <use href="#jG" transform="translate(${2 * PER} 258)"/>
    ${termPads}
  `;
  jsvgEl.innerHTML = `<defs><clipPath id="jfc"><rect x="-198" y="0" width="680" height="157"/></clipPath><clipPath id="jTrackEndClip"><rect x="-800" y="0" width="3580" height="823"/></clipPath>${G}</defs><g id="jtrk" clip-path="url(#jTrackEndClip)">${uses}</g>`;
  const trkEl = jsvgEl.querySelector<SVGGElement>("#jtrk")!;
  trkEl.style.willChange = "transform";

  // Render ONLY the 5 distinct milestone cards (no extra, no circular duplicates)
  cardsEl.innerHTML = "";
  const BASE = [40.3, 27.28, 27.28];
  const cardNodes = ITEMS.map((item, g) => {
    const el = document.createElement("div");
    el.className = "a jcard";
    const pathD = (g % 2) === 1 ? VD : DD;
    el.innerHTML = `<div class="jcard-in"><svg viewBox="0 0 544 250"><path d="${pathD}"/></svg><b>${item[0]}</b><i class="c">${item[1]}</i><i class="d">${item[2]}</i></div>`;
    cardsEl.append(el);
    return el;
  });

  cardNodes.forEach((el) => {
    const b = el.querySelector<HTMLElement>("b")!;
    const c = el.querySelector<HTMLElement>(".c")!;
    const d = el.querySelector<HTMLElement>(".d")!;
    [b, c, d].forEach((e, i) => {
      if (e.scrollWidth > e.clientWidth && e.clientWidth > 0) {
        e.style.fontSize = (BASE[i] * e.clientWidth / e.scrollWidth) + "px";
      }
    });
  });

  // Track y-position for any given track x
  const trackY = (x: number) => {
    const u = (((x - T0) % PER) + PER) % PER;
    return u < F ? TOP : u < F + D ? TOP + (u - F) / D * (BOT - TOP) : u < 2 * F + D ? BOT : BOT - (u - 2 * F - D) / D * (BOT - TOP);
  };

  // Render loop — hardware-accelerated transforms only
  function renderJ(progress: number) {
    // Ship travels from Card 0 (139.5) to Card 4 (2568.5)
    const startX = 139.5;
    const endX = 139.5 + 4 * HP; // 2568.5px
    const SCREEN_CARD0 = 460;
    const SCREEN_CARD4 = 856; // Centered in the 1712px frame

    const shipTrackX = startX + progress * (endX - startX);
    const cameraX = (startX - SCREEN_CARD0) + progress * ((endX - SCREEN_CARD4) - (startX - SCREEN_CARD0));

    // World track translates with camera on GPU
    trkEl.style.transform = `translate3d(${-cameraX}px, 0, 0)`;

    // Position each of the 5 cards relative to camera
    cardNodes.forEach((el, g) => {
      const cardTrackX = 139.5 + g * HP;
      const cardScreenX = cardTrackX - cameraX;
      const cy = (g % 2) === 1 ? 197 : 365;
      el.style.transform = `translate3d(${cardScreenX - 272}px, ${cy}px, 0)`;
    });

    // Space ship position and bank angle along the curves
    const shipScreenX = shipTrackX - cameraX;
    const shipScreenY = (trackY(shipTrackX - 25) + trackY(shipTrackX) + trackY(shipTrackX + 25)) / 3;
    const ang = Math.atan2(trackY(shipTrackX + 60) - trackY(shipTrackX - 60), 120) * 180 / Math.PI;

    shipEl.style.transform = `translate3d(${shipScreenX - 88.9}px, ${shipScreenY - 88.9}px, 0) rotate(${ang}deg)`;
  }

  const onWheel = (e: WheelEvent) => {
    const scrollY_board = smoothScrollY / S;
    const flightFinished = targetFlight >= 1 && smoothFlight >= 0.98;
    const flightAtStart = targetFlight <= 0 && smoothFlight <= 0.02;

    const atJourney = Math.abs(scrollY_board - JT) <= 30;
    const enteringFromAbove = e.deltaY > 0 && scrollY_board >= JT - 80 && scrollY_board < JT && !flightFinished;
    const enteringFromBelow = e.deltaY < 0 && scrollY_board <= JT + 80 && scrollY_board > JT && !flightAtStart;

    if (atJourney || enteringFromAbove || enteringFromBelow) {
      if (e.deltaY > 0 && !flightFinished) {
        e.preventDefault();
        targetScrollY = JT * S;
        smoothScrollY = JT * S;
        if (Math.abs(window.scrollY - JT * S) > 1) {
          window.scrollTo(0, JT * S);
        }
        // Leisurely, comfortable flight speed through the 5 milestones
        targetFlight = Math.min(1, targetFlight + e.deltaY * 0.00018);
        return;
      }
      if (e.deltaY < 0 && !flightAtStart) {
        e.preventDefault();
        targetScrollY = JT * S;
        smoothScrollY = JT * S;
        if (Math.abs(window.scrollY - JT * S) > 1) {
          window.scrollTo(0, JT * S);
        }
        targetFlight = Math.max(0, targetFlight + e.deltaY * 0.00018);
        return;
      }
    }

    // Outside Journey flight: reduce global scrolling speed across the entire website
    e.preventDefault();
    isWheelScrolling = true;
    clearTimeout(wheelTimeout);
    wheelTimeout = window.setTimeout(() => {
      isWheelScrolling = false;
    }, 250);

    const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
    // 0.52 factor reduces website scroll speed by half, making scrolling gentle and controlled
    const maxScroll = Math.max(0, (BH * S) - innerHeight);

    // If approaching Journey from above and flight is pending, smoothly clamp at Journey
    if (delta > 0 && scrollY_board < JT && !flightFinished) {
      targetScrollY = Math.min(targetScrollY + delta * 0.52, JT * S);
    } else if (delta < 0 && scrollY_board > JT && !flightAtStart) {
      targetScrollY = Math.max(targetScrollY + delta * 0.52, JT * S);
    } else {
      targetScrollY = Math.max(0, Math.min(targetScrollY + delta * 0.52, maxScroll));
    }
  };
  addEventListener("wheel", onWheel, { passive: false, signal: ac.signal });

  let touchStartY = 0;
  addEventListener("touchstart", (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true, signal: ac.signal });

  addEventListener("touchmove", (e: TouchEvent) => {
    const scrollY_board = window.scrollY / S;
    const currentY = e.touches[0].clientY;
    const dy = touchStartY - currentY;
    touchStartY = currentY;

    const flightFinished = targetFlight >= 1 && smoothFlight >= 0.98;
    const flightAtStart = targetFlight <= 0 && smoothFlight <= 0.02;

    if (Math.abs(scrollY_board - JT) <= 40) {
      if (dy > 0 && !flightFinished) {
        e.preventDefault();
        window.scrollTo(0, JT * S);
        targetFlight = Math.min(1, targetFlight + dy * 0.0005);
      } else if (dy < 0 && !flightAtStart) {
        e.preventDefault();
        window.scrollTo(0, JT * S);
        targetFlight = Math.max(0, targetFlight + dy * 0.0005);
      }
    }
  }, { passive: false, signal: ac.signal });

  addEventListener("keydown", (e: KeyboardEvent) => {
    const scrollY_board = window.scrollY / S;
    if (Math.abs(scrollY_board - JT) <= 35) {
      const step = (e.key === "PageDown" || e.key === "PageUp") ? 0.25 : 0.08;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        if (targetFlight < 1) {
          e.preventDefault();
          targetFlight = Math.min(1, targetFlight + step);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (targetFlight > 0) {
          e.preventDefault();
          targetFlight = Math.max(0, targetFlight - step);
        }
      }
    }
  }, { signal: ac.signal });

  const tickerFn = () => {
    // 1. Global smooth dampened page scroll
    if (Math.abs(targetScrollY - smoothScrollY) > 0.5) {
      smoothScrollY += (targetScrollY - smoothScrollY) * 0.09;
      window.scrollTo(0, smoothScrollY);
    } else if (smoothScrollY !== targetScrollY) {
      smoothScrollY = targetScrollY;
      window.scrollTo(0, smoothScrollY);
    }

    const scrollY_board = window.scrollY / S;

    // 2. Smooth flight progress: silky, weighted lerp for graceful flight glide
    if (Math.abs(targetFlight - smoothFlight) > 0.0002) {
      smoothFlight += (targetFlight - smoothFlight) * 0.06;
      renderJ(smoothFlight);
    } else if (smoothFlight !== targetFlight) {
      smoothFlight = targetFlight;
      renderJ(smoothFlight);
    }

    const stickY = Math.min(Math.max(scrollY_board - 1206, 0), BH - 1206 - 785);
    stick.style.transform = `translate3d(${-off}px, ${stickY}px, 0)`;

    checkReveals(scrollY_board);
  };
  gsap.ticker.add(tickerFn);
  cleanups.push(() => {
    clearTimeout(wheelTimeout);
    gsap.ticker.remove(tickerFn);
  });

  renderJ(0);

  return () => {
    ac.abort();
    cleanups.forEach((fn) => fn());
    ctx.revert();
    gsap.killTweensOf(root.querySelectorAll("*"));
  };
}
