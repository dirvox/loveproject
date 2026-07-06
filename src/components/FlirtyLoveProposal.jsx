import React, { useState, useRef, useCallback } from "react";
import { Heart } from "lucide-react";

/* ============================================================
   Inline style objects (no Tailwind dependency)
   ============================================================ */
const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    boxSizing: "border-box",
    background:
      "radial-gradient(circle at 20% 20%, #ffe3ec 0%, #ffd1dc 45%, #ffc0d4 100%)",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "520px",
    minHeight: "540px",
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "28px",
    boxShadow: "0 25px 50px -12px rgba(255,105,180,0.35)",
    border: "1px solid #ffd1dc",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  progressTrack: {
    width: "100%",
    height: "8px",
    background: "#ffe3ec",
    borderRadius: "999px",
    marginBottom: "24px",
    overflow: "hidden",
  },
  progressFill: (pct) => ({
    height: "100%",
    borderRadius: "999px",
    width: `${pct}%`,
    background: "linear-gradient(90deg,#ff8fb3,#ff4d8d,#ff8fb3)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2.5s linear infinite",
    transition: "width 0.5s ease",
  }),
  decorHeart: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    color: "#ffb3c9",
  },
  centerCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "0px",
  },
  col: (gap) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: gap || "16px",
    width: "100%",
  }),
  title: {
    fontSize: "clamp(20px, 4vw, 28px)",
    fontWeight: 800,
    color: "#e6357a",
    lineHeight: 1.3,
    margin: 0,
    padding: "0 4px",
  },
  subText: {
    fontSize: "clamp(12px, 2.5vw, 14px)",
    color: "#ff8fb3",
    margin: 0,
    maxWidth: "320px",
  },
  bodyText: {
    fontSize: "clamp(13px, 2.8vw, 15px)",
    color: "#ff5c94",
    maxWidth: "300px",
    margin: 0,
  },
  eyebrow: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#ff9ebd",
  },
  primaryBtn: {
    marginTop: "6px",
    padding: "13px 34px",
    borderRadius: "999px",
    background: "#ff4d8d",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 25px -8px rgba(255,77,141,0.6)",
    transition: "transform 0.15s ease, background 0.2s ease",
  },
  optionsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    maxWidth: "320px",
    marginTop: "8px",
  },
  optionBtn: {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "18px",
    background: "#fff",
    border: "2px solid #ffb3c9",
    color: "#e6357a",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(255,105,180,0.15)",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  finalStage: {
    position: "relative",
    width: "100%",
    maxWidth: "320px",
    height: "130px",
  },
  yesBtn: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "8px",
    padding: "14px 42px",
    borderRadius: "999px",
    background: "#ff4d8d",
    color: "#fff",
    fontWeight: 800,
    fontSize: "17px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 12px 28px -8px rgba(255,77,141,0.7)",
    zIndex: 10,
    transition: "transform 0.15s ease",
  },
  noBtnBase: {
    padding: "13px 32px",
    borderRadius: "999px",
    background: "#fff",
    border: "2px solid #ffd1dc",
    color: "#ff9ebd",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(255,105,180,0.15)",
    transition: "top 0.25s ease, left 0.25s ease",
  },
  linkBtn: {
    marginTop: "8px",
    padding: "13px 34px",
    borderRadius: "999px",
    background: "#ff4d8d",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
    textDecoration: "none",
    display: "inline-block",
    boxShadow: "0 10px 25px -8px rgba(255,77,141,0.6)",
  },
};

/* ============================================================
   ✏️ CUSTOMIZE THESE BEFORE SHARING
   ============================================================ */
const CONFIG = {
  partnerName: "Jaan",

  finalQuestion:
    "Bas ek aakhri sawaal... Kya tum meri zindagi ka sabse khoobsurat hissa banoge/banogi? ❤️🥹",

  finalLink: "https://open.spotify.com/",

  finalLinkLabel: "Our Song 🎵",

  successMessage:
    "You said YES! 🥹❤️ Thank you for choosing me. Aaj se har khushi tumhare saath. I love you forever! 💍✨",
};

/* ============================================================
   Questions — har jawab curiosity + hearts trigger karta hai
   ============================================================ */
const QUESTIONS = [
  {
    q: "Sabse pehle... tumhe pata hai tum kitni cute ho? 🥰",
    sub: "Do you know how cute you are?",
    options: ["Thoda sa 😳", "Bahut zyada! 💕", "Tum batao na 👀"],
  },
  {
    q: "Agar main tumhe abhi ek gift doon, sabse pehle kya yaad aayega?",
    sub: "If I gave you a gift right now, what comes to mind?",
    options: ["Chocolate 🍫", "Ek pyara hug 🤗", "Bas tumhara pyar ❤️"],
  },
  {
    q: "Jab tum mujhse baat karte ho, mujhe kaisa lagta hai pata hai?",
    sub: "Do you know how I feel when we talk?",
    options: ["Khushi 😊", "Dil ki dhadkan tez 💓", "Dono ek saath 💕"],
  },
  {
    q: "Ek chhota sa raaz batau tumhe? 🤫",
    sub: "Want to know a little secret?",
    options: ["Haan bolo na 👉", "Batao jaldi se 😳", "Main sun rahi hoon 💗"],
  },
  {
    q: "Woh raaz yeh hai... tumhare bina din adhoora sa lagta hai. 🥹",
    sub: "The secret is... my day feels incomplete without you.",
    options: ["Awww 🥺", "Mujhe bhi kuch kehna hai", "Aage badho na 💓"],
  },
];

/* ============================================================
   Floating hearts burst
   ============================================================ */
const HeartBurst = ({ count = 18, big = false }) => {
  const hearts = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const size = big ? 18 + Math.random() * 26 : 10 + Math.random() * 14;
    const duration = 2.2 + Math.random() * 1.8;
    const delay = Math.random() * 0.6;
    const drift = (Math.random() - 0.5) * 120;
    const hue = Math.random() > 0.5 ? "#ff4d8d" : "#ff8fb3";
    return { id: i, left, size, duration, delay, drift, hue };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {hearts.map((h) => (
        <Heart
          key={h.id}
          fill={h.hue}
          color={h.hue}
          className="heart-float"
          style={{
            position: "absolute",
            bottom: 0,
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            "--drift": `${h.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   Main component
   ============================================================ */
const FlirtyLoveProposal = () => {
  const [step, setStep] = useState(-1); // -1 = intro, 0..4 = questions, 5 = final, 6 = success
  const [burstKey, setBurstKey] = useState(0);
  const [showBurst, setShowBurst] = useState(false);
  const [noPos, setNoPos] = useState({ top: null, left: null });
  const [noDodges, setNoDodges] = useState(0);
  const stageRef = useRef(null);

  const triggerBurst = useCallback((big = false) => {
    setBurstKey((k) => k + 1);
    setShowBurst(true);
    window.clearTimeout(triggerBurst._t);
    triggerBurst._t = window.setTimeout(() => setShowBurst(false), big ? 3200 : 2400);
  }, []);

  const handleOption = () => {
    triggerBurst(false);
    setTimeout(() => {
      setStep((s) => (s < QUESTIONS.length - 1 ? s + 1 : QUESTIONS.length));
    }, 550);
  };

  const dodgeNoButton = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const btnW = 110;
    const btnH = 48;
    const maxLeft = Math.max(w - btnW - 12, 12);
    const maxTop = Math.max(h - btnH - 12, 12);
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    setNoPos({ top, left });
    setNoDodges((n) => n + 1);
  };

  const handleYes = () => {
    triggerBurst(true);
    setTimeout(() => setStep(6), 300);
  };

  const totalSteps = QUESTIONS.length + 2; // intro + questions + final
  const currentIndex = step < 0 ? 0 : step >= QUESTIONS.length ? totalSteps - 1 : step + 1;
  const progressPct = Math.min(100, Math.round((currentIndex / (totalSteps - 1)) * 100));

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes heartFloat {
          0% { transform: translateY(0) translateX(0) scale(0.6) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-420px) translateX(var(--drift)) scale(1.1) rotate(25deg); opacity: 0; }
        }
        .heart-float { animation-name: heartFloat; animation-timing-function: ease-out; animation-fill-mode: forwards; }

        @keyframes popIn {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pop-in { animation: popIn 0.45s ease-out; }

        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        .pulse-heart { animation: pulseHeart 1.4s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .btn-primary:hover { background: #ff2d7a !important; transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.96); }
        .btn-option:hover { background: #ff4d8d !important; color: #fff !important; border-color: #ff4d8d !important; }
        .btn-option:active { transform: scale(0.96); }
        .btn-yes:hover { transform: translateX(-50%) translateY(-2px); }
        .btn-yes:active { transform: translateX(-50%) scale(0.96); }

        @media (max-width: 480px) {
          .love-card { padding: 18px !important; min-height: 480px !important; }
        }
      `}</style>

      <div ref={stageRef} className="love-card" style={styles.card}>
        {showBurst && <HeartBurst key={burstKey} count={step === 5 ? 40 : 18} big={step === 5} />}

        {/* Progress bar */}
        <div style={styles.progressTrack}>
          <div style={styles.progressFill(progressPct)} />
        </div>

        {/* Floating decorative heart */}
        <Heart className="pulse-heart" style={styles.decorHeart} size={44} fill="#ffd1dc" color="#ffd1dc" />

        <div style={styles.centerCol}>
          {/* INTRO */}
          {step === -1 && (
            <div key="intro" className="pop-in" style={styles.col("18px")}>
              <Heart size={56} fill="#ff4d8d" color="#ff4d8d" className="pulse-heart" />
              <h1 style={styles.title}>Hey {CONFIG.partnerName} 👋</h1>
              <p style={styles.bodyText}>
                Ek chhota sa surprise hai tumhare liye... par pehle mujhe kuch
                sawaal poochne hai. Ready ho?
              </p>
              <p style={styles.subText}>
                (I have a small surprise for you... but first, a few questions.)
              </p>
              <button
                onClick={() => { setStep(0); triggerBurst(false); }}
                className="btn-primary"
                style={styles.primaryBtn}
              >
                Chalo shuru karte hai 💌
              </button>
            </div>
          )}

          {/* QUESTIONS */}
          {step >= 0 && step < QUESTIONS.length && (
            <div key={step} className="pop-in" style={styles.col("18px")}>
              <span style={styles.eyebrow}>
                Sawaal {step + 1} / {QUESTIONS.length}
              </span>
              <h2 style={styles.title}>{QUESTIONS[step].q}</h2>
              <p style={styles.subText}>{QUESTIONS[step].sub}</p>

              <div style={styles.optionsWrap}>
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={handleOption}
                    className="btn-option"
                    style={styles.optionBtn}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FINAL PROPOSAL */}
          {step === QUESTIONS.length && (
            <div key="final" className="pop-in" style={styles.col("22px")}>
              <Heart size={50} fill="#ff4d8d" color="#ff4d8d" className="pulse-heart" />
              <h2 style={styles.title}>{CONFIG.finalQuestion}</h2>
              {noDodges > 2 && (
                <p style={{ ...styles.subText, fontStyle: "italic" }}>
                  Arre "No" bhaag kyu raha hai... 😏 sirf "Yes" try karo!
                </p>
              )}

              <div style={styles.finalStage}>
                <button onClick={handleYes} className="btn-yes" style={styles.yesBtn}>
                  Yes 💖
                </button>

                <button
                  onMouseEnter={dodgeNoButton}
                  onTouchStart={(e) => { e.preventDefault(); dodgeNoButton(); }}
                  onClick={dodgeNoButton}
                  style={{
                    ...styles.noBtnBase,
                    ...(noPos.top === null
                      ? { position: "absolute", bottom: 8, left: "calc(50% + 70px)" }
                      : { position: "absolute", top: noPos.top, left: noPos.left }),
                  }}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {step === 6 && (
            <div key="success" className="pop-in" style={styles.col("18px")}>
              <Heart size={60} fill="#ff4d8d" color="#ff4d8d" className="pulse-heart" />
              <h2 style={styles.title}>{CONFIG.successMessage}</h2>
              <a
                href={CONFIG.finalLink}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkBtn}
              >
                {CONFIG.finalLinkLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlirtyLoveProposal;