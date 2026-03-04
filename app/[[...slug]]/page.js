"use client";

import { useEffect, useState, useRef } from "react";
import styles from "../page.module.css";

// ─── Scroll Animation Hook ───────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Active Section Hook ──────────────────────────────────────────────────────
function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const links = ["home", "about", "skills", "projects", "contact"];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navScrolled : ""}`}>
      <div className={styles.navInner}>
        <button className={styles.navBrand} onClick={() => scrollTo("home")}>
          Yousuf Tahir
        </button>

        {/* Desktop links */}
        <ul className={styles.navLinks}>
          {links.map((link) => (
            <li key={link}>
              <button
                className={`${styles.navLink} ${active === link ? styles.navLinkActive : ""}`}
                onClick={() => scrollTo(link)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        {links.map((link) => (
          <button
            key={link}
            className={`${styles.mobileLink} ${active === link ? styles.navLinkActive : ""}`}
            onClick={() => scrollTo(link)}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className={styles.hero}>
      {/* Background grid overlay */}
      <div className={styles.heroGrid} aria-hidden="true" />
      {/* Accent glow blob */}
      <div className={styles.heroGlow} aria-hidden="true" />

      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>Hello, I&apos;m</p>
        <h1 className={styles.heroName}>Yousuf Tahir</h1>
        <h2 className={styles.heroTitle}>
          Full‑Stack Developer
          <span className={styles.heroDivider}> | </span>
          <span className={styles.heroAccent}>React • Node • MongoDB • AI Systems</span>
        </h2>
        <p className={styles.heroParagraph}>
          I design and build end‑to‑end digital products — from polished user
          interfaces to robust backend systems and intelligent AI integrations.
          I thrive on turning complex problems into clean, scalable solutions.
        </p>
        <div className={styles.heroBtns}>
          <button className={styles.btnPrimary} onClick={() => scrollTo("projects")}>
            View Projects
            <span className={styles.btnArrow}>→</span>
          </button>
          <button className={styles.btnSecondary} onClick={() => scrollTo("contact")}>
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel} data-reveal>About</div>
        <h2 className={styles.sectionTitle} data-reveal>Who I Am</h2>

        <div className={styles.aboutGrid}>
          {/* Left: text */}
          <div className={styles.aboutText} data-reveal>
            <p className={styles.aboutParagraph}>
              I&apos;m a Full‑Stack Developer based in Pakistan with a deep passion
              for building complete digital systems — from pixel‑perfect UIs to
              powerful server‑side architectures. I specialize in the
              <span className={styles.highlight}> React • Node.js • MongoDB</span> ecosystem
              and have been integrating AI into real‑world products.
            </p>
            <p className={styles.aboutParagraph}>
              My journey started with curiosity about how things work on the
              web, and grew into a genuine obsession with shipping products that
              solve real problems. I&apos;ve built systems for education, healthcare,
              and HR automation — each one pushing my technical and design
              thinking further.
            </p>
            <p className={styles.aboutParagraph}>
              I believe great software is built at the intersection of clean
              code, thoughtful UX, and smart architecture. I&apos;m always learning,
              always building, and always looking for the next meaningful problem
              to solve.
            </p>

            <div className={styles.aboutStats}>
              {[
                { val: "3+", label: "Projects Shipped" },
                { val: "5+", label: "Technologies Mastered" },
                { val: "AI", label: "Integrated Systems" },
              ].map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statVal}>{s.val}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: identity card */}
          <div className={styles.aboutCard} data-reveal>
            <div className={styles.aboutCardInner}>
              <div className={styles.avatarRing}>
                <div className={styles.avatarInitials}>YT</div>
              </div>
              <div className={styles.aboutCardDetails}>
                {[
                  { icon: "◈", label: "Role", val: "Full‑Stack Developer" },
                  { icon: "◈", label: "Focus", val: "React, Node, AI Systems" },
                  { icon: "◈", label: "Database", val: "MongoDB" },
                  { icon: "◈", label: "Location", val: "Pakistan" },
                  { icon: "◈", label: "Status", val: "Open to Opportunities" },
                ].map((item) => (
                  <div key={item.label} className={styles.cardRow}>
                    <span className={styles.cardIcon}>{item.icon}</span>
                    <span className={styles.cardLabel}>{item.label}</span>
                    <span className={styles.cardVal}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
const skillsData = {
  Frontend: [
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 80 },
    { name: "JavaScript", level: 88 },
    { name: "CSS / Styling", level: 85 },
    { name: "Framer Motion", level: 70 },
  ],
  Backend: [
    { name: "Node.js", level: 88 },
    { name: "Express.js", level: 86 },
    { name: "MongoDB", level: 84 },
    { name: "FastAPI", level: 72 },
    { name: "Socket.io", level: 75 },
  ],
  Other: [
    { name: "Git & GitHub", level: 85 },
    { name: "REST APIs", level: 88 },
    { name: "AI Integration", level: 80 },
    { name: "JWT Auth", level: 82 },
    { name: "Problem Solving", level: 90 },
  ],
};

function Skills() {
  return (
    <section id="skills" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel} data-reveal>Skills</div>
        <h2 className={styles.sectionTitle} data-reveal>Technical Arsenal</h2>
        <p className={styles.sectionSubtitle} data-reveal>
          Technologies I use to design, build, and ship production‑ready applications.
        </p>

        <div className={styles.skillsGrid}>
          {Object.entries(skillsData).map(([category, skills], ci) => (
            <div
              key={category}
              className={styles.skillCategory}
              data-reveal
              style={{ animationDelay: `${ci * 0.12}s` }}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryDot} />
                <h3 className={styles.categoryTitle}>{category}</h3>
              </div>
              <div className={styles.skillsList}>
                {skills.map((skill, i) => (
                  <div
                    key={skill.name}
                    className={styles.skillItem}
                    style={{ animationDelay: `${ci * 0.1 + i * 0.06}s` }}
                  >
                    <div className={styles.skillTop}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillPct}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillFill}
                        style={{ "--fill-width": `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const projectsData = [
  {
    number: "01",
    title: "School LMS Platform",
    description:
      "Built a complete Learning Management System with admin, teacher, and student dashboards. Features: Attendance, Grading System, Role‑based login, and Time Table Generation.",
    stack: ["React.js", "Node.js", "MongoDB", "JWT Auth", "Cloud Storage"],
    github: "#",
    live: null,
    tag: "Web App",
  },
  {
    number: "02",
    title: "Pulmovision – Web + App Sync System",
    description:
      "Developed the official Pulmovision website and connected it to their mobile app via ngrok live tunneling. Enabled real‑time data sync, patient analytics, and device integration.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Socket.io", "Ngrok", "Cloudinary"],
    github: "#",
    live: null,
    tag: "Full‑Stack",
  },
  {
    number: "03",
    title: "AI Interview Automation System",
    description:
      "Created an AI‑powered interview room that evaluates candidates in real time. Integrated speech‑to‑text, AI feedback, candidate scoring, and HR dashboard.",
    stack: ["FastAPI", "React.js", "Socket.io", "Whisper AI", "MongoDB", "JWT Auth"],
    github: "#",
    live: null,
    tag: "AI System",
  },
];

function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel} data-reveal>Projects</div>
        <h2 className={styles.sectionTitle} data-reveal>Proof of Work</h2>
        <p className={styles.sectionSubtitle} data-reveal>
          Real products built and shipped — solving real problems.
        </p>

        <div className={styles.projectsGrid}>
          {projectsData.map((project, i) => (
            <div
              key={project.number}
              className={styles.projectCard}
              data-reveal
              style={{ animationDelay: `${i * 0.14}s` }}
            >
              <div className={styles.projectTop}>
                <span className={styles.projectNumber}>{project.number}</span>
                <span className={styles.projectTag}>{project.tag}</span>
              </div>

              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>

              <div className={styles.projectStack}>
                {project.stack.map((tech) => (
                  <span key={tech} className={styles.techPill}>{tech}</span>
                ))}
              </div>

              <div className={styles.projectLinks}>
                <a
                  href={project.github}
                  className={styles.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    className={`${styles.projectLink} ${styles.projectLinkLive}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionLabel} data-reveal>Contact</div>
        <h2 className={styles.sectionTitle} data-reveal>Let&apos;s Build Together</h2>
        <p className={styles.sectionSubtitle} data-reveal>
          Have a project in mind or want to collaborate? I&apos;m always open to new opportunities.
        </p>

        <div className={styles.contactGrid}>
          {/* Left: Info */}
          <div className={styles.contactInfo} data-reveal>
            <h3 className={styles.contactInfoTitle}>Get In Touch</h3>
            <p className={styles.contactInfoText}>
              Whether it&apos;s a freelance project, full‑time role, or just a
              technical conversation — reach out and let&apos;s talk.
            </p>

            <div className={styles.contactLinks}>
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: "Email",
                  val: "yousuftahir@email.com",
                  href: "mailto:yousuftahir@email.com",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                  label: "LinkedIn",
                  val: "linkedin.com/in/yousuftahir",
                  href: "https://linkedin.com/in/yousuftahir",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  ),
                  label: "GitHub",
                  val: "github.com/yousuftahir",
                  href: "https://github.com/yousuftahir",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.contactLinkItem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.contactLinkIcon}>{item.icon}</span>
                  <div>
                    <span className={styles.contactLinkLabel}>{item.label}</span>
                    <span className={styles.contactLinkVal}>{item.val}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.contactForm} data-reveal>
            {sent ? (
              <div className={styles.successMsg}>
                <span className={styles.successIcon}>✓</span>
                <p>Message sent! I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <div className={styles.formInner}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className={styles.formTextarea}
                    rows={5}
                  />
                </div>
                <button className={styles.btnPrimary} onClick={handleSubmit}>
                  Send Message
                  <span className={styles.btnArrow}>→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerBrand}>Yousuf Tahir</p>
        <p className={styles.footerBuilt}>Built with Next.js &amp; CSS Modules</p>
        <div className={styles.footerSocials}>
          {[
            { href: "https://github.com/yousuf-tahir", label: "GitHub",
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            },
            { href: "https://linkedin.com/in/yousuf-tahir-ab5527320", label: "LinkedIn",
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            },
          ].map((s) => (
            <a key={s.label} href={s.href} className={styles.footerSocialIcon} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
        <p className={styles.footerCopy}>© {new Date().getFullYear()} Yousuf Tahir. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}