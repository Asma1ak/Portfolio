import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Services", "Work", "About", "Contact"];

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
    ),
    title: "Business Websites",
    description:
      "A professional online presence that earns trust and converts visitors. Built fast, optimised for search engines, and easy to manage.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
    title: "Landing Pages",
    description:
      "High-converting single pages built around one goal — a product launch, a campaign, a service. Designed to turn clicks into customers.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
    ),
    title: "E-Commerce Stores",
    description:
      "Online stores that look great and sell. Secure payments, product management, and a smooth checkout — everything your customers expect.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    ),
    title: "Web Apps",
    description:
      "Custom tools and applications built for your specific workflow — booking systems, dashboards, client portals, and more.",
  },
];

const PROJECTS = [
  {
    name: "Argus",
    category: "Web App",
    description:
      "A full-stack progressive web app with real-time AI-powered features, user authentication, and a responsive mobile-first interface.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    accent: "#1a56db",
    github: "https://github.com/Asma1ak",
  },
  {
    name: "Praxis",
    category: "Web App",
    description:
      "A data-driven application with advanced search, background job processing, and a clean dashboard interface built for daily use.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    accent: "#0891b2",
    github: "https://github.com/Asma1ak",
  },
  {
    name: "Foundation API",
    category: "Backend / Platform",
    description:
      "A production-ready backend platform with authentication, rate limiting, and a structured API — the engine behind a client-facing product.",
    tech: ["NestJS", "TypeScript", "Prisma", "Docker"],
    accent: "#7c3aed",
    github: "https://github.com/Asma1ak",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", body: "We start with a free conversation about your business, your goals, and what you need the website to do for you." },
  { step: "02", title: "Proposal", body: "You receive a clear, itemised proposal — no surprises. We agree on scope, timeline, and price before any work begins." },
  { step: "03", title: "Design & Build", body: "I design and build your site with regular check-ins so you're never left wondering what's happening." },
  { step: "04", title: "Launch & Support", body: "Your site goes live. I handle the technical side and remain available for updates and ongoing support." },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const QUOTE_FIELDS = [
  { id: "name", label: "Your Name", type: "text", placeholder: "Sarah Al-Mansoori" },
  { id: "business", label: "Business Name", type: "text", placeholder: "Al-Mansoori Consulting" },
  { id: "email", label: "Email Address", type: "email", placeholder: "sarah@example.com" },
  { id: "service", label: "Service Needed", type: "select", options: ["Business Website", "Landing Page", "E-Commerce Store", "Web App", "Not sure yet"] },
  { id: "message", label: "Tell me about your project", type: "textarea", placeholder: "What does your business do? What do you need the website to achieve?" },
];

export default function Portfolio() {
  const [active, setActive] = useState("Services");
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafaf8", color: "#1c1c1c", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }

        .nav-link {
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; color: #666; cursor: pointer;
          transition: color 0.2s; padding-bottom: 3px;
          border-bottom: 1.5px solid transparent;
        }
        .nav-link:hover, .nav-link.active { color: #1a56db; border-bottom-color: #1a56db; }

        .service-card {
          background: #fff; border: 1px solid #e8e8e4; border-radius: 4px;
          padding: 36px 32px; transition: box-shadow 0.3s, transform 0.3s;
        }
        .service-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-3px); }

        .project-card {
          background: #fff; border: 1px solid #e8e8e4; border-radius: 4px;
          padding: 36px 32px; position: relative; overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .project-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-3px); }
        .project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--accent); transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease;
        }
        .project-card:hover::before { transform: scaleX(1); }

        .tech-tag {
          display: inline-block; padding: 3px 10px; border-radius: 2px;
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.04em;
          margin: 3px 3px 3px 0; background: #f4f4f0; color: #666; border: 1px solid #e8e8e4;
        }

        .cta-btn {
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.82rem;
          letter-spacing: 0.1em; text-transform: uppercase; background: #1a56db;
          color: #fff; border: none; border-radius: 3px; padding: 15px 36px;
          cursor: pointer; transition: all 0.25s;
        }
        .cta-btn:hover { background: #1446b8; box-shadow: 0 4px 20px rgba(26,86,219,0.35); transform: translateY(-1px); }

        .ghost-btn {
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.82rem;
          letter-spacing: 0.1em; text-transform: uppercase; background: transparent;
          color: #1c1c1c; border: 1px solid #ccc; border-radius: 3px; padding: 15px 36px;
          cursor: pointer; transition: all 0.25s;
        }
        .ghost-btn:hover { border-color: #1c1c1c; background: #f4f4f0; }

        .form-input {
          width: 100%; padding: 12px 16px; border: 1px solid #e0e0da; border-radius: 3px;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 300;
          color: #1c1c1c; background: #fff; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,0.08); }
        .form-input::placeholder { color: #bbb; }

        .process-step { border-left: 2px solid #e8e8e4; padding-left: 28px; padding-bottom: 40px; position: relative; }
        .process-step:last-child { border-left: 2px solid transparent; padding-bottom: 0; }
        .process-step::before {
          content: ''; position: absolute; left: -7px; top: 4px;
          width: 12px; height: 12px; border-radius: 50%;
          background: #1a56db; border: 2px solid #f4f4f0;
        }

        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .hero-h1 { font-size: 2.6rem !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,250,248,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid #e8e8e4" : "1px solid transparent",
        transition: "all 0.3s",
        padding: "0 max(24px, calc((100vw - 1100px)/2))",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#1c1c1c" }}>Asma Kamali</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 400, color: "#aaa", marginLeft: 10, letterSpacing: "0.08em" }} className="hide-mobile">Web Developer</span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(link => (
              <span key={link} className={`nav-link hide-mobile${active === link ? " active" : ""}`} onClick={() => scrollTo(link)}>{link}</span>
            ))}
            <button className="cta-btn" style={{ padding: "9px 22px", fontSize: "0.74rem" }} onClick={() => scrollTo("Contact")}>
              Contact Me
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px max(24px, calc((100vw - 1100px)/2)) 80px", background: "linear-gradient(160deg, #fff 60%, #f0f4ff 100%)" }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.1s forwards" }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e8e8e4", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", color: "#555" }}>Available for new projects · Dubai, UAE</span>
            </div>
            <h1 className="hero-h1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2.8rem, 5vw, 4rem)", lineHeight: 1.1, color: "#1c1c1c", marginBottom: 24 }}>
              More than a website.<br />
              <span style={{ color: "#1a56db" }}>A business tool.</span>
            </h1>
            <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "#555", marginBottom: 40, maxWidth: 560 }}>
              I build professional websites and web applications for businesses in Dubai and worldwide. Fast, beautiful, and built to grow your business — not just look good.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="cta-btn" onClick={() => scrollTo("Contact")}>Get in Touch</button>
              <button className="ghost-btn" onClick={() => scrollTo("Work")}>See My Work</button>
            </div>
          </div>

          {/* Trust bar */}
          <div style={{ opacity: 0, animation: "fadeUp 0.8s ease 0.4s forwards", marginTop: 72, display: "flex", gap: 48, flexWrap: "wrap", borderTop: "1px solid #e8e8e4", paddingTop: 40 }}>
            {[
              { num: "4", label: "Services Offered" },
              { num: "Fast", label: "Turnaround" },
              { num: "EN & AR", label: "Bilingual" },
              { num: "Global", label: "Remote-Friendly" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#1c1c1c" }}>{num}</div>
                <div style={{ fontSize: "0.73rem", fontWeight: 400, color: "#999", letterSpacing: "0.06em", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px max(24px, calc((100vw - 1100px)/2))", background: "#fafaf8" }}>
        <FadeIn>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a56db", marginBottom: 10 }}>What I Offer</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#1c1c1c", marginBottom: 16 }}>Services</h2>
          <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "#666", lineHeight: 1.75, maxWidth: 520, marginBottom: 56 }}>
            Every project is built from scratch to your requirements — no templates, no shortcuts.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="service-card">
                <div style={{ color: "#1a56db", marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.2rem", color: "#1c1c1c", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.75, color: "#666" }}>{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px max(24px, calc((100vw - 1100px)/2))", background: "#f4f4f0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="two-col">
          <FadeIn>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a56db", marginBottom: 10 }}>The Process</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#1c1c1c", marginBottom: 20 }}>How We Work Together</h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "#666", lineHeight: 1.8 }}>
              A straightforward process with no jargon, no surprises, and clear communication at every stage.
            </p>
          </FadeIn>
          <div>
            {PROCESS.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.1}>
                <div className="process-step">
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", color: "#1a56db", display: "block", marginBottom: 6 }}>{p.step}</span>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.1rem", color: "#1c1c1c", marginBottom: 8 }}>{p.title}</h4>
                  <p style={{ fontSize: "0.87rem", fontWeight: 300, color: "#666", lineHeight: 1.75 }}>{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{ padding: "100px max(24px, calc((100vw - 1100px)/2))" }}>
        <FadeIn>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a56db", marginBottom: 10 }}>Portfolio</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#1c1c1c", marginBottom: 16 }}>Recent Work</h2>
          <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "#666", lineHeight: 1.75, maxWidth: 520, marginBottom: 56 }}>
            A selection of projects demonstrating what's possible — from lightweight landing pages to full-scale web applications.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <div className="project-card" style={{ "--accent": p.accent }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: p.accent }}>{p.category}</span>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: "#ccc", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#1c1c1c"}
                    onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.04c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.75-1.32-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.3 3.46 1 .1-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.3.47-2.38 1.22-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.28-1.23 3.28-1.23.65 1.65.24 2.87.12 3.17.76.84 1.22 1.9 1.22 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.3c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.3rem", color: "#1c1c1c", marginBottom: 12 }}>{p.name}</h3>
                <p style={{ fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.75, color: "#666", marginBottom: 20 }}>{p.description}</p>
                <div>{p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px max(24px, calc((100vw - 1100px)/2))", background: "#f4f4f0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
          <FadeIn>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a56db", marginBottom: 10 }}>Who I Am</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#1c1c1c", marginBottom: 24 }}>About Me</h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "#555", marginBottom: 20 }}>
              I'm Asma — a web developer based in Dubai. I work with business owners who want a website that actually drives results, not just one that looks nice.
            </p>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "#555", marginBottom: 20 }}>
              I handle the entire process — design, development, and launch — so you don't have to coordinate between multiple people or manage a team of freelancers.
            </p>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "#555", marginBottom: 36 }}>
              I work with clients across the UAE and internationally, and communicate fluently in both English and Arabic.
            </p>
            <button className="cta-btn" onClick={() => scrollTo("Contact")}>Get in Touch</button>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background: "#fff", border: "1px solid #e8e8e4", borderRadius: 4, padding: 40 }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa", marginBottom: 24 }}>Why Work With Me</p>
              {[
                { title: "End-to-end ownership", body: "Design, build, and launch — all handled by one person who cares about the outcome." },
                { title: "No templates", body: "Every site is built from scratch for your business, not adapted from a generic theme." },
                { title: "Clear communication", body: "You'll always know what's happening. No technical jargon, no black boxes." },
                { title: "English & Arabic", body: "I work comfortably with clients across the UAE and internationally." },
              ].map(({ title, body }) => (
                <div key={title} style={{ borderTop: "1px solid #f0f0ec", padding: "16px 0" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <svg style={{ flexShrink: 0, marginTop: 2 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <div>
                      <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "#1c1c1c", marginBottom: 4 }}>{title}</p>
                      <p style={{ fontSize: "0.83rem", fontWeight: 300, color: "#777", lineHeight: 1.65 }}>{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT / QUOTE FORM */}
      <section id="contact" style={{ padding: "100px max(24px, calc((100vw - 1100px)/2)) 120px", background: "#1c1c1c" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="two-col">
          <FadeIn>
            <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a56db", marginBottom: 10 }}>Let's Talk</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#fff", marginBottom: 24 }}>Get in Touch</h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: "#aaa", marginBottom: 40 }}>
              Tell me about your project and I'll get back to you within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "✉", label: "Email", value: "asma.kamali@outlook.com", href: "mailto:asma.kamali@outlook.com" },
                { icon: "⚙", label: "GitHub", value: "github.com/Asma1ak", href: "https://github.com/Asma1ak" },
                { icon: "📍", label: "Location", value: "Dubai, UAE (works globally)", href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 3, background: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{icon}</div>
                  <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 2 }}>{label}</p>
                    {href
                      ? <a href={href} style={{ fontSize: "0.88rem", color: "#ccc", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color="#fff"} onMouseLeave={e => e.target.style.color="#ccc"}>{value}</a>
                      : <p style={{ fontSize: "0.88rem", color: "#ccc" }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {submitted ? (
              <div style={{ background: "#1a56db0d", border: "1px solid #1a56db33", borderRadius: 4, padding: 48, textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1a56db", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.4rem", color: "#fff", marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#aaa", lineHeight: 1.75 }}>Thanks for reaching out. I'll review your project and get back to you within 24 hours.</p>
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 4, padding: 40, display: "flex", flexDirection: "column", gap: 20 }}>
                {QUOTE_FIELDS.map(field => (
                  <div key={field.id}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888", marginBottom: 8 }}>{field.label}</label>
                    {field.type === "select" ? (
                      <select className="form-input" value={form[field.id]} onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}>
                        <option value="">Select a service…</option>
                        {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea className="form-input" rows={4} placeholder={field.placeholder} value={form[field.id]} onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))} style={{ resize: "vertical" }} />
                    ) : (
                      <input className="form-input" type={field.type} placeholder={field.placeholder} value={form[field.id]} onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))} />
                    )}
                  </div>
                ))}
                <button className="cta-btn" style={{ marginTop: 4, width: "100%" }} onClick={handleSubmit}>
                  Send Message
                </button>
              </div>
            )}
          </FadeIn>
        </div>

        <div style={{ marginTop: 80, borderTop: "1px solid #2a2a2a", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: "0.78rem", color: "#555" }}>© {new Date().getFullYear()} Asma Kamali</span>
          <span style={{ fontSize: "0.78rem", color: "#555" }}>Web Developer · Dubai, UAE</span>
        </div>
      </section>
    </div>
  );
}
