"use client";

import React, { useEffect, useRef, useState } from "react";

interface PanelItem {
  n: string;
  y: string;
  d: string;
  t: string[];
  l?: string;
  sub?: string;
  r?: number;
  s?: string;
}

const feat: PanelItem = {
  n: "Hackathon 1st",
  y: "2024",
  d: "Won first place among 120 teams by shipping a working AI tutor in 36 hours.",
  t: ["Python", "React", "LLMs"],
  l: "#",
};

const star: PanelItem = {
  n: "Open Source Star",
  y: "2024",
  d: "A CLI tool with 2k GitHub stars, used by teams to automate their release process.",
  t: ["Rust", "CLI"],
  l: "#",
};

const ship: PanelItem = {
  n: "Analytics Dashboard",
  y: "2026",
  d: "Real-time product analytics over 1B events, with queries that return in under a second.",
  t: ["Next.js", "ClickHouse"],
  l: "#",
};

const wins: PanelItem[] = [
  {
    n: "Realtime Chat",
    s: "cup",
    y: "2025",
    sub: "Product launch",
    r: 5,
    d: "A chat platform handling 50k concurrent connections with sub-100ms delivery.",
    t: ["TypeScript", "Go", "Redis"],
    l: "#",
  },
  {
    n: "Payments API",
    s: "orb",
    y: "2023",
    sub: "Fintech sprint",
    r: 4,
    d: "A payments service processing thousands of transactions a day with zero-downtime deploys.",
    t: ["Node.js", "PostgreSQL", "Docker"],
    l: "#",
  },
  {
    n: "ML Pipeline",
    s: "obe",
    y: "2023",
    sub: "Data team award",
    r: 4,
    d: "Cut model training time by 70% with a distributed data pipeline.",
    t: ["Python", "Kubernetes"],
    l: "#",
  },
  {
    n: "Design System",
    s: "star",
    y: "2022",
    sub: "Internal tools",
    r: 3,
    d: "A component library used across 8 products, with full keyboard and screen reader support.",
    t: ["React", "Storybook"],
    l: "#",
  },
];

const certs: PanelItem[] = [
  {
    n: "B.Sc. Computer Science",
    y: "2022",
    sub: "Your University",
    r: 5,
    d: "Graduated with honors. Focus on distributed systems.",
    t: ["Honors"],
  },
  {
    n: "AWS Certified",
    y: "2023",
    sub: "Solutions Architect",
    r: 4,
    d: "Professional-level cloud architecture certification.",
    t: ["AWS"],
  },
  {
    n: "Dean's List",
    y: "2022",
    sub: "6 semesters",
    r: 4,
    d: "Recognized for academic excellence.",
    t: ["Academic"],
  },
  {
    n: "Speaker",
    y: "2024",
    sub: "Local DevConf",
    r: 3,
    d: "Gave a talk on building reliable systems on a budget.",
    t: ["Talk"],
  },
];

export default function Home() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelData, setPanelData] = useState<PanelItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"w" | "c">("w");

  const deckRef = useRef<HTMLDivElement>(null);

  const show = (item: PanelItem) => {
    setPanelData(item);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDeckPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const deck = deckRef.current;
    if (!deck) return;
    const r = deck.getBoundingClientRect();
    const a = (e.clientX - r.left) / r.width - 0.5;
    const b = (e.clientY - r.top) / r.height - 0.5;
    deck.style.setProperty("--ry", `${-10 + a * 26}deg`);
    deck.style.setProperty("--rx", `${-b * 10}deg`);
  };

  const handleDeckPointerLeave = () => {
    const deck = deckRef.current;
    if (!deck) return;
    deck.style.removeProperty("--ry");
    deck.style.removeProperty("--rx");
  };

  const currentList = mode === "w" ? wins : certs;

  return (
    <>
      {/* SVG Definitions */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#8a6246" />
            <stop offset="0.45" stopColor="#f3ece3" />
            <stop offset="1" stopColor="#6e4b34" />
          </linearGradient>
          <symbol id="base" viewBox="0 0 100 140">
            <path d="M44 96h12v14H44z" fill="url(#g)" />
            <path d="M28 110h44l5 10H23z" fill="#a57c5b" />
            <rect
              x="18"
              y="120"
              width="64"
              height="20"
              fill="#2a1c14"
              stroke="#a57c5b"
            />
          </symbol>
          <symbol id="cup" viewBox="0 0 100 140">
            <use href="#base" />
            <path
              d="M26 10h48v30c0 24-12 38-24 40-12-2-24-16-24-40z"
              fill="url(#g)"
            />
            <path
              d="M26 18H10c0 18 8 26 20 28M74 18h16c0 18-8 26-20 28"
              fill="none"
              stroke="#d9c3a5"
              strokeWidth="5"
            />
          </symbol>
          <symbol id="star" viewBox="0 0 100 140">
            <use href="#base" />
            <path
              d="M50 8l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3z"
              fill="url(#g)"
            />
          </symbol>
          <symbol id="orb" viewBox="0 0 100 140">
            <use href="#base" />
            <circle cx="50" cy="52" r="40" fill="url(#g)" />
            <path
              d="M10 52h80M50 12c-22 22-22 58 0 80M50 12c22 22 22 58 0 80"
              fill="none"
              stroke="#5a3d2b"
              strokeWidth="2"
            />
          </symbol>
          <symbol id="obe" viewBox="0 0 100 140">
            <use href="#base" />
            <path d="M50 4l16 30 6 62H28l6-62z" fill="url(#g)" />
          </symbol>
        </defs>
      </svg>

      {/* Navigation */}
      <nav className="bar">
        <div className="wrap">
          <a
            className="logo"
            href="#top"
            onClick={() => setMenuOpen(false)}
          >
            Sajidul Islam
          </a>

          {/* Desktop links */}
          <div className="desktop-links">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#awards">Awards</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div className="mobile-menu-drawer">
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#work" onClick={() => setMenuOpen(false)}>
              Work
            </a>
            <a href="#awards" onClick={() => setMenuOpen(false)}>
              Awards
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="hero" id="top">
        <div className="wrap">
          <div className="eyebrow">Software Engineer · Dhaka</div>
          <h1>I build software that holds up under pressure.</h1>
          <p>Backends, clean interfaces, and the details nobody sees until they break.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a className="btn f" href="#work">
              See my work
            </a>
            <a className="btn" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="light" id="about">
        <div className="wrap">
          <h2 className="sec">About</h2>
          <div className="about">
            <div>
              <p>
                I&apos;m a software engineer who likes turning messy problems into
                small, fast, reliable systems. Replace this text with your own story:
                where you studied, what you&apos;ve shipped, and what you want to
                build next.
              </p>
              <p>
                Outside of work I contribute to open source and mentor students who
                are just starting out.
              </p>
            </div>
            <div className="sk">
              <h3>Languages</h3>
              <p>TypeScript, Python, Go, Rust</p>
              <h3>Frontend</h3>
              <p>React, Next.js, accessible UI</p>
              <h3>Backend and cloud</h3>
              <p>Node.js, PostgreSQL, Redis, Docker, AWS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="light" id="work" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="sec">Selected work</h2>
          <a className="row" href="#">
            <b>Realtime Chat</b>
            <span>TypeScript, Go, Redis</span>
            <i>2025</i>
          </a>
          <a className="row" href="#">
            <b>Payments API</b>
            <span>Node.js, PostgreSQL, Docker</span>
            <i>2023</i>
          </a>
          <a className="row" href="#">
            <b>ML Pipeline</b>
            <span>Python, Kubernetes</span>
            <i>2023</i>
          </a>
          <a className="row" href="#">
            <b>Design System</b>
            <span>React, Storybook</span>
            <i>2022</i>
          </a>
        </div>
      </section>

      {/* Awards Shelf Section (Skeuomorphic 3D Bookshelf & Trophy Room) */}
      <section className="awards" id="awards" aria-label="Awards">
        <div
          className="deck"
          id="deck"
          ref={deckRef}
          onPointerMove={handleDeckPointerMove}
          onPointerLeave={handleDeckPointerLeave}
        >
          <div className="top">
            <i className="shelf" />

            {/* Top Toolbar */}
            <div className="bar2">
              <span className="lg">TROPHY ROOM</span>
              <div className="tabs">
                <button
                  type="button"
                  className={mode === "w" ? "on" : ""}
                  onClick={() => setMode("w")}
                >
                  Trophies
                </button>
                <button
                  type="button"
                  className={mode === "c" ? "on" : ""}
                  onClick={() => setMode("c")}
                >
                  Certificates
                </button>
              </div>
              <span className="cnt">6 wins · 4 certificates</span>
            </div>

            {/* Intro Header */}
            <div className="intro">
              <h2>
                Awards
                <br />
                &amp; Wins
              </h2>
              <p>Things I&apos;ve built that earned a spot on the shelf.</p>
              <div className="pill">✦ Click anything for the story</div>
            </div>

            {/* Featured Trophy on Shelf */}
            <button
              type="button"
              className="feat"
              id="feat"
              aria-label="Hackathon 1st"
              onClick={() => show(feat)}
            >
              <span className="badge">#1 · Hackathon winner</span>
              <div className="tilt">
                <svg viewBox="0 0 100 140">
                  <use href="#cup" />
                </svg>
              </div>
            </button>

            {/* Side Cards on Shelf */}
            <div className="side">
              <div className="vl">Latest win</div>
              <button
                type="button"
                className="card a"
                id="ca"
                onClick={() => show(star)}
              >
                <b>Open Source Star</b>
                <small>2k GitHub stars</small>
                <svg viewBox="0 0 100 140">
                  <use href="#star" />
                </svg>
              </button>

              <div className="vl">Last shipped</div>
              <button
                type="button"
                className="card b"
                id="cb"
                onClick={() => show(ship)}
              >
                <b>Analytics Dashboard</b>
                <small>Next.js · ClickHouse</small>
                <div className="disc">✦</div>
                <div className="playback-bar" />
                <span className="go2">↗</span>
              </button>
            </div>
          </div>

          {/* Lower Shelf and Items */}
          <div className="low" id="low">
            <div className="vl">
              {mode === "w" ? "Recent wins" : "Certificates"}
            </div>
            <div className="lowin">
              <div className="rack">
                <i className="shelf" />
                {currentList.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="mini"
                    aria-label={item.n}
                    onClick={() => show(item)}
                  >
                    {mode === "w" ? (
                      <svg viewBox="0 0 100 140">
                        <use href={`#${item.s}`} />
                      </svg>
                    ) : (
                      <div
                        className="cf"
                        style={
                          {
                            "--r": `${idx % 2 ? 2 : -2}deg`,
                          } as React.CSSProperties
                        }
                      >
                        {item.n}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="info">
                {currentList.map((item, idx) => (
                  <div key={idx} className="inf">
                    <div className="st" aria-hidden="true">
                      {"★".repeat(item.r || 5)}
                      {"☆".repeat(5 - (item.r || 5))}
                    </div>
                    <b>{item.n}</b>
                    <small>
                      {item.sub} · {item.y}
                    </small>
                    <button
                      type="button"
                      className="ob"
                      onClick={() => show(item)}
                    >
                      View story
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="wrap">
          <h2 className="sec">Let&apos;s work together</h2>
          <a className="big" href="mailto:you@example.com">
            you@example.com
          </a>
          <p>Open to full-time roles and interesting side projects.</p>
          <div className="flex flex-wrap gap-3">
            <a className="btn" href="#">
              GitHub
            </a>
            <a className="btn" href="#">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="wrap">© 2026 Sajidul Islam</div>
      </footer>

      {/* Slide-over Detail Drawer Panel */}
      <aside
        className={`panel ${panelOpen ? "open" : ""}`}
        id="panel"
        aria-live="polite"
      >
        <button
          type="button"
          className="x"
          aria-label="Close"
          onClick={closePanel}
        >
          ×
        </button>
        {panelData && (
          <div id="pc">
            <h3>{panelData.n}</h3>
            <div className="yr">{panelData.y}</div>
            <p>{panelData.d}</p>
            <div className="tags">
              {panelData.t.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
            {panelData.l && (
              <a className="go" href={panelData.l}>
                View project
              </a>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
