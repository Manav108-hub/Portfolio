"use client";

import { useEffect, useRef } from "react";
import { initLanding } from "./landing-script";
import { BlogsSection, ContactSection, JourneySection } from "./Sections";

const A = "a";

export default function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return initLanding(rootRef.current);
  }, []);

  return (
    <div ref={rootRef}>
      {/* eslint-disable @next/next/no-img-element */}
      <div id="herobg">
        <canvas id="dots" aria-hidden="true" />
      </div>
      <div id="fit">
        <div id="board">
          {/* HERO */}
          <section className="hero" id="hero">
            <h1 className="sr">Manav R. Adwani</h1>
            <div className={`${A} card`} />
            <div className={`${A} pslot`} id="pslot" />
            <div className={`${A} rail`} id="rail" tabIndex={0} aria-label="Portfolio sections">
              <nav className="rl" aria-label="Sections">
                <div className="pill fill top">
                  <ul className="hnav" id="hnav" />
                  <div className="cwrap">
                    <a className="ctext" href="mailto:manavadwani@gmail.com">CONTACT</a>
                  </div>
                </div>
                <div className="pill bot" id="botPill">
                  <div className="socimg">
                    <img src="/assets/frame-2.svg" alt="" />
                    <a href="https://github.com/Manav108-hub" target="_blank" rel="noopener" aria-label="GitHub" />
                    <a href="https://www.linkedin.com/in/manav-r-adwani" target="_blank" rel="noopener" aria-label="LinkedIn" />
                  </div>
                  <div className="linkc">
                    <img src="/assets/link-icon.svg" alt="" />
                  </div>
                </div>
              </nav>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about">
            <img className={A} style={{ left: 104, top: 2650, width: 1756, height: 971.5 }} src="/assets/projects-shape.svg" alt="" />
            <svg className={A} style={{ left: 875.4, top: 1660 }} width="902.634" height="451" viewBox="0 0 903 451" aria-hidden="true">
              <defs>
                <pattern id="dotp" patternUnits="userSpaceOnUse" width="18.75" height="18.75" x="-6.572" y="0">
                  <circle cx="9.375" cy="9.375" r="1.25" fill="#fff" />
                  <animate attributeName="x" from="-6.572" to="12.178" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="y" from="0" to="-18.75" dur="1.6s" repeatCount="indefinite" />
                </pattern>
              </defs>
              <path d="M202.397 15.5342C213.432 5.53685 227.79 0 242.681 0H842.634C875.771 0 902.634 26.8629 902.634 60V391C902.634 424.137 875.771 451 842.634 451H242.681C227.79 451 213.432 445.463 202.397 435.466L19.7161 269.966C-6.57203 246.15 -6.57201 204.85 19.7161 181.034L202.397 15.5342Z" fill="#1D0201" />
              <path d="M202.397 15.5342C213.432 5.53685 227.79 0 242.681 0H842.634C875.771 0 902.634 26.8629 902.634 60V391C902.634 424.137 875.771 451 842.634 451H242.681C227.79 451 213.432 445.463 202.397 435.466L19.7161 269.966C-6.57203 246.15 -6.57201 204.85 19.7161 181.034L202.397 15.5342Z" fill="url(#dotp)" fillOpacity=".6" />
            </svg>
            <img className={A} style={{ left: 255, top: 1164, width: 1439, height: 870 }} src="/assets/about-panel.svg" alt="" />
            <div className={`${A} szone`}>
              <div className="stick" id="stick">
                <div className={`${A} side`}><img src="/assets/sidebar.svg" alt="" /></div>
                <div className={`${A} spill`}><ul className="vnav" id="vnav" /></div>
                <div className={`${A} scirc`}><img src="/assets/link-icon-sm.svg" alt="" /></div>
              </div>
            </div>
            <img className={A} style={{ left: 230, top: 1556, width: 107, height: 300 }} src="/assets/about-me.svg" alt="About me" />
            <img className={A} style={{ left: 311, top: 1230, width: 78, height: 57, transform: "rotate(180deg)" }} src="/assets/quote.svg" alt="" />
            <img className={A} style={{ left: 442, top: 1251, width: 793, height: 8 }} src="/assets/line.svg" alt="" />
            <h2
              className={A}
              style={{ left: 442, top: 1255, margin: 0, font: "400 50.2px/.91 var(--ext)", letterSpacing: "3.5px", color: "#fff", width: 456, height: 184, display: "flex", alignItems: "center" }}
            >
              MANAV R.<br />ADWANI
            </h2>
            <p className={`${A} role rv`} style={{ left: 442, top: 1426 }}>
              FULL STACK<i>|</i>CLOUD & DEVOPs<i>|</i>FREELANCER<i>|</i>ENTREPRENEURSHIP
            </p>
            <h3 className={`${A} hl rv`} style={{ left: 930, top: 1290, width: 520 }}>
              More curious<br />than <em>conventional.</em>
            </h3>
            <div className={`${A} bd rv`} style={{ left: 442, top: 1500, width: 810 }}>
              <p>I like building things, exploring ideas, and figuring out how things work.</p>
              <p>Sometimes it&apos;s software, sometimes a business idea, and sometimes something completely unexpected.</p>
            </div>
            <blockquote className={`${A} qt rv`} style={{ left: 442, top: 1722 }}>
              <span>Always experimenting. Always learning.</span>
              <b>Never sticking to just one thing.</b>
            </blockquote>
            <div className={`${A} outside rv`} style={{ left: 442, top: 1846 }}>
              <svg viewBox="0 0 70 44" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
                <path d="M35 8C28 3 14 3 4 6v32c10-3 24-3 31 2 7-5 21-5 31-2V6C56 3 42 3 35 8Z" />
                <path d="M35 8v32" />
                <path d="M11 13c6-1.5 14-1.5 20 1.5M11 21c6-1.5 14-1.5 20 1.5M11 29c6-1.5 14-1.5 20 1.5M39 14.5c6-3 14-3 20-1.5M39 22.5c6-3 14-3 20-1.5M39 30.5c6-3 14-3 20-1.5" />
              </svg>
              <i className="vr" />
              <p>Outside the screen: Football, reading books &amp; traveling.</p>
            </div>
            <div className={`${A} robot`} id="robot">
              <img src="/assets/robot.png" alt="Armoured robot in a kimono" />
            </div>
          </section>

          {/* BADGES / SKILLS */}
          <section id="skills">
            <h2 className="sr">Skills</h2>
            <img className={`${A} bk`} style={{ left: 230, top: 2350 }} src="/assets/group-18.svg" alt="" />
            <img className={`${A} bk r`} style={{ left: 1654, top: 2350 }} src="/assets/group-18.svg" alt="" />
            <div className={`${A} bbar`}>
              <div className="bview">
                <div className="btrack" id="btrack" />
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <div className={`${A} tabs`} id="tabs" />
            <div className={`${A} vwrap`} id="vwrap">
              <video id="vid" playsInline preload="metadata" />
              <div className="play" id="playIcon"><i /></div>
            </div>
            <div className={`${A} bar`} style={{ left: 1794, top: 2836 }} />
            <div className={`${A} bar`} style={{ left: 1741, top: 2981 }} />
            <div className={A} id="tech" style={{ left: 1372, top: 2746 }} />
            <p className={`${A} ext`} id="desc" style={{ left: 338, top: 3301, width: 590, height: 67, margin: 0 }} />
            <button className={`${A} ctl`} style={{ left: 1008 }} id="bPrev" aria-label="Rewind 5 seconds" title="Rewind 5s">‹</button>
            <button className={`${A} ctl`} style={{ left: 1105 }} id="bPlay" aria-label="Play / pause">▶</button>
            <button className={`${A} ctl`} style={{ left: 1202 }} id="bNext" aria-label="Forward 5 seconds" title="Forward 5s">›</button>
            <a className={`${A} visit`} id="visit" target="_blank" rel="noopener noreferrer">
              <span>VISIT SITE</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
            <svg className={`${A} knob`} id="knob" viewBox="-105 -105 210 210" role="slider" tabIndex={0} aria-label="Volume" aria-valuemin={0} aria-valuemax={100} aria-valuenow={70}>
              <circle r="105" fill="#fff2d0" />
              <g stroke="#1d0201" strokeWidth="3" strokeLinecap="round" id="ticks" />
              <g id="dial">
                <circle r="64" fill="#1d0201" />
                <circle r="50" fill="#fff2d0" />
                <circle r="30" fill="none" stroke="#1d0201" strokeWidth="3" />
                <path d="M0 -44 L-6 -34 L6 -34Z" fill="#1d0201" />
              </g>
            </svg>
            <img className={A} style={{ left: 177, top: 3461, width: 408.96, height: 101.49 }} src="/assets/my-projects.svg" alt="My projects" />
          </section>

          <JourneySection />
          <BlogsSection />
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
