"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [lightsOn, setLightsOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"w" | "c">("w");
  const [selectedItem, setSelectedItem] = useState<PanelItem | null>(null);
  const [navLt, setNavLt] = useState(false);

  const deckRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Dynamic light/dark tone switching for liquid glass navbar on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          if (!navRef.current) return;
          const y = navRef.current.getBoundingClientRect().top + 28;
          const lightEls = Array.from(document.querySelectorAll(".light, .awards"));
          const isOverLight = lightEls.some((el) => {
            const rect = el.getBoundingClientRect();
            return rect.top <= y && rect.bottom >= y;
          });
          setNavLt(isOverLight);
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close slide-over panel on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 3D Tilt handler for bookshelf deck
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!deckRef.current) return;
    const r = deckRef.current.getBoundingClientRect();
    const a = (e.clientX - r.left) / r.width - 0.5;
    const b = (e.clientY - r.top) / r.height - 0.5;
    deckRef.current.style.setProperty("--ry", `${-10 + a * 26}deg`);
    deckRef.current.style.setProperty("--rx", `${-b * 10}deg`);
  };

  const handlePointerLeave = () => {
    if (!deckRef.current) return;
    deckRef.current.style.removeProperty("--ry");
    deckRef.current.style.removeProperty("--rx");
  };

  return (
    <>
      {/* SVG Definitions for 3D Trophy Room */}
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
            <rect x="18" y="120" width="64" height="20" fill="#2a1c14" stroke="#a57c5b" />
          </symbol>
          <symbol id="cup" viewBox="0 0 100 140">
            <use href="#base" />
            <path d="M26 10h48v30c0 24-12 38-24 40-12-2-24-16-24-40z" fill="url(#g)" />
            <path
              d="M26 18H10c0 18 8 26 20 28M74 18h16c0 18-8 26-20 28"
              fill="none"
              stroke="#d9c3a5"
              strokeWidth="5"
            />
          </symbol>
          <symbol id="star" viewBox="0 0 100 140">
            <use href="#base" />
            <path d="M50 8l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3z" fill="url(#g)" />
          </symbol>
          <symbol id="orb" viewBox="0 0 100 140">
            <use href="#base" />
            <circle cx="50" cy="52" r="40" fill="url(#g)" />
            <path d="M10 52h80M50 12c-22 22-22 58 0 80M50 12c22 22 22 58 0 80" fill="none" stroke="#5a3d2b" strokeWidth="2" />
          </symbol>
          <symbol id="obe" viewBox="0 0 100 140">
            <use href="#base" />
            <path d="M50 4l16 30 6 62H28l6-62z" fill="url(#g)" />
          </symbol>
        </defs>
      </svg>

      {/* Liquid Glass Navbar */}
      <nav ref={navRef} className={`bar ${navLt ? "lt" : ""}`}>
        <div className="wrap">
          <a className="logo" href="#top">
            Sajidul Islam
          </a>
          <div className="desktop-links">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#awards">Awards</a>
            <a href="#contact">Contact</a>
          </div>
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
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

      {/* Hero Room Scene with Interactive Lights & Retro TV Terminal */}
      <header className={`hero ${lightsOn ? "on" : ""}`} id="top">
        <h1 className="sr">Sajidul Islam, software engineer</h1>
        <div className="hscene">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-room.png"
            width={1384}
            height={1060}
            alt="A modern home office where a developer works on a laptop, with a wall-mounted TV"
          />
          <div className="vig"></div>
          <div className="tv">
            <div className="tt">
              ~/skills --list<b></b>
            </div>
            <div className="g">
              <span>lang</span>
              <i>TypeScript</i>
              <i>Go</i>
              <i>Rust</i>
              <i>Python</i>
            </div>
            <div className="g">
              <span>web</span>
              <i>React</i>
              <i>Next.js</i>
              <i>Tailwind</i>
            </div>
            <div className="g">
              <span>backend</span>
              <i>Node.js</i>
              <i>PostgreSQL</i>
              <i>Redis</i>
            </div>
            <div className="g">
              <span>cloud</span>
              <i>AWS</i>
              <i>Docker</i>
              <i>K8s</i>
            </div>
          </div>
        </div>

        {/* Interactive Light Bulb Switch */}
        <button
          className="bulb"
          id="bulb"
          onClick={() => setLightsOn(!lightsOn)}
          aria-pressed={lightsOn}
          aria-label={lightsOn ? "Turn the lights off" : "Turn the lights on"}
        >
          <span className="ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
            </svg>
          </span>
          <span id="bl">{lightsOn ? "Lights off" : "Lights on"}</span>
        </button>

        {/* Hero Actions */}
        <div className="wrap hcta">
          <a className="btn f" href="#work">
            See my work
          </a>
          <a className="btn" href="#contact">
            Get in touch
          </a>
        </div>
      </header>

      {/* About Section */}
      <section className="light" id="about">
        <div className="wrap">
          <h2 className="sec">About</h2>
          <div className="about">
            <div>
              <p>
                I&apos;m a software engineer who likes turning messy problems into small, fast, reliable systems.
                Replace this text with your own story: where you studied, what you&apos;ve shipped, and what you want to
                build next.
              </p>
              <p>Outside of work I contribute to open source and mentor students who are just starting out.</p>
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

      {/* Selected Work Section */}
      <section className="light" id="work" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="sec">Selected work</h2>
          <a className="row" href="#work">
            <b>Realtime Chat</b>
            <span>TypeScript, Go, Redis</span>
            <i>2025</i>
          </a>
          <a className="row" href="#work">
            <b>Payments API</b>
            <span>Node.js, PostgreSQL, Docker</span>
            <i>2023</i>
          </a>
          <a className="row" href="#work">
            <b>ML Pipeline</b>
            <span>Python, Kubernetes</span>
            <i>2023</i>
          </a>
          <a className="row" href="#work">
            <b>Design System</b>
            <span>React, Storybook</span>
            <i>2022</i>
          </a>
        </div>
      </section>

      {/* 3D Bookshelf Trophy Room Section */}
      <section className="awards" id="awards" aria-label="Awards">
        <div
          className="deck"
          id="deck"
          ref={deckRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {/* Top Shelf */}
          <div className="top">
            <i className="shelf"></i>
            <div className="bar2">
              <span className="lg">TROPHY ROOM</span>
              <div className="tabs">
                <button
                  className={mode === "w" ? "on" : ""}
                  onClick={() => setMode("w")}
                  data-tab="w"
                >
                  Trophies
                </button>
                <button
                  className={mode === "c" ? "on" : ""}
                  onClick={() => setMode("c")}
                  data-tab="c"
                >
                  Certificates
                </button>
              </div>
              <span className="cnt">6 wins · 4 certificates</span>
            </div>

            <div className="intro">
              <h2>
                Awards
                <br />
                &amp; Wins
              </h2>
              <p>Things I&apos;ve built that earned a spot on the shelf.</p>
              <div className="pill">✦ Click anything for the story</div>
            </div>

            <button
              className="feat"
              id="feat"
              onClick={() => setSelectedItem(feat)}
              aria-label="Hackathon 1st"
            >
              <span className="badge">#1 · Hackathon winner</span>
              <div className="tilt">
                <svg viewBox="0 0 100 140">
                  <use href="#cup" />
                </svg>
              </div>
            </button>

            <div className="side">
              <div className="vl">Latest win</div>
              <button
                className="card a"
                id="ca"
                onClick={() => setSelectedItem(star)}
              >
                <b>Open Source Star</b>
                <small>2k GitHub stars</small>
                <svg viewBox="0 0 100 140">
                  <use href="#star" />
                </svg>
              </button>
              <div className="vl">Last shipped</div>
              <button
                className="card b"
                id="cb"
                onClick={() => setSelectedItem(ship)}
              >
                <b>Analytics Dashboard</b>
                <small>Next.js · ClickHouse</small>
                <div className="disc">✦</div>
                <div className="pbar"></div>
                <span className="go2">↗</span>
              </button>
            </div>
          </div>

          {/* Lower Shelf */}
          <div className="low" id="low">
            <div className="vl">{mode === "w" ? "Recent wins" : "Certificates"}</div>
            <div className="lowin">
              <div className="rack">
                <i className="shelf"></i>
                {(mode === "w" ? wins : certs).map((item, idx) => (
                  <button
                    key={item.n}
                    className="mini"
                    onClick={() => setSelectedItem(item)}
                    aria-label={item.n}
                  >
                    {mode === "w" ? (
                      <svg viewBox="0 0 100 140">
                        <use href={`#${item.s}`} />
                      </svg>
                    ) : (
                      <div
                        className="cf"
                        style={{ ["--r" as string]: `${idx % 2 ? 2 : -2}deg` }}
                      >
                        {item.n}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="info">
                {(mode === "w" ? wins : certs).map((item) => (
                  <div key={item.n} className="inf">
                    <div className="st" aria-hidden="true">
                      {"★".repeat(item.r || 5)}
                      {"☆".repeat(5 - (item.r || 5))}
                    </div>
                    <b>{item.n}</b>
                    <small>
                      {item.sub} · {item.y}
                    </small>
                    <button
                      className="ob"
                      onClick={() => setSelectedItem(item)}
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

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="wrap">
          <h2 className="sec">Let&apos;s work together</h2>
          <a className="big" href="mailto:you@example.com">
            you@example.com
          </a>
          <p>Open to full-time roles and interesting side projects.</p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              className="btn"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="wrap">© 2026 Sajidul Islam</div>
      </footer>

      {/* Detail Slide-over Story Panel */}
      <aside
        className={`panel ${selectedItem ? "open" : ""}`}
        id="panel"
        aria-live="polite"
      >
        <button
          className="x"
          onClick={() => setSelectedItem(null)}
          aria-label="Close"
        >
          ×
        </button>
        {selectedItem && (
          <div id="pc">
            <h3>{selectedItem.n}</h3>
            <div className="yr">{selectedItem.y}</div>
            <p>{selectedItem.d}</p>
            <div className="tags">
              {selectedItem.t.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {selectedItem.l && (
              <a className="go" href={selectedItem.l}>
                View project
              </a>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
