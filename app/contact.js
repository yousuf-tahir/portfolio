// ─── Contact ──────────────────────────────────────────────────────────────────
// Replace your existing Contact() function in page.js with this one

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
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
                  val: "yousuf.tahir000@gmail.com",
                  // ✅ Opens Gmail compose with your address pre-filled
                  href: "mailto:yousuf.tahir000@gmail.com?subject=Project%20Inquiry%20from%20Portfolio&body=Hi%20Yousuf%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20about...",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                  label: "LinkedIn",
                  val: "linkedin.com/in/yousuf-tahir",
                  href: "https://linkedin.com/in/yousuf-tahir-ab5527320",
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  ),
                  label: "GitHub",
                  val: "github.com/yousuf-tahir",
                  href: "https://github.com/yousuf-tahir",
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
            {status === "success" ? (
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
                    disabled={status === "loading"}
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
                    disabled={status === "loading"}
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
                    disabled={status === "loading"}
                  />
                </div>

                {status === "error" && (
                  <p className={styles.formError}>{errorMsg}</p>
                )}

                <button
                  className={`${styles.btnPrimary} ${status === "loading" ? styles.btnLoading : ""}`}
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className={styles.spinner} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className={styles.btnArrow}>→</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}