import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Download, Instagram,
  Menu, ShieldCheck, Sparkles, X, Zap
} from "lucide-react";

const PRODUCT_FILES = [
  { name: "100 Reel Hooks", file: "01-100-Reel-Hooks.pdf", detail: "Scroll-stopping opening lines to help your Reels earn attention." },
  { name: "100 Content Ideas", file: "02-100-Content-Ideas.pdf", detail: "A ready-to-use bank of ideas for your next posts and videos." },
  { name: "30-Day Content Calendar", file: "03-30-Day-Content-Calendar.pdf", detail: "A practical month-long structure for consistent publishing." },
  { name: "50 Reel Scripts", file: "04-50-Reel-Scripts.pdf", detail: "Script frameworks to make planning and recording easier." },
  { name: "100 Caption + CTA Bank", file: "05-100-Caption-CTA-Bank.pdf", detail: "Caption and call-to-action inspiration for your content." },
  { name: "Instagram Profile Optimization Guide", file: "06-Instagram-Profile-Optimization-Guide.pdf", detail: "Improve the clarity and structure of your Instagram profile." },
  { name: "Creator Growth & Posting System", file: "07-Creator-Growth-Posting-System.pdf", detail: "A repeatable system for planning, posting and reviewing content." },
];

// Add the actual PDF files to public/products using the exact filenames above.
// Keep UPI details empty until your payment arrangement is approved and verified.
const STORE_CONFIG = {
  originalPrice: 299,
  salePrice: 149,
  upiId: "", // Example format only: name@bank — add your verified UPI ID here.
  payeeName: "Mekden Works",
  instagramUrl: "https://www.instagram.com/mekdenworks/",
  contactEmail: "",
};

type Modal = "checkout" | "faq" | null;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [copied, setCopied] = useState(false);
  const [orderName, setOrderName] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviews, setReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mekden-community-feedback") || "[]") as { name: string; text: string; rating: number; date: string }[]; }
    catch { return []; }
  });

  const closeMenu = () => setMenuOpen(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  const copyUpi = async () => {
    if (!STORE_CONFIG.upiId) return;
    await navigator.clipboard.writeText(STORE_CONFIG.upiId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const startCheckout = () => {
    setModal("checkout");
    setOrderRef("MW-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  };

  const submitReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = [{ name: reviewName.trim(), text: reviewText.trim(), rating: Number(reviewRating), date: new Date().toLocaleDateString("en-IN") }, ...reviews];
    setReviews(next);
    localStorage.setItem("mekden-community-feedback", JSON.stringify(next));
    setReviewName(""); setReviewText(""); setReviewRating("5");
  };

  return (
    <div className="site-shell">
      <div className="announcement">MEKDEN WORKS <span>•</span> IDEAS INTO IMPACT</div>
      <header className="header">
        <a className="brand" href="#home" aria-label="Mekden Works home">
          <img src="/mekden-logo.png" alt="Mekden Works monogram" />
          <span className="brand-name">MEKDEN <b>WORKS</b></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#product" onClick={closeMenu}>Products</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <button className="nav-cta" onClick={() => { startCheckout(); closeMenu(); }}>Get the pack <ArrowUpRight size={16} /></button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> DIGITAL RESOURCES. REAL MOMENTUM.</div>
            <h1>Turn your ideas<br /><em>into impact.</em></h1>
            <p className="hero-lead">Tools, structure and inspiration to help creators plan better content and build with confidence.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => scrollTo("product")}>Explore the pack <ArrowRight size={17} /></button>
              <a className="text-link" href="#about">Discover Mekden Works <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-proof"><span><Check size={14} /> 7 practical resources</span><span><Check size={14} /> Instant digital format after verified delivery</span></div>
          </div>
          <div className="hero-art">
            <div className="art-glow" />
            <div className="art-card art-card-back"><span>MEKDEN</span><small>CREATOR TOOLKIT / 2026</small></div>
            <div className="art-card art-card-front">
              <div className="art-top"><span>MW / 001</span><Sparkles size={17} /></div>
              <img className="hero-monogram" src="/mekden-monogram.png" alt="Mekden Works monogram" />
              <div className="art-title">CREATOR<br /><b>STARTER PACK</b></div>
              <div className="art-bottom"><span>IDEAS → PRODUCTS → IMPACT</span><span>01—07</span></div>
            </div>
            <div className="floating-tag"><Zap size={15} /> START CREATING</div>
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
            <div><div className="eyebrow"><span className="eyebrow-line" /> THE FIRST RELEASE</div><h2>Meet your new<br /><em>creator toolkit.</em></h2></div>
            <p>Seven focused resources. One simple system to help you move from “what should I post?” to a clearer content routine.</p>
          </div>
          <div className="product-layout">
            <div className="product-visual">
              <div className="product-visual-label">MEKDEN WORKS / DIGITAL COLLECTION</div>
              <div className="book-mock">
                <img className="book-monogram" src="/mekden-monogram.png" alt="Mekden Works monogram" />
                <div className="book-rule" />
                <div className="book-name">CREATOR<br /><b>STARTER PACK</b></div>
                <div className="book-foot">7 RESOURCES <span>•</span> DIGITAL EDITION</div>
              </div>
              <div className="visual-caption">A clearer starting point for your content journey.</div>
            </div>
            <div className="product-info">
              <div className="product-kicker">THE CREATOR STARTER PACK</div>
              <h3>Everything you need<br />to create with direction.</h3>
              <p className="muted">A practical digital collection designed to make content planning simpler and more structured.</p>
              <div className="price-row">
                <span className="old-price">₹{STORE_CONFIG.originalPrice}</span>
                <strong>₹{STORE_CONFIG.salePrice}</strong>
                <span className="save-pill">YOU SAVE 50%</span>
              </div>
              <button className="button button-gold buy-button" onClick={startCheckout}>Get instant access <ArrowRight size={17} /></button>
              <div className="secure-note"><ShieldCheck size={16} /> Delivery after payment verification</div>
              <div className="included-title">WHAT'S INCLUDED <span>07 FILES</span></div>
              <div className="file-list">
                {PRODUCT_FILES.map((item, index) => (
                  <div className="file-row" key={item.file}>
                    <span className="file-number">{String(index + 1).padStart(2, "0")}</span>
                    <div><b>{item.name}</b><small>{item.detail}</small></div>
                    <img className="file-monogram" src="/mekden-monogram.png" alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="section-pad">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> LESS GUESSWORK. MORE DIRECTION.</div>
            <div className="benefits-heading"><h2>Make creating<br /><em>feel more structured.</em></h2><p>Good content starts with a clear process. Use the resources in your own way, at your own pace.</p></div>
            <div className="benefit-grid">
              <article><span>01</span><h3>Find your next idea</h3><p>Keep a bank of hooks and ideas ready when you sit down to create.</p></article>
              <article><span>02</span><h3>Plan your content</h3><p>Give your month more structure with a simple calendar and scripts.</p></article>
              <article><span>03</span><h3>Communicate clearly</h3><p>Use caption and CTA inspiration to make each post more intentional.</p></article>
              <article><span>04</span><h3>Build consistency</h3><p>Create a repeatable posting system that works with your routine.</p></article>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-mark"><img src="/mekden-monogram.png" alt="Mekden Works monogram" /></div>
          <div className="about-copy"><div className="eyebrow"><span className="eyebrow-line" /> ABOUT THE BRAND</div><h2>Ideas.<br /><em>Made useful.</em></h2><p>Mekden Works is built around a simple belief: good ideas deserve practical execution. We create accessible digital products that help people plan, create and move forward with more clarity.</p><div className="signature">MEKDEN WORKS <span>IDEAS → PRODUCTS → IMPACT</span></div></div>
        </section>

        <section className="reviews-section section-pad" id="reviews">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> COMMUNITY FEEDBACK</div><h2>Thoughts from<br /><em>the community.</em></h2></div>
            <p>Have you used the Creator Starter Pack? Share honest feedback. Reviews submitted here are labelled as unverified until checked against an order.</p>
          </div>
          <div className="reviews-layout">
            <form className="review-form" onSubmit={submitReview}>
              <h3>Write a review</h3>
              <label>Your name<input required maxLength={40} value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="Your name" /></label>
              <label>Your rating<select value={reviewRating} onChange={(e) => setReviewRating(e.target.value)}><option value="5">5 — Excellent</option><option value="4">4 — Good</option><option value="3">3 — Okay</option><option value="2">2 — Could be better</option><option value="1">1 — Not satisfied</option></select></label>
              <label>Your feedback<textarea required minLength={8} maxLength={500} value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Tell others what you genuinely thought..." rows={4} /></label>
              <button className="button button-dark" type="submit">Submit feedback <ArrowRight size={16} /></button>
              <small>Feedback is saved in this browser only. It is not automatically published to other visitors.</small>
            </form>
            <div className="review-list">
              {reviews.length === 0 ? <div className="review-empty"><div className="review-stars">★★★★★</div><h3>Be the first to share feedback.</h3><p>No customer reviews have been published yet. We won't display made-up testimonials.</p></div> : reviews.map((review, index) => <article className="review-card" key={`${review.date}-${index}`}><div className="review-stars">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</div><p>“{review.text}”</p><div className="review-meta"><b>{review.name}</b><span>{review.date} · Unverified feedback</span></div></article>)}
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="section-heading faq-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> GOOD TO KNOW</div><h2>Frequently asked<br /><em>questions.</em></h2></div><p>Need something else? Reach out through the brand's Instagram page.</p></div>
          <div className="faq-list">
            {[
              ["What do I get with the Creator Starter Pack?", "The pack contains seven PDF resources covering hooks, content ideas, a 30-day calendar, Reel scripts, captions and CTAs, profile optimization, and a creator growth system."],
              ["Is this a subscription?", "No. The listed ₹149 price is a one-time price for this digital pack."],
              ["How will I receive the files?", "The files will be made available after the payment is genuinely verified and the seven PDFs have been uploaded to the website."],
              ["Can I access the pack on my phone?", "Yes. The website is designed to work on mobile, tablet and desktop. PDF compatibility depends on your device's PDF viewer."]
            ].map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} /></summary><p>{a}</p></details>)}
          </div>
        </section>

        <section className="closing-cta">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> YOUR NEXT STEP STARTS HERE</div>
          <h2>Make your next idea<br /><em>count.</em></h2>
          <button className="button button-gold" onClick={startCheckout}>Explore the Creator Pack <ArrowRight size={17} /></button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><div className="footer-brand-lockup"><img src="/mekden-logo.png" alt="Mekden Works monogram" /><b>MEKDEN WORKS</b></div><p>Ideas → Products → Impact.</p></div>
        <div className="footer-links"><a href="#product">Products</a><a href="#about">About</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a><a href={STORE_CONFIG.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Mekden Works. All rights reserved.</span><span>Built with purpose.</span></div>
      </footer>

      {modal === "checkout" && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <button className="modal-close" onClick={() => setModal(null)} aria-label="Close checkout"><X /></button>
            <div className="eyebrow"><span className="eyebrow-line" /> SECURE ORDER REQUEST</div>
            <h2 id="checkout-title">Your creator<br /><em>starter pack.</em></h2>
            <div className="checkout-summary"><span>Creator Starter Pack</span><strong>₹149</strong></div>
            <div className="checkout-discount"><span className="old-price">₹299</span><b>YOU SAVE 50%</b></div>
            <label>Your name<input value={orderName} onChange={(e) => setOrderName(e.target.value)} placeholder="Enter your name" /></label>
            <label>Email for delivery<input type="email" value={orderEmail} onChange={(e) => setOrderEmail(e.target.value)} placeholder="you@example.com" /></label>
            <div className="upi-panel">
              <div className="upi-panel-head"><span>UPI PAYMENT</span><span className="setup-tag">SETUP REQUIRED</span></div>
              {STORE_CONFIG.upiId ? <>
                <p>Pay exactly <b>₹149</b> to the verified UPI ID below:</p>
                <div className="upi-id">{STORE_CONFIG.upiId}<button onClick={copyUpi}>{copied ? <Check size={16} /> : "Copy"}</button></div>
              </> : <p className="setup-message">UPI details will appear here after the payment account is approved and configured. Checkout is not live yet.</p>}
              <p className="small-warning">Do not treat a payment screenshot as confirmation. Orders must be checked against the actual received transaction.</p>
            </div>
            <button className="button button-dark full-button" disabled={!STORE_CONFIG.upiId || !orderName.trim() || !orderEmail.trim()} onClick={() => alert("Payment verification and delivery must be connected before checkout can go live.")}>Continue to payment <ArrowRight size={17} /></button>
            <p className="modal-footnote">Order reference: {orderRef} · This is a preview checkout until payment verification is connected.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
