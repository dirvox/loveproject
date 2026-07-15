import React, { useState, useRef, useCallback, useEffect } from "react";
import { Heart, Lock, Gift, PartyPopper, Cake, Mail, MailOpen } from "lucide-react";

/* ============================================================
   ✏️ CUSTOMIZE THESE BEFORE SHARING
   ============================================================ */
const CONFIG = {
  partnerName: "Jaan",
  secretCode: "143", 
  codeHint: "Hint: humari favorite number 💕",

  letterTitle: "Ek Chhota Sa Khat, Tumhare Liye 💌",
  letterParagraphs: [
    "Meri Jaan,",
    "Aaj ka din bohot khaas hai, kyunki aaj tumhara din hai. Jab se tum meri zindagi me aayi ho, har din pehle se zyada khoobsurat lagta hai.",
    "Tumhari muskurahat, tumhari baatein, tumhara wo pagalpan — sab kuch mujhe tumse aur pyaar karna sikhata hai.",
    "Is saal bhi tumne mujhe itna kuch diya — sukoon, hasi, aur wo pyaar jo maine kabhi kisi se nahi paaya. Thank you for being you.",
    "Happy Birthday, meri jaan. Chalo ab tumhare liye ek chhota sa surprise hai... par pehle 2 sawaalon ke jawaab do 😉",
    "Hamesha tumhara,\n— Tumhara Pyaar 💗",
  ],

  questions: [
    {
      q: "Is saal ka sabse pyara pal kaunsa tha humara?",
      sub: "What was our sweetest moment this year?",
      options: ["Pehli date 🥰", "Wo random call 📞", "Har pal hi khaas tha 💕"],
    },
    {
      q: "Agla saal humein saath me kya karna chahiye?",
      sub: "What should we do together next year?",
      options: ["Trip pe jaana ✈️", "Zyada time saath 💑", "Dono! 😍"],
    },
    {
      q: "Tumhe pata hai tum meri zindagi me kya ho?",
      sub: "Do you know what you are in my life?",
      options: ["Best cheez 🌟", "Meri khushi 🥰", "Sab kuch 💖"],
    },
  ],

  birthdayHeading: "Happy Birthday",
  birthdayMessage:
    "Meri jaan, tum jaise ho waise hi perfect ho. Yeh saal tumhare liye khushiyon, pyaar aur sapno bhare pal leke aaye. I love you so much! 🎂💗",
};

/* ============================================================
   Floating hearts burst
   ============================================================ */
const HeartBurst = ({ count = 22, big = false }) => {
  const hearts = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const size = big ? 20 + Math.random() * 30 : 12 + Math.random() * 18;
    const duration = 2.0 + Math.random() * 1.5;
    const delay = Math.random() * 0.4;
    const drift = (Math.random() - 0.5) * 160;
    const hue = Math.random() > 0.5 ? "#ff4d8d" : "#ff8fb3";
    return { id: i, left, size, duration, delay, drift, hue };
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 10 }}>
      {hearts.map((h) => (
        <Heart
          key={h.id}
          fill={h.hue}
          color={h.hue}
          className="heart-float"
          style={{
            position: "absolute",
            bottom: -20,
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
   Rising balloons
   ============================================================ */
const BALLOON_COLORS = ["#ff8fb3", "#ffb3c9", "#ffd1dc", "#ff6fa3", "#ffc4d6", "#ff9ecb"];

const Balloons = ({ count = 18 }) => {
  const balloons = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 94;
    const size = 38 + Math.random() * 24;
    const duration = 5 + Math.random() * 4;
    const delay = Math.random() * 3;
    const color = BALLOON_COLORS[i % BALLOON_COLORS.length];
    const sway = (Math.random() - 0.5) * 80;
    return { id: i, left, size, duration, delay, color, sway };
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon-rise"
          style={{
            position: "absolute",
            bottom: -150,
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.25,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            "--sway": `${b.sway}px`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: b.color,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              boxShadow: "inset -8px -8px 12px rgba(0,0,0,0.07)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -4,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: `7px solid ${b.color}`,
              }}
            />
          </div>
          <div
            style={{
              width: 1.5,
              height: 50,
              background: "#e88aa8",
              margin: "0 auto",
            }}
          />
        </div>
      ))}
    </div>
  );
};

/* ============================================================
   Inline style objects
   ============================================================ */
const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    boxSizing: "border-box",
    background: "radial-gradient(circle at 30% 30%, #ffeef4 0%, #ffd1dc 50%, #ffbad0 100%)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "580px",
    minHeight: "600px",
    background: "rgba(255, 255, 255, 0.82)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderRadius: "32px",
    boxShadow: "0 30px 60px -15px rgba(255, 90, 160, 0.4)",
    border: "2px solid rgba(255, 255, 255, 0.6)",
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
    zIndex: 2,
  },
  scrollArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  title: {
    fontSize: "clamp(24px, 5vw, 32px)",
    fontWeight: 800,
    color: "#e6357a",
    lineHeight: 1.35,
    margin: "0 0 8px 0",
    padding: "0 4px",
    textShadow: "0 2px 4px rgba(255,105,180,0.15)",
  },
  subText: {
    fontSize: "clamp(13px, 2.8vw, 16px)",
    color: "#ff7da5",
    margin: 0,
    maxWidth: "400px",
    fontWeight: 500,
  },
  bodyText: {
    fontSize: "clamp(15px, 3.2vw, 18px)",
    color: "#ff4785",
    maxWidth: "400px",
    margin: 0,
    fontWeight: 500,
  },
  eyebrow: {
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#ff82a9",
  },
  col: (gap) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: gap || "20px",
    width: "100%",
  }),
  primaryBtn: {
    marginTop: "8px",
    padding: "15px 44px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #ff609f 0%, #ff337f 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 12px 28px -8px rgba(255,51,127,0.55)",
    transition: "all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    fontFamily: "'Poppins', sans-serif",
  },
  codeInput: {
    width: "100%",
    maxWidth: "240px",
    padding: "16px",
    borderRadius: "20px",
    border: "2.5px solid #ffb3c9",
    fontSize: "24px",
    letterSpacing: "8px",
    textAlign: "center",
    color: "#e6357a",
    outline: "none",
    boxSizing: "border-box",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
    fontWeight: 700,
    fontFamily: "'Poppins', sans-serif",
  },
  errorText: {
    color: "#ff1e4b",
    fontSize: "14px",
    fontWeight: 600,
    margin: 0,
  },
  envelopeWrap: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "20px",
    transition: "transform 0.3s ease",
  },
  letterPaper: {
    background: "linear-gradient(180deg, #fffcfd, #ffffff)",
    border: "1.5px solid #ffa3c2",
    borderRadius: "24px",
    padding: "28px 26px",
    boxShadow: "0 15px 35px rgba(255,90,150,0.15)",
    textAlign: "left",
    width: "100%",
    boxSizing: "border-box",
    transformOrigin: "top center",
  },
  letterPara: {
    fontSize: "clamp(15px, 3vw, 17px)",
    color: "#b02553",
    lineHeight: 1.75,
    margin: "0 0 14px 0",
    whiteSpace: "pre-line",
    fontWeight: 500,
  },
  optionsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
    maxWidth: "360px",
    marginTop: "10px",
  },
  optionBtn: {
    width: "100%",
    padding: "15px 20px",
    borderRadius: "20px",
    background: "#fff",
    border: "2.5px solid #ffccd9",
    color: "#e6357a",
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(255,105,180,0.1)",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    fontFamily: "'Poppins', sans-serif",
  },
  progressTrack: {
    width: "100%",
    height: "10px",
    background: "#ffe8f0",
    borderRadius: "999px",
    marginBottom: "24px",
    overflow: "hidden",
    flexShrink: 0,
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
  },
  progressFill: (pct) => ({
    height: "100%",
    borderRadius: "999px",
    width: `${pct}%`,
    background: "linear-gradient(90deg, #ff8fb3, #ff337f, #ff8fb3)",
    backgroundSize: "200% 100%",
    animation: "shimmer 2s linear infinite",
    transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  }),
};

const TOTAL_STAGES = 4;

const BirthdaySurprise = () => {
  const [stage, setStage] = useState("lock"); // lock | letter | questions | celebration
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [showBurst, setShowBurst] = useState(false);
  const stageRef = useRef(null);
  const burstTimeout = useRef(null);

  const triggerBurst = useCallback((big = false) => {
    setBurstKey((k) => k + 1);
    setShowBurst(true);
    window.clearTimeout(burstTimeout.current);
    burstTimeout.current = window.setTimeout(() => setShowBurst(false), big ? 4200 : 2200);
  }, []);

  useEffect(() => () => window.clearTimeout(burstTimeout.current), []);

  const stageProgress = { lock: 0, letter: 1, questions: 2, celebration: 3 }[stage];
  const qProgress = stage === "questions" ? qIndex / CONFIG.questions.length : 0;
  const progressPct = Math.round(((stageProgress + (stage === "questions" ? qProgress : 0)) / (TOTAL_STAGES - 1)) * 100);

  const submitCode = () => {
    if (codeInput.trim().toLowerCase() === CONFIG.secretCode.toLowerCase()) {
      setCodeError(false);
      triggerBurst(false);
      setStage("letter");
    } else {
      setCodeError(true);
    }
  };

  const handleOption = () => {
    triggerBurst(false);
    setTimeout(() => {
      if (qIndex < CONFIG.questions.length - 1) {
        setQIndex((i) => i + 1);
      } else {
        setStage("celebration");
        triggerBurst(true);
      }
    }, 450);
  };

  return (
    <div style={styles.page}>
      {/* Import Poppins dynamically via embedded CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        @keyframes heartFloat {
          0% { transform: translateY(0) translateX(0) scale(0.5) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          100% { transform: translateY(-500px) translateX(var(--drift)) scale(1.2) rotate(35deg); opacity: 0; }
        }
        .heart-float { animation-name: heartFloat; animation-timing-function: ease-out; animation-fill-mode: forwards; }

        @keyframes balloonRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.95; }
          100% { transform: translateY(-850px) translateX(var(--sway)); opacity: 0.85; }
        }
        .balloon-rise { animation-name: balloonRise; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }

        @keyframes popIn {
          0% { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pop-in { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .pulse-heart { animation: pulseHeart 1.2s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-9px); }
          40%, 80% { transform: translateX(9px); }
        }
        .shake { animation: shake 0.38s ease-in-out; }

        @keyframes bounceIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .bounce-icon { animation: bounceIcon 1.6s ease-in-out infinite; }
        
        @keyframes openPaper {
          0% { transform: scaleY(0.1); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        .open-paper { animation: openPaper 0.5s cubic-bezier(0.19, 1, 0.22, 1) both; }

        @keyframes floatBg {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.1); }
        }
        .bg-blob {
          position: absolute; width: 400px; height: 400px; background: #ffdae6;
          border-radius: 50%; filter: blur(80px); opacity: 0.6; z-index: 1;
          animation: floatBg 10s ease-in-out infinite;
        }

        .btn-primary:hover { background: linear-gradient(135deg, #ff337f 0%, #e61a65 100%) !important; transform: translateY(-2px); boxShadow: 0 15px 30px -5px rgba(255,51,127,0.7) !important; }
        .btn-primary:active { transform: scale(0.97); }
        .btn-option:hover { background: #ff4d8d !important; color: #fff !important; border-color: #ff4d8d !important; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(255,105,180,0.25); }
        .btn-option:active { transform: scale(0.97); }
        .envelope-click:hover { transform: scale(1.08) rotate(-1deg); }
      `}</style>

      {/* Decorative moving background blob */}
      <div className="bg-blob" style={{ top: "10%", left: "10%" }} />
      <div className="bg-blob" style={{ bottom: "5%", right: "5%", animationDelay: "-4s", background: "#ffe6ee" }} />

      <div ref={stageRef} className="bday-card" style={styles.card}>
        {showBurst && <HeartBurst key={burstKey} count={stage === "celebration" ? 38 : 18} big={stage === "celebration"} />}
        {stage === "celebration" && <Balloons count={18} />}

        <div style={styles.progressTrack}>
          <div style={styles.progressFill(progressPct)} />
        </div>

        <div style={styles.scrollArea}>
          {/* STAGE 1: LOCK / SECRET CODE */}
          {stage === "lock" && (
            <div className={`pop-in ${codeError ? "shake" : ""}`} style={styles.col("20px")}>
              <Lock size={52} color="#ff4d8d" className="bounce-icon" />
              <h1 style={styles.title}>Ek Secret Surprise Hai {CONFIG.partnerName} 🔐</h1>
              <p style={styles.bodyText}>Isse kholne ke liye secret code daalo:</p>
              <input
                type="text"
                value={codeInput}
                onChange={(e) => { setCodeInput(e.target.value); setCodeError(false); }}
                onKeyDown={(e) => e.key === "Enter" && submitCode()}
                placeholder="• • •"
                style={styles.codeInput}
              />
              <p style={styles.subText}>{CONFIG.codeHint}</p>
              {codeError && <p style={styles.errorText}>Galat code hai, dobara try karo 💗</p>}
              <button onClick={submitCode} className="btn-primary" style={styles.primaryBtn}>
                Unlock 🔓
              </button>
            </div>
          )}

          {/* STAGE 2: LOVE LETTER & ENVELOPE OPENING */}
          {stage === "letter" && (
            <div className="pop-in" style={styles.col("20px")}>
              {!isLetterOpen ? (
                <div 
                  className="envelope-click" 
                  style={styles.envelopeWrap} 
                  onClick={() => { setIsLetterOpen(true); triggerBurst(false); }}
                >
                  <Mail size={74} color="#ff4d8d" className="bounce-icon" />
                  <h2 style={styles.title}>{CONFIG.letterTitle}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ff337f", fontWeight: 600 }}>
                    <Heart size={18} fill="#ff337f" className="pulse-heart" /> 
                    <span>Tap to open your letter</span>
                  </div>
                </div>
              ) : (
                <div className="open-paper" style={styles.col("20px")}>
                  <MailOpen size={46} color="#ff4d8d" />
                  <div style={styles.letterPaper}>
                    {CONFIG.letterParagraphs.map((p, i) => (
                      <p key={i} style={styles.letterPara}>{p}</p>
                    ))}
                  </div>
                  <button
                    onClick={() => { setStage("questions"); triggerBurst(false); }}
                    className="btn-primary"
                    style={styles.primaryBtn}
                  >
                    Aage Chalo 💕
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STAGE 3: QUESTIONS */}
          {stage === "questions" && (
            <div key={qIndex} className="pop-in" style={styles.col("22px")}>
              <span style={styles.eyebrow}>Sawaal {qIndex + 1} / {CONFIG.questions.length}</span>
              <h2 style={styles.title}>{CONFIG.questions[qIndex].q}</h2>
              <p style={styles.subText}>{CONFIG.questions[qIndex].sub}</p>
              <div style={styles.optionsWrap}>
                {CONFIG.questions[qIndex].options.map((opt, i) => (
                  <button key={i} onClick={handleOption} className="btn-option" style={styles.optionBtn}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 4: CELEBRATION */}
          {stage === "celebration" && (
            <div className="pop-in" style={{ ...styles.col("18px"), position: "relative", zIndex: 12 }}>
              <PartyPopper size={60} color="#ff4d8d" className="bounce-icon" />
              <h1 style={{ ...styles.title, fontSize: "clamp(28px, 6.5vw, 42px)" }}>
                {CONFIG.birthdayHeading} 🎉<br />{CONFIG.partnerName}! 🎂
              </h1>
              <p style={{ ...styles.bodyText, maxWidth: "420px", fontSize: "17px", lineHeight: "1.6" }}>
                {CONFIG.birthdayMessage}
              </p>
              <div style={{ display: "flex", gap: "18px", marginTop: "12px" }}>
                <Cake size={36} color="#ff609f" />
                <Gift size={36} color="#ff609f" />
                <Heart size={36} fill="#ff609f" color="#ff609f" className="pulse-heart" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdaySurprise;