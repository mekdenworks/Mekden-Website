
import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Instagram,
  Menu, ShieldCheck, Sparkles, X, Zap
} from "lucide-react";

const ASSET_BASE = import.meta.env.BASE_URL;

const PRODUCT_FILES = [
  { name: "100 Reel Hooks", file: "01-100-Reel-Hooks.pdf", detail: "Scroll-stopping opening lines to help your Reels earn attention." },
  { name: "100 Content Ideas", file: "02-100-Content-Ideas.pdf", detail: "A ready-to-use bank of ideas for your next posts and videos." },
  { name: "30-Day Content Calendar", file: "03-30-Day-Content-Calendar.pdf", detail: "A practical month-long structure for consistent publishing." },
  { name: "50 Reel Scripts", file: "04-50-Reel-Scripts.pdf", detail: "Script frameworks to make planning and recording easier." },
  { name: "100 Caption + CTA Bank", file: "05-100-Caption-CTA-Bank.pdf", detail: "Caption and call-to-action inspiration for your content." },
  { name: "Instagram Profile Optimization Guide", file: "06-Instagram-Profile-Optimization-Guide.pdf", detail: "Improve the clarity and structure of your Instagram profile." },
  { name: "Creator Growth & Posting System", file: "07-Creator-Growth-Posting-System.pdf", detail: "A repeatable system for planning, posting and reviewing content." },
];

const STORE_CONFIG = {
  originalPrice: 299,
  salePrice: 149,
  upiId: "mekden.arya@fam",
  payeeName: "Mekden Works",
  instagramUrl: "https://www.instagram.com/mekdenworks/",
  contactEmail: "mekdenworks@gmail.com",
};

const PLANS = [
  { id: "bronze", name: "Bronze", price: 99, originalPrice: 129, savings: "SAVE 23%", count: 3, description: "A focused starting point for your content." },
  { id: "silver", name: "Silver", price: 149, originalPrice: 249, savings: "SAVE 40%", count: 5, description: "More tools for planning and creating consistently.", popular: true },
  { id: "gold", name: "Gold", price: 199, originalPrice: 399, savings: "SAVE 50%", count: 7, description: "The complete seven-resource creator system." },
];

type Modal = "checkout" | null;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [selectedPlanId, setSelectedPlanId] = useState("silver");
  const selectedPlan = PLANS.find((plan) => plan.id === selectedPlanId) ?? PLANS[1];
  const [copied, setCopied] = useState(false);
  const [orderName, setOrderName] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState("5");

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("mekden-community-feedback") || "[]"
      ) as { name: string; text: string; rating: number; date: string }[];
    } catch {
      return [];
    }
  });

  const closeMenu = () => setMenuOpen(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  const copyUpi = async () => {
  const copyUpi = async () => {
  if (!STORE_CONFIG.upiId) return;
  await navigator.clipboard.writeText(STORE_CONFIG.upiId);
  setCopied(true);
  window.setTimeout(() => setCopied(false), 1800);
};

const startCheckout = (planId = "silver") => {
  setSelectedPlanId(planId);
  setModal("checkout");
  setOrderRef("MW-" + Math.random().toString(36).slice(2, 8).toUpperCase());
};

const submitOrder = async () => {
  if (!orderName.trim() || !orderEmail.trim()) {
    alert("Please enter your name and email.");
    return;
  }

  const orderData = {
    orderId: orderRef,
    name: orderName.trim(),
    email: orderEmail.trim(),
    plan: selectedPlan.name,
    amount: selectedPlan.price,
  };

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbwAla1HNjgRmgO8J4ErtuEpBsN-JI6bhEV0iD7OcR5QXWjFLJbRLmiMgbxEfI2OPBdcw/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(orderData),
      }
    );

    const upiLink = `upi://pay?pa=${encodeURIComponent(STORE_CONFIG.upiId)}&pn=${encodeURIComponent("Mekden Works")}&am=${Number(selectedPlan.price).toFixed(2)}&cu=INR&tn=${encodeURIComponent(`Creator Starter Pack - ${selectedPlan.name} - ${orderRef}`)}`;

    window.location.href = upiLink;
  } catch (error) {
    alert("Order submission failed. Please try again.");
  }
};

  const submitReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next = [
      {
        name: reviewName.trim(),
        text: reviewText.trim(),
        rating: Number(reviewRating),
        date: new Date().toLocaleDateString("en-IN"),
      },
      ...reviews,
    ];

    setReviews(next);
    localStorage.setItem(
      "mekden-community-feedback",
      JSON.stringify(next)
    );

    setReviewName("");
    setReviewText("");
    setReviewRating("5");
  };

  return (
    <div className="site-shell">
      <div className="announcement">
        MEKDEN WORKS <span>•</span> IDEAS INTO IMPACT
      </div>

      <header className="header">
        <a className="brand" href="#home" aria-label="Mekden Works home">
          <img
            src={`${ASSET_BASE}mekden-logo.png`}
            alt="Mekden Works logo"
          />
          <span className="brand-name">
            MEKDEN <b>WORKS</b>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#product" onClick={closeMenu}>Products</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <button
            className="nav-cta"
            onClick={() => {
              startCheckout();
              closeMenu();
            }}
          >
            Get the pack <ArrowUpRight size={16} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              DIGITAL RESOURCES. REAL MOMENTUM.
            </div>

            <h1>
              Turn your ideas
              <br />
              <em>into impact.</em>
            </h1>

            <p className="hero-lead">
              Tools, structure and inspiration to help creators plan
              better content and build with confidence.
            </p>

            <div className="hero-actions">
              <button
                className="button button-dark"
                onClick={() => scrollTo("product")}
              >
                Explore the pack <ArrowRight size={17} />
              </button>

              <a className="text-link" href="#about">
                Discover Mekden Works <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="hero-proof">
              <span><Check size={14} /> 7 practical resources</span>
              <span>
                <Check size={14} /> Digital delivery after payment verification
              </span>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-glow" />
            <div className="art-card art-card-back">
              <span>MEKDEN</span>
              <small>CREATOR TOOLKIT / 2026</small>
            </div>

            <div className="art-card art-card-front">
              <div className="art-top">
                <span>MW / 001</span>
                <Sparkles size={17} />
              </div>

              <img
                className="hero-monogram"
                src={`${ASSET_BASE}mekden-monogram.png`}
                alt="Mekden Works monogram"
              />

              <div className="art-title">
                CREATOR
                <br />
                <b>STARTER PACK</b>
              </div>

              <div className="art-bottom">
                <span>IDEAS → PRODUCTS → IMPACT</span>
                <span>01—07</span>
              </div>
            </div>

            <div className="floating-tag">
              <Zap size={15} /> START CREATING
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div><strong>01</strong><span>Plan with clarity</span></div>
          <div><strong>02</strong><span>Create with purpose</span></div>
          <div><strong>03</strong><span>Post consistently</span></div>
          <div><strong>04</strong><span>Build your system</span></div>
        </section>

        <section className="product-section section-pad" id="product">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> THE FIRST RELEASE</div>
              <h2>Meet your new<br /><em>creator toolkit.</em></h2>
            </div>
            <p>Seven focused resources. Choose the collection that matches where you are in your creator journey.</p>
          </div>

          <div className="product-layout pricing-product-layout">
            <div className="product-visual">
              <div className="product-visual-label">MEKDEN WORKS / DIGITAL COLLECTION</div>
              <div className="book-mock">
                <img className="book-monogram" src={`${ASSET_BASE}mekden-monogram.png`} alt="Mekden monogram" />
                <div className="book-rule" />
                <div className="book-name">CREATOR<br /><b>STARTER PACK</b></div>
                <div className="book-foot">7 RESOURCES <span>•</span> DIGITAL EDITION</div>
              </div>
              <div className="visual-caption">A clearer starting point for your content journey.</div>
              <a
  className="preview-link"
  href="/Mekden-Website/Mekden_Works_Free_Preview.pdf"
  target="_blank"
  rel="noreferrer"
>
  View the free preview <ArrowUpRight size={15} />
</a>
            </div>

            <div className="pricing-content">
              <div className="product-kicker">CHOOSE YOUR CREATOR PACK</div>
              <h3>One toolkit.<br />Three ways to start.</h3>
              <p className="muted">Every plan is a one-time purchase. Your selected PDFs are delivered after payment is manually verified.</p>
              <div className="pricing-grid">
                {PLANS.map((plan) => (
                  <article className={`pricing-card pricing-${plan.id}${plan.popular ? " is-popular" : ""}`} key={plan.id}>
                    {plan.popular && <span className="popular-label">MOST POPULAR</span>}
                    <div className="plan-label">{plan.name}</div>
                    <p className="plan-description">{plan.description}</p>
                    <div className="plan-price-row"><span className="plan-old-price">₹{plan.originalPrice}</span><strong>₹{plan.price}</strong></div>
                    <span className="plan-savings">{plan.savings}</span>
                    <div className="plan-includes-title">INCLUDED RESOURCES</div>
                    <ul className="plan-files">
                      {PRODUCT_FILES.slice(0, plan.count).map((item) => <li key={item.file}><Check size={14} />{item.name}</li>)}
                      {plan.id === "gold" && <li className="tracker-coming"><Sparkles size={14} />30-Day Creator Performance Tracker <small>Bonus · coming soon</small></li>}
                    </ul>
                    <button className={`button ${plan.popular ? "button-gold" : "button-dark"} plan-button`} onClick={() => startCheckout(plan.id)}>
                      Choose {plan.name} <ArrowRight size={16} />
                    </button>
                  </article>
                ))}
              </div>
              <div className="secure-note"><ShieldCheck size={16} /> Manual payment verification before digital delivery</div>
            </div>
          </div>

          <div className="all-resources">
            <div className="included-title">THE COMPLETE 7-RESOURCE COLLECTION <span>PDF FORMAT</span></div>
            <div className="resource-grid">
              {PRODUCT_FILES.map((item, index) => (
                <div className="file-row" key={item.file}>
                  <span className="file-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><b>{item.name}</b><small>{item.detail}</small></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="section-pad">
            <div className="eyebrow eyebrow-light">
              <span className="eyebrow-line" />
              LESS GUESSWORK. MORE DIRECTION.
            </div>

            <div className="benefits-heading">
              <h2>
                Make creating
                <br />
                <em>feel more structured.</em>
              </h2>
              <p>
                Good content starts with a clear process. Use the resources
                in your own way, at your own pace.
              </p>
            </div>

            <div className="benefit-grid">
              <article>
                <span>01</span>
                <h3>Find your next idea</h3>
                <p>
                  Keep a bank of hooks and ideas ready when you sit down to create.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Plan your content</h3>
                <p>
                  Give your month more structure with a simple calendar and scripts.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Communicate clearly</h3>
                <p>
                  Use caption and CTA inspiration to make each post more intentional.
                </p>
              </article>

              <article>
                <span>04</span>
                <h3>Build consistency</h3>
                <p>
                  Create a repeatable posting system that works with your routine.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-mark">
            <img
              src={`${ASSET_BASE}mekden-monogram.png`}
              alt="Mekden Works monogram"
            />
          </div>

          <div className="about-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> ABOUT THE BRAND
            </div>

            <h2>
              Ideas.
              <br />
              <em>Made useful.</em>
            </h2>

            <p>
              Mekden Works is built around a simple belief: good ideas
              deserve practical execution. We create accessible digital
              products that help people plan, create and move forward
              with more clarity.
            </p>

            <div className="signature">
              MEKDEN WORKS
              <span>IDEAS → PRODUCTS → IMPACT</span>
            </div>
          </div>
        </section>

        <section className="reviews-section section-pad" id="reviews">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" /> COMMUNITY FEEDBACK
              </div>
              <h2>
                Thoughts from
                <br />
                <em>the community.</em>
              </h2>
            </div>

            <p>
              Have you used the Creator Starter Pack? Share honest feedback.
              Reviews submitted here are labelled as unverified until checked.
            </p>
          </div>

          <div className="reviews-layout">
            <form className="review-form" onSubmit={submitReview}>
              <h3>Write a review</h3>

              <label>
                Your name
                <input
                  required
                  maxLength={40}
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label>
                Your rating
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(e.target.value)}
                >
                  <option value="5">5 — Excellent</option>
                  <option value="4">4 — Good</option>
                  <option value="3">3 — Okay</option>
                  <option value="2">2 — Could be better</option>
                  <option value="1">1 — Not satisfied</option>
                </select>
              </label>

              <label>
                Your feedback
                <textarea
                  required
                  minLength={8}
                  maxLength={500}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell others what you genuinely thought..."
                  rows={4}
                />
              </label>

              <button className="button button-dark" type="submit">
                Submit feedback <ArrowRight size={16} />
              </button>

              <small>
                Feedback is saved in this browser only. It is not automatically
                published to other visitors.
              </small>
            </form>

            <div className="review-list">
              {reviews.length === 0 ? (
                <div className="review-empty">
                  <div className="review-stars">★★★★★</div>
                  <h3>Be the first to share feedback.</h3>
                  <p>
                    No customer reviews have been published yet.
                    We only display genuine customer feedback.
                  </p>
                </div>
              ) : (
                reviews.map((review, index) => (
                  <article
                    className="review-card"
                    key={`${review.date}-${index}`}
                  >
                    <div className="review-stars">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                    <p>“{review.text}”</p>
                    <div className="review-meta">
                      <b>{review.name}</b>
                      <span>{review.date} · Unverified feedback</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="section-heading faq-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" /> GOOD TO KNOW
              </div>
              <h2>
                Frequently asked
                <br />
                <em>questions.</em>
              </h2>
            </div>
            <p>
  Need help with an order? Email us at{" "}
  <a href={`mailto:${STORE_CONFIG.contactEmail}`}>
    {STORE_CONFIG.contactEmail}
  </a>
  {" "}or contact us through Instagram.
</p>
          </div>

          <div className="faq-list">
            {[
              [
                "What do I get with the Creator Starter Pack?",
                "The pack contains seven PDF resources covering hooks, content ideas, a 30-day calendar, Reel scripts, captions and CTAs, profile optimization, and a creator growth system.",
              ],
              [
                "Is this a subscription?",
                "No. Each plan is a one-time purchase; there is no recurring subscription.",
              ],
              [
                "How will I receive the files?",
                "The files will be made available after the payment is genuinely verified and the seven PDFs have been uploaded to the website.",
              ],
              [
                "Can I access the pack on my phone?",
                "Yes. The website is designed to work on mobile, tablet and desktop. PDF compatibility depends on your device's PDF viewer.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="closing-cta">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line" />
            YOUR NEXT STEP STARTS HERE
          </div>

          <h2>
            Make your next idea
            <br />
            <em>count.</em>
          </h2>

          <button className="button button-gold" onClick={() => startCheckout()}>
            Explore the Creator Pack <ArrowRight size={17} />
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <div className="footer-brand-lockup">
            <img
              src={`${ASSET_BASE}mekden-logo.png`}
              alt="Mekden Works logo"
            />
            <b>MEKDEN WORKS</b>
          </div>
          <p>Ideas → Products → Impact.</p>
        </div>

        <div className="footer-links">
          <a href="#product">Products</a>
          <a href="#about">About</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={15} /> Instagram
          </a>
          <div className="footer-contact">
  <span className="footer-contact-label">CONTACT</span>

  <a href={`mailto:${STORE_CONFIG.contactEmail}`}>
    {STORE_CONFIG.contactEmail}
  </a>

  <a
    className="footer-enquiry"
    href={`mailto:${STORE_CONFIG.contactEmail}?subject=Mekden%20Works%20Enquiry`}
  >
    Send an enquiry <ArrowUpRight size={14} />
  </a>
</div>
          <a
            href={`mailto:${STORE_CONFIG.contactEmail}?subject=Mekden%20Works%20Enquiry`}
          >
            Contact Us <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="footer-contact">
          <span className="footer-contact-label">CONTACT</span>
          <a href={`mailto:${STORE_CONFIG.contactEmail}`}>
            {STORE_CONFIG.contactEmail}
          </a>
          <a
            href={`mailto:${STORE_CONFIG.contactEmail}?subject=Mekden%20Works%20Enquiry`}
          >
            Send an enquiry <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Mekden Works. All rights reserved.
          </span>
          <span>Built with purpose.</span>
        </div>
      </footer>

      {modal === "checkout" && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setModal(null);
          }}
        >
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
          >
            <button
              className="modal-close"
              onClick={() => setModal(null)}
              aria-label="Close checkout"
            >
              <X />
            </button>

            <div className="eyebrow">
              <span className="eyebrow-line" /> SECURE ORDER REQUEST
            </div>

            <h2 id="checkout-title">
              Your creator
              <br />
              <em>starter pack.</em>
            </h2>

            <div className="checkout-summary">
              <span>{selectedPlan.name} · Creator Starter Pack</span>
              <strong>₹{selectedPlan.price}</strong>
            </div>

            <div className="checkout-discount">
              <span className="old-price">₹{selectedPlan.originalPrice}</span>
              <b>{selectedPlan.savings}</b>
            </div>

            <label>
              Your name
              <input
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                placeholder="Enter your name"
              />
            </label>

            <label>
              Email for delivery
              <input
                type="email"
                value={orderEmail}
                onChange={(e) => setOrderEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

<div className="upi-panel">
  <div className="upi-panel-head">
    <span>UPI PAYMENT</span>
    <span className="setup-tag">
      {STORE_CONFIG.upiId ? "READY TO PAY" : "SETUP REQUIRED"}
    </span>
  </div>

  {STORE_CONFIG.upiId ? (
    <>
      <p>
        Pay exactly <b>₹{selectedPlan.price}</b> using UPI:
      </p>

      <div className="upi-id">
        {STORE_CONFIG.upiId}
        <button onClick={copyUpi}>
          {copied ? <Check size={16} /> : "Copy"}
        </button>
      </div>

      <div className="upi-qr">
        <p>Scan QR to pay</p>
        <img
          src="/Mekden-Website/IMG_20261102_143722_134.jpg"
          alt="Mekden Works UPI QR Code"
          style={{
            width: "190px",
            height: "190px",
            objectFit: "contain",
            display: "block",
            margin: "12px auto"
          }}
        />
        <p className="small-warning">
          iPhone and Mac users can scan this QR code using another device.
        </p>
      </div>
    </>
  ) : (
    <p className="setup-message">
      UPI ID configure karne ke baad payment details yahan dikhenge.
    </p>
  )}

  <p className="small-warning">
    Payment screenshot alone is not confirmation. Verify the actual
    received transaction in your UPI app before delivery.
  </p>
</div>

{STORE_CONFIG.upiId && (
  <button
    type="button"
    className="button button-dark full-button"
    onClick={submitOrder}
    disabled={!orderName.trim() || !orderEmail.trim()}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
      opacity: !orderName.trim() || !orderEmail.trim() ? 0.5 : 1,
    }}
  >
    Pay Now ₹{selectedPlan.price} <ArrowRight size={17} />
  </button>
)}
<p className="modal-footnote">
  Order reference: {orderRef} · Preview checkout only. Verify payment in your UPI app before arranging delivery.
</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
