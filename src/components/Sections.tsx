/* Journey, Blogs and Contact screens (each one is a 1920x1080 "screen" on the board). */
import { POSTS } from "@/lib/content";
import { BLOG_URL, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/config";

const A = "a";

export const SCREEN_TOPS = { journey: 3722, blogs: 4802, contact: 5902 } as const;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export function JourneySection() {
  return (
    <section id="journey" className={`${A} scr`} style={{ top: SCREEN_TOPS.journey }}>
      <h2 className="sr">Journey</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={A} src="/assets/journey-title.svg" style={{ left: 182, top: 70 }} alt="" />
      <div className={`${A} jframe`} id="jframe" style={{ left: 208, top: 59, width: 1712, height: 823 }}>
        <svg className={A} id="jsvg" width="1712" height="823" viewBox="0 0 1712 823" style={{ left: 0, top: 0, overflow: "visible" }} aria-hidden="true" />
        <div id="cards" />
        <div className={`${A} ship`} id="ship">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/falcon.svg?v=2" alt="Millennium Falcon" />
        </div>
      </div>
    </section>
  );
}

export function BlogsSection() {
  const [feat, ...rest] = POSTS;
  const card = (p: (typeof POSTS)[number], style: React.CSSProperties, big = false) => {
    const live = !!p.href;
    return (
      <a
        key={p.title}
        className={`${A} post rv${big ? " big" : ""}${live ? "" : " soon"}`}
        style={style}
        {...(live ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : { "aria-disabled": true })}
      >
        {big && <span className="pidx" aria-hidden="true">01</span>}
        <span className="prow"><span className="chip">{p.tag}</span><span className="pmeta">{live ? p.meta : "COMING SOON"}</span></span>
        <span className="pbody">
          <strong>{p.title}</strong>
          <span>{p.excerpt}</span>
        </span>
        <span className="prow">
          <span className="pmeta">{p.meta}</span>
          <span className="parrow"><Arrow /></span>
        </span>
      </a>
    );
  };
  return (
    <section id="blogs" className="scr" style={{ top: SCREEN_TOPS.blogs }}>
      <div className={`${A} pnl ink`} />
      <p className={`${A} eyebrow rv`} style={{ left: 330, top: 100 }}>04 / BLOGS</p>
      <h2 className={`${A} title rv`} style={{ left: 326, top: 126 }}>THE <i>BLOG</i></h2>
      <h3 className={`${A} hl rv`} style={{ left: 1230, top: 150, width: 540 }}>
        Notes from the <em>build log.</em>
      </h3>
      <a
        className={`${A} pillb${BLOG_URL ? "" : " off"}`}
        style={{ left: 1230, top: 262 }}
        {...(BLOG_URL ? { href: BLOG_URL, target: "_blank", rel: "noopener noreferrer" } : { "aria-disabled": true })}
      >
        <span>ALL POSTS</span><Arrow />
      </a>
      {card(feat, { left: 330, top: 360, width: 700, height: 610 }, true)}
      {rest.map((p, i) => card(p, { left: 1070, top: 360 + i * 320, width: 720, height: 290 }))}
    </section>
  );
}

export function ContactSection() {
  const socials = [
    { k: "GITHUB", href: GITHUB_URL },
    { k: "LINKEDIN", href: LINKEDIN_URL },
    { k: "EMAIL", href: `mailto:${CONTACT_EMAIL}` },
  ];
  const strip = "FULL STACK ✦ CLOUD ✦ ENTREPRENEURSHIP ✦ ";
  return (
    <section id="contact" className="scr" style={{ top: SCREEN_TOPS.contact }}>
      <div className={`${A} pnl wine`} />
      <p className={`${A} eyebrow rv`} style={{ left: 330, top: 100 }}>05 / CONTACT</p>
      <h2 className={`${A} title huge rv`} style={{ left: 322, top: 112 }}>LET&apos;S <i>TALK</i></h2>
      <span className={`${A} avail rv`} style={{ left: 1400, top: 170 }}><b className="live" />OPEN TO WORK &amp; COLLABS</span>
      <h3 className={`${A} hl rv`} style={{ left: 330, top: 440, width: 760 }}>
        Got an idea, a project, or just want to say hi? <em>My inbox is always open.</em>
      </h3>
      <a className={`${A} cta rv`} style={{ left: 330, top: 640 }} href={`mailto:${CONTACT_EMAIL}`}>
        <span>{CONTACT_EMAIL.toUpperCase()}</span><i><Arrow /></i>
      </a>
      <button className={`${A} copy rv`} style={{ left: 1050, top: 640 }} id="copyMail" data-email={CONTACT_EMAIL} type="button">COPY</button>

      <ul className={`${A} socials rv`} style={{ left: 1290, top: 440 }}>
        {socials.map((s) => (
          <li key={s.k}>
            <a href={s.href} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <span>{s.k}</span><Arrow />
            </a>
          </li>
        ))}
      </ul>

      <div className={`${A} mq`} aria-hidden="true">
        <div className="mqt">{[0, 1, 2, 3].map((n) => <span key={n}>{strip.repeat(3)}</span>)}</div>
      </div>
      <p className={`${A} foot`} style={{ left: 330, top: 985 }}>&copy; 2026 MANAV R. ADWANI</p>
      <button className={`${A} foot totop`} style={{ left: 1560, top: 978 }} id="toTop" type="button">BACK TO TOP &uarr;</button>
    </section>
  );
}
