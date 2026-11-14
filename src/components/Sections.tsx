/* Journey, Blogs and Contact screens (each one is a 1920x1080 "screen" on the board). */
import { useState, type FormEvent } from "react";
import { POSTS } from "@/lib/constants/blogs";
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
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : POSTS.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < POSTS.length - 1 ? prev + 1 : 0));
  };

  const TOP = 33;
  const TRAVEL = 459 - 93 - 10;
  const thumbTop = TOP + (POSTS.length > 1 ? (TRAVEL * activeIdx) / (POSTS.length - 1) : 0);

  return (
    <section className="blogs scr" id="blogs" style={{ top: SCREEN_TOPS.blogs }} aria-labelledby="blogs-title">
      <div className="blog-stage" id="blogs-stage">
        {/* ======================= PANEL ======================= */}
        <div className="blog-panel">
          <svg className="blog-shape" viewBox="0 0 1018 623" aria-hidden="true">
            <defs>
              {/* circular cut-out that the vinyl sits in */}
              <mask id="cut" maskUnits="userSpaceOnUse" x="-900" y="-100" width="2200" height="900">
                <rect x="-900" y="-100" width="2200" height="900" fill="#fff" />
                <circle cx="-304" cy="315" r="399" fill="#000" />
              </mask>
              <mask id="railMask" maskUnits="userSpaceOnUse" x="-900" y="-100" width="2200" height="900">
                <rect x="-900" y="-100" width="2200" height="900" fill="#fff" />
                <circle cx="-304" cy="315" r="445" fill="#000" />
              </mask>
            </defs>

            {/* dark body */}
            <path
              mask="url(#cut)"
              fill="#1d0201"
              d="M50 0H958A60 60 0 0 1 1018 60V473A40 40 0 0 1 978 513H718C690 513 672 520 655 540L598 603A30 30 0 0 1 570 623H50A50 50 0 0 1 0 573V50A50 50 0 0 1 50 0Z"
            />

            {/* maroon arrow rail (top + bottom halves) */}
            <g mask="url(#railMask)" fill="#620c29">
              <rect x="36" y="28" width="144" height="275" rx="20" />
              <rect x="36" y="325" width="144" height="268" rx="20" />
            </g>
          </svg>

          <button
            className="blog-nav-btn up"
            id="blog-up"
            aria-label="Previous post"
            type="button"
            onClick={handlePrev}
          >
            <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <path d="M12 40 40 12 68 40M40 12V74" stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="blog-nav-btn down"
            id="blog-down"
            aria-label="Next post"
            type="button"
            onClick={handleNext}
          >
            <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <path d="M12 40 40 68 68 40M40 68V6" stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="blog-dots" aria-hidden="true" />

          <ol className="blog-posts" id="blog-list">
            {POSTS.map((post, idx) => {
              const isActive = idx === activeIdx;
              return (
                <li
                  key={post.title + idx}
                  className={`blog-post ${isActive ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  <a
                    href={post.href || `#post-${idx + 1}`}
                    target={post.href ? "_blank" : undefined}
                    rel={post.href ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      setActiveIdx(idx);
                      if (!post.href) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <span className="num">{idx + 1}</span>
                    <span className="name">{post.title}</span>
                    <span className="meta">
                      <time dateTime="2026-01-01">{post.date || "01 Jan 2026"}</time>
                      <span>{post.tag}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>

          <div className="blog-track" aria-hidden="true" />
          <div className="blog-thumb" id="blog-thumb" style={{ top: `${thumbTop}px` }} aria-hidden="true" />
        </div>

        {/* ======================= VINYL ======================= */}
        <div className="blog-vinyl">
          <svg viewBox="0 0 706 707" role="img" aria-labelledby="blogs-title">
            <title id="blogs-title">Blogs</title>
            <defs>
              <clipPath id="disc">
                <circle cx="353.5" cy="353.5" r="328.5" />
              </clipPath>
              <pattern
                id="ellipseDots"
                patternUnits="userSpaceOnUse"
                width="15"
                height="15"
                patternTransform="matrix(-1 0 0 -1 263.494 320.197)"
              >
                <circle cx="7.5" cy="7.5" r="1.15" fill="#ffffff" />
              </pattern>
            </defs>

            {/* record */}
            <circle cx="353.5" cy="353.5" r="328.5" fill="#1d0201" />

            {/* Ellipse 14.svg dotted sector on both opposite sides with bass teeter animation */}
            <g clipPath="url(#disc)" className="vinyl-bass">
              {/* Top-right sector */}
              <g transform="translate(353.5, 33.303)">
                <path
                  d="M74.9463 -0.000205303C150.373 17.6543 217.145 61.3691 263.494 123.438L2.87491e-05 320.197L74.9463 -0.000205303Z"
                  fill="url(#ellipseDots)"
                  opacity="0.9"
                />
              </g>
              {/* Opposite bottom-left sector */}
              <g transform="rotate(180 353.5 353.5) translate(353.5, 33.303)">
                <path
                  d="M74.9463 -0.000205303C150.373 17.6543 217.145 61.3691 263.494 123.438L2.87491e-05 320.197L74.9463 -0.000205303Z"
                  fill="url(#ellipseDots)"
                  opacity="0.9"
                />
              </g>
            </g>

            {/* outer dashed ring + red arcs (rotating) */}
            <g className="vinyl-rotating-lines">
              <circle cx="353" cy="353.5" r="352" fill="none" stroke="#620c29" strokeWidth="1.5" strokeDasharray="6 5" />
              <path d="M22 232A352 352 0 0 1 300 8" fill="none" stroke="#9b0000" strokeWidth="10" strokeLinecap="round" />
              <path d="M684 478A352 352 0 0 1 640 555" fill="none" stroke="#9b0000" strokeWidth="10" strokeLinecap="round" />
            </g>

            {/* label */}
            {/* Ellipse 10.svg: 12-segment dashed ring around the center hub */}
            <g transform="translate(256.5, 256.5)">
              <path
                d="M192.189 84.4615C192.724 88.5652 193 92.7504 193 97C193 101.25 192.724 105.435 192.189 109.538M185.715 60.2524C182.479 52.4478 178.243 45.1627 173.166 38.5567M155.443 20.8336C148.837 15.7573 141.552 11.5209 133.748 8.28452M109.538 1.81142C105.435 1.27613 101.25 1 97 1C92.7504 1 88.5652 1.27613 84.4615 1.81142M60.2524 8.28453C52.4478 11.521 45.1627 15.7573 38.5567 20.8337M20.8336 38.5567C15.7573 45.1627 11.5209 52.4478 8.28452 60.2524M1.81142 84.4615C1.27613 88.5652 1 92.7504 1 97C1 101.25 1.27613 105.435 1.81142 109.538M8.28453 133.748C11.521 141.552 15.7573 148.837 20.8337 155.443M38.5567 173.166C45.1627 178.243 52.4478 182.479 60.2524 185.715M84.4615 192.189C88.5652 192.724 92.7504 193 97 193C101.25 193 105.435 192.724 109.538 192.189M133.748 185.715C141.552 182.479 148.837 178.243 155.443 173.166M173.166 155.443C178.243 148.837 182.479 141.552 185.715 133.748"
                stroke="#fff2d0"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>
            <circle cx="353.5" cy="353.5" r="82" fill="#620c29" />
            <circle cx="353.5" cy="353.5" r="46" fill="#fff2d0" />

            {/* BLOGS title: moved slightly left (x="40" instead of x="55") */}
            <text className="title" x="40" y="405" textLength="177" lengthAdjust="spacingAndGlyphs">
              BLOGS
            </text>
          </svg>
        </div>
      </div>
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
