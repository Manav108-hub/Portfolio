/* Journey, Blogs and Contact screens (each one is a 1920x1080 "screen" on the board). */
import { useState, type FormEvent } from "react";
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

type BentoTile = "phone" | "email" | "linkedin" | "github" | null;

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [hoveredTile, setHoveredTile] = useState<BentoTile>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message || !email) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        // Fallback to mailto if Resend key is missing or not configured
        if (res.status === 503) {
          const subject = encodeURIComponent(`Portfolio Transmission from ${name || "Visitor"}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
          window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
          setStatus("sent");
          setTimeout(() => setStatus("idle"), 3500);
          return;
        }
        throw new Error(data.error || "Failed to send");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      // Graceful fallback to mailto if network or api fails
      const subject = encodeURIComponent(`Portfolio Transmission from ${name || "Visitor"}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  const bentoClass = `contact-bento rv ${
    hoveredTile ? `expanded hover-${hoveredTile}` : "idle"
  }`;

  return (
    <section id="contact" className="scr" style={{ top: SCREEN_TOPS.contact }}>
      {/* Dotted lines to the left of Contact Me */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/contact-dots-left.svg"
        alt=""
        className={`${A} rv`}
        style={{ left: 182, top: 99, width: 250, height: 73 }}
        aria-hidden="true"
      />

      {/* Title */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/contact-title.svg"
        alt="Contact Me"
        className={`${A} rv`}
        style={{ left: 456, top: 74, width: 372, height: 102 }}
      />

      {/* Left Card */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/contact-card-left.svg"
        alt=""
        className={`${A} rv`}
        style={{ left: 182, top: 230, width: 725, height: 694 }}
        aria-hidden="true"
      />

      {/* Bento inside Left Card with interactive smooth hover expansion */}
      <div
        className={`${A} ${bentoClass}`}
        onMouseLeave={() => setHoveredTile(null)}
      >
        {/* Phone */}
        <a
          href="tel:+917757866041"
          className={`bento-tile ${hoveredTile === "phone" ? "active" : ""}`}
          onMouseEnter={() => setHoveredTile("phone")}
          aria-label="Call or Phone"
          title="Phone"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-icon-phone.svg" alt="" style={{ width: 60, height: 60 }} />
          <div className="bento-tile-text">
            <span>7757866041</span>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={`bento-tile ${hoveredTile === "email" ? "active" : ""}`}
          onMouseEnter={() => setHoveredTile("email")}
          aria-label="Send Email"
          title="Email"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-icon-mail.svg" alt="" style={{ width: 60, height: 45 }} />
          <div className="bento-tile-text">
            <span>manavadwani86<br />@gmail.com</span>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`bento-tile ${hoveredTile === "linkedin" ? "active" : ""}`}
          onMouseEnter={() => setHoveredTile("linkedin")}
          aria-label="LinkedIn Profile"
          title="LinkedIn"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-icon-linkedin.svg" alt="" style={{ width: 60, height: 60 }} />
          <div className="bento-tile-text">
            <span>@Manav-R-Adwani</span>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`bento-tile ${hoveredTile === "github" ? "active" : ""}`}
          onMouseEnter={() => setHoveredTile("github")}
          aria-label="GitHub Profile"
          title="GitHub"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-icon-github.svg" alt="" style={{ width: 60, height: 58 }} />
          <div className="bento-tile-text">
            <span>@Manav108-hub</span>
          </div>
        </a>
      </div>

      {/* Bottom right accent of left card */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/contact-rect36.svg"
        alt=""
        className={`${A} rv`}
        style={{ left: 791, top: 821, width: 161, height: 161 }}
        aria-hidden="true"
      />

      {/* Right Container: Form Tab & Card Frame */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/contact-tab.svg"
        alt=""
        className={`${A} rv`}
        style={{ left: 892, top: 0, width: 992, height: 174 }}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/contact-card-right.svg"
        alt=""
        className={`${A} rv`}
        style={{ left: 892, top: 88, width: 992, height: 866 }}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/contact-accent.svg"
        alt=""
        className={`${A} rv`}
        style={{ left: 1857, top: 757, width: 52, height: 183 }}
        aria-hidden="true"
      />
      <div
        className={`${A} rv`}
        style={{ left: 892, top: 930, width: 976, height: 52, background: "#1d0201" }}
        aria-hidden="true"
      />
      <div
        className={`${A} rv`}
        style={{
          left: 1830,
          top: 903,
          width: 78.5,
          height: 78.5,
          background: "#1d0201",
          transform: "rotate(-135deg)",
        }}
        aria-hidden="true"
      />

      {/* Header Row: Title & Dotted Grid */}
      <div
        className={`${A} rv`}
        style={{
          left: 988,
          top: 148,
          width: 848,
          height: 74,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 28,
        }}
      >
        <h3
          style={{
            margin: 0,
            font: "700 32px/1.05 var(--ext)",
            letterSpacing: "2.24px",
            color: "var(--cream)",
            flex: "none",
            whiteSpace: "nowrap",
          }}
        >
          DROP ME A<br />MESSAGE
        </h3>
        <div style={{ flex: 1, height: 42, overflow: "hidden", display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/contact-dots-header.svg"
            alt=""
            style={{ width: "100%", height: 42, objectFit: "cover", objectPosition: "left center" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Form Fields & Transmission Button */}
      <form onSubmit={handleSubmit} className={`${A} contact-form rv`} style={{ left: 988, top: 251 }}>
        {/* Name input */}
        <div className="contact-field" style={{ marginBottom: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-input-cap.svg" alt="" className="contact-field-cap flip" aria-hidden="true" />
          <div className="contact-field-body">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-input-cap.svg" alt="" className="contact-field-cap" aria-hidden="true" />
        </div>

        {/* Email input */}
        <div className="contact-field" style={{ marginBottom: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-input-cap.svg" alt="" className="contact-field-cap flip" aria-hidden="true" />
          <div className="contact-field-body">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-input-cap.svg" alt="" className="contact-field-cap" aria-hidden="true" />
        </div>

        {/* Message textarea */}
        <div className="contact-field" style={{ marginBottom: 42 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-input-cap.svg" alt="" className="contact-field-cap flip" aria-hidden="true" />
          <div className="contact-field-body area">
            <textarea
              name="message"
              placeholder="Your Message _"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-input-cap.svg" alt="" className="contact-field-cap" aria-hidden="true" />
        </div>

        {/* Transmission Button with dotted pattern frames on left and right */}
        <button type="submit" className="contact-btn">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/contact-btn.svg" alt="" aria-hidden="true" />
          <div className="contact-btn-content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/contact-dots-btn.svg" alt="" className="contact-btn-dots" aria-hidden="true" />
            <span>
              {status === "sending"
                ? "TRANSMITTING..."
                : status === "sent"
                ? "TRANSMISSION SENT ✓"
                : "SEND TRANSMISSION"}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/contact-dots-btn.svg" alt="" className="contact-btn-dots" aria-hidden="true" />
          </div>
        </button>
      </form>

      {/* Back to top button */}
      <button className={`${A} foot totop`} style={{ left: 1650, top: 1000 }} id="toTop" type="button">
        BACK TO TOP &uarr;
      </button>
    </section>
  );
}
