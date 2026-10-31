"use client";

import React, { useEffect, useRef, useState } from "react";

interface PanelData {
  title: string;
  year: string;
  description: string;
  tags: string[];
  link?: string;
}

const trophies = [
  {
    n: "Realtime Chat",
    s: "cup",
    x: -430,
    z: 150,
    y: "2025",
    d: "A chat platform handling 50k concurrent connections with sub-100ms delivery.",
    t: ["TypeScript", "Go", "Redis"],
    l: "#",
  },
  {
    n: "Hackathon 1st",
    s: "star",
    x: -260,
    z: 30,
    y: "2024",
    d: "Won first place among 120 teams by shipping a working AI tutor in 36 hours.",
    t: ["Python", "React", "LLMs"],
    l: "#",
  },
  {
    n: "Open Source",
    s: "obe",
    x: -95,
    z: 170,
    y: "2024",
    d: "A CLI tool with 2k GitHub stars, used by teams to automate their release process.",
    t: ["Rust", "CLI"],
    l: "#",
  },
  {
    n: "Payments API",
    s: "orb",
    x: 95,
    z: 170,
    y: "2023",
    d: "A payments service that processes thousands of transactions a day with zero-downtime deploys.",
    t: ["Node.js", "PostgreSQL", "Docker"],
    l: "#",
  },
  {
    n: "ML Pipeline",
    s: "cup",
    x: 260,
    z: 30,
    y: "2023",
    d: "Cut model training time by 70% with a distributed data pipeline.",
    t: ["Python", "Kubernetes"],
    l: "#",
  },
  {
    n: "Design System",
    s: "star",
    x: 430,
    z: 150,
    y: "2022",
    d: "A component library used across 8 products, with full keyboard and screen reader support.",
    t: ["React", "Storybook"],
    l: "#",
  },
];

const frames = [
  {
    n: "B.Sc. Computer Science",
    s: "Your University",
    x: -420,
    y: -260,
    d: "Graduated with honors. Focus on distributed systems.",
    y2: "2022",
  },
  {
    n: "AWS Certified",
    s: "Solutions Architect",
    x: -280,
    y: -230,
    d: "Professional-level cloud architecture certification.",
    y2: "2023",
  },
  {
    n: "Dean's List",
    s: "6 semesters",
    x: 260,
    y: -230,
    d: "Recognized for academic excellence.",
    y2: "2020–2022",
  },
  {
    n: "Speaker",
    s: "Local DevConf",
    x: 400,
    y: -260,
    d: "Gave a talk on building reliable systems on a budget.",
    y2: "2024",
  },
];

const headlineWords = [
  "I",
  "build",
  "software",
  "that",
  "holds",
  "up",
  "under",
  "pressure.",
];

export default function Home() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelData, setPanelData] = useState<PanelData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const edRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const awardsSecRef = useRef<HTMLElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);

  const showPanel = (
    title: string,
    year: string,
    description: string,
    tags: string[],
    link?: string
  ) => {
    setPanelData({ title, year, description, tags, link });
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  // Keyboard Escape listener
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

  // Code editor typewriter effect
  useEffect(() => {
    const src =
      'async function ship(idea) {\n  const plan = think(idea);\n  const build = await code(plan);\n  await test(build);\n  return deploy(build);\n}\n\n> ship("something great")\n✓ 128 tests passed\n✓ deployed in 41s';

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (codeRef.current) codeRef.current.textContent = src;
      return;
    }

    let n = 0;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!codeRef.current) return;
      codeRef.current.textContent = src.slice(0, n++) + "▌";
      if (n <= src.length) {
        timer = setTimeout(tick, 30);
      } else {
        codeRef.current.textContent = src;
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  // Hero pointer interaction (dynamic font-weight & editor 3D rotation)
  const handleHeroPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero) return;

    charRefs.current.forEach((c) => {
      if (!c) return;
      const b = c.getBoundingClientRect();
      const d = Math.hypot(
        e.clientX - (b.left + b.width / 2),
        e.clientY - (b.top + b.height / 2)
      );
      c.style.fontWeight = `${Math.round(300 + 600 * Math.max(0, 1 - d / 220))}`;
    });

    if (edRef.current) {
      const a = e.clientX / window.innerWidth - 0.5;
      const k = e.clientY / window.innerHeight - 0.5;
      edRef.current.style.setProperty("--ey", `${-8 + a * 14}deg`);
      edRef.current.style.setProperty("--ex", `${4 - k * 10}deg`);
    }
  };

  // 3D Room size adjustment and mouse tracking
  useEffect(() => {
    const sec = awardsSecRef.current;
    const room = roomRef.current;
    if (!sec || !room) return;

    const fit = () => {
      room.style.setProperty(
        "--k",
        Math.min(1, sec.clientWidth / 1150).toFixed(3)
      );
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const handleAwardsPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const sec = awardsSecRef.current;
    const room = roomRef.current;
    if (!sec || !room) return;

    const r = sec.getBoundingClientRect();
    const a = (e.clientX - r.left) / r.width - 0.5;
    const b = (e.clientY - r.top) / r.height - 0.5;

    room.style.setProperty("--ry", `${a * 14}deg`);
    room.style.setProperty("--rx", `${-b * 6}deg`);
  };

  const handleAwardsPointerLeave = () => {
    const room = roomRef.current;
    if (!room) return;
    room.style.setProperty("--ry", "0deg");
    room.style.setProperty("--rx", "0deg");
  };

  let charIndexCounter = 0;

  return (
    <>
      {/* SVG Symbols definition */}
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

          {/* Desktop links - automatically hidden on mobile */}
          <div className="desktop-links">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#awards">Awards</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Mobile Hamburger Button - visible only on mobile breakpoint */}
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

        {/* Mobile Dropdown Menu Drawer */}
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
      <header
        className="hero"
        id="top"
        ref={heroRef}
        onPointerMove={handleHeroPointerMove}
      >
        <div className="wrap">
          <div>
            <h1 id="h1">
              {headlineWords.map((word, wIdx) => (
                <span key={wIdx} className="w">
                  {word.split("").map((char) => {
                    const idx = charIndexCounter++;
                    return (
                      <span
                        key={idx}
                        className="c"
                        ref={(el) => {
                          charRefs.current[idx] = el;
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                  {wIdx < headlineWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h1>
            {/* Desktop text */}
            <p className="hidden md:block">
              Software engineer from Dhaka. I design backends, ship clean
              interfaces, and care about the details nobody sees until they
              break.
            </p>
            {/* Mobile short text */}
            <p className="block md:hidden !my-4 !text-[16px] leading-relaxed">
              Software engineer from Dhaka building scalable backends &amp; clean interfaces.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a className="btn f" href="#work">
                <span className="hidden sm:inline">See my work</span>
                <span className="inline sm:hidden">See work</span>
              </a>
              <a className="btn" href="#contact">
                <span className="hidden sm:inline">Get in touch</span>
                <span className="inline sm:hidden">Contact</span>
              </a>
            </div>
          </div>

          <div className="ed" id="ed" ref={edRef}>
            <div className="dots">
              <i />
              <i />
              <i />
              <span>ship.ts</span>
            </div>
            <pre id="code" ref={codeRef}></pre>
          </div>
        </div>

        <div className="tick" aria-hidden="true">
          <div>
            TypeScript ✦ Go ✦ Rust ✦ PostgreSQL ✦ Docker ✦ React ✦ AWS ✦
            Kubernetes ✦ TypeScript ✦ Go ✦ Rust ✦ PostgreSQL ✦ Docker ✦ React ✦
            AWS ✦ Kubernetes ✦{" "}
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
                I&apos;m a software engineer who likes turning messy problems
                into small, fast, reliable systems. Replace this text with your
                own story: where you studied, what you&apos;ve shipped, and what
                you want to build next.
              </p>
              <p>
                Outside of work I contribute to open source and mentor students
                who are just starting out.
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

      {/* Awards 3D Interactive Room */}
      <section
        className="awards"
        id="awards"
        aria-label="Awards"
        ref={awardsSecRef}
        onPointerMove={handleAwardsPointerMove}
        onPointerLeave={handleAwardsPointerLeave}
      >
        <div className="head">
          <div className="wrap">
            <h2 className="sec">Awards and wins</h2>
            <p>The things on my desk I&apos;m proudest of.</p>
          </div>
        </div>

        <div className="room" id="room" ref={roomRef}>
          <div className="wall" />
          <div className="desk" />

          {/* Monitor */}
          <div className="mon">
            <i>const</i> me = &#123;
            <br />
            &nbsp;&nbsp;role: <i>&quot;engineer&quot;</i>,
            <br />
            &nbsp;&nbsp;builds: <i>&quot;fast things&quot;</i>,
            <br />
            &nbsp;&nbsp;coffee: <i>Infinity</i>
            <br />
            &#125;;
            <br />
            <b />
          </div>

          {/* Wall Frames */}
          {frames.map((frame, idx) => (
            <div
              key={idx}
              className="frame"
              style={{
                transform: `translate3d(${frame.x}px, ${frame.y}px, -490px)`,
              }}
              onClick={() =>
                showPanel(frame.n, frame.y2, frame.d, [frame.s])
              }
            >
              {frame.n}
              <small>{frame.s}</small>
            </div>
          ))}

          {/* Desk Trophies */}
          {trophies.map((t, idx) => (
            <button
              key={idx}
              className="t"
              style={
                {
                  "--x": `${t.x}px`,
                  "--z": `${t.z}px`,
                } as React.CSSProperties
              }
              aria-label={t.n}
              onClick={() => showPanel(t.n, t.y, t.d, t.t, t.l)}
            >
              <div className="in">
                <svg viewBox="0 0 100 140">
                  <use href={`#${t.s}`} />
                </svg>
                <span className="plq">{t.n}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="tip">
          Move your mouse to look around. Click a trophy for the story.
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
          <a className="btn" href="#">
            GitHub
          </a>
          <a className="btn" href="#">
            LinkedIn
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="wrap">© 2026 Your Name</div>
      </footer>

      {/* Drawer Panel */}
      <aside
        className={`panel ${panelOpen ? "open" : ""}`}
        id="panel"
        aria-live="polite"
      >
        <button className="x" aria-label="Close" onClick={closePanel}>
          ×
        </button>
        {panelData && (
          <div id="pc">
            <h3>{panelData.title}</h3>
            <div className="yr">{panelData.year}</div>
            <p>{panelData.description}</p>
            <div className="tags">
              {panelData.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
            {panelData.link && (
              <a className="go" href={panelData.link}>
                View project
              </a>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
