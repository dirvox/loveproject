import React, { useState, useEffect, useMemo, useRef } from "react";

/* ============================================================
   EDIT THESE TWO LINES TO PERSONALISE THE SURPRISE
   ============================================================ */
const HER_NAME = "Meri Jaan";
const MESSAGE =
  "Har saal tumhare saath yeh din aur khaas ho jaata hai. Tumhari muskaan hi meri sabse pyari wish hai. Happy Birthday, aaj ka din, aur har din, sirf tumhare naam. Main tumse bahut pyaar karta hoon. ❤️";
/* ============================================================ */

const BALLOON_COLORS = ["#ff6fa5", "#f2c14e", "#c9a7f5", "#7ed6d6", "#ff9f68"];
const CONFETTI_COLORS = ["#ff6fa5", "#f2c14e", "#c9a7f5", "#7ed6d6", "#fff2b2", "#ff9f68"];

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export default function BirthdayWish() {
  const [stage, setStage] = useState("gate"); // gate -> opening -> balloons -> birthday
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [burstKey, setBurstKey] = useState(0);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (stage === "opening") {
      const t = setTimeout(() => setStage("balloons"), 1400);
      return () => clearTimeout(t);
    }
    if (stage === "balloons") {
      const t = setTimeout(() => setStage("birthday"), 3400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const balloons = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: 2 + rand() * 92,
      size: 46 + rand() * 34,
      duration: 5 + rand() * 4,
      delay: rand() * 2.2,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      sway: 18 + rand() * 24,
    }));
  }, []);

  const confetti = useMemo(() => {
    const rand = seededRandom(7);
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: rand() * 100,
      size: 6 + rand() * 8,
      duration: 3.2 + rand() * 3,
      delay: rand() * 4,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      rotate: rand() * 360,
      shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "rect",
    }));
  }, []);

  const openGate = () => {
    if (stage !== "gate") return;
    setStage("opening");
  };

  const handleBlowCandle = () => {
    setCandleLit(false);
  };

  const handleSurprise = () => {
    setSurpriseOpen(true);
    setBurstKey((k) => k + 1);
  };

  return (
    <div style={styles.appWrapper}>
      <style>{globalCss}</style>

      {/* ---------- STAGE 1 & 2 : GATE ---------- */}
      {(stage === "gate" || stage === "opening") && (
        <div style={styles.gateScreen}>
          <div style={styles.starsLayer} className="stars-layer" />
          <div style={styles.gateTitleWrap}>
            <p style={styles.gateEyebrow}>a little something for</p>
            <h1 style={styles.gateName}>{HER_NAME}</h1>
          </div>

          <div style={styles.gateFrame}>
            <div
              style={{
                ...styles.gateDoor,
                ...styles.gateDoorLeft,
                transform: stage === "opening" ? "translateX(-105%) rotateY(8deg)" : "translateX(0)",
              }}
              onClick={openGate}
              className="gate-door"
            >
              <div style={styles.doorPanelInner}>
                <div style={styles.doorOrnamentTop} />
                <div style={styles.doorOrnamentBottom} />
              </div>
            </div>
            <div
              style={{
                ...styles.gateDoor,
                ...styles.gateDoorRight,
                transform: stage === "opening" ? "translateX(105%) rotateY(-8deg)" : "translateX(0)",
              }}
              onClick={openGate}
              className="gate-door"
            >
              <div style={styles.doorPanelInner}>
                <div style={styles.doorOrnamentTop} />
                <div style={styles.doorOrnamentBottom} />
              </div>
            </div>

            <div style={styles.keyholeGlow} className="keyhole-glow" />

            {stage === "gate" && (
              <button style={styles.tapButton} onClick={openGate} className="tap-btn">
                <span style={styles.tapButtonIcon}>✦</span>
                Tap to Open
                <span style={styles.tapButtonIcon}>✦</span>
              </button>
            )}
          </div>

          <p style={styles.gateFooterHint}>{stage === "gate" ? "something is waiting behind these doors..." : ""}</p>
        </div>
      )}

      {/* ---------- STAGE 3 : BALLOONS ---------- */}
      {stage === "balloons" && (
        <div style={styles.balloonScreen}>
          <div style={styles.starsLayer} className="stars-layer" />
          {balloons.map((b) => (
            <div
              key={b.id}
              className="balloon"
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size * 1.2,
                background: `radial-gradient(circle at 32% 28%, ${lighten(b.color)} 0%, ${b.color} 60%, ${darken(
                  b.color
                )} 100%)`,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
                "--sway": `${b.sway}px`,
              }}
            >
              <div style={styles.balloonString} />
            </div>
          ))}
          <div style={styles.balloonCenterText}>
            <h2 style={styles.balloonCenterHeading}>Get Ready...</h2>
          </div>
        </div>
      )}

      {/* ---------- STAGE 4 : BIRTHDAY ---------- */}
      {stage === "birthday" && (
        <div style={styles.birthdayScreen}>
          <div style={styles.starsLayer} className="stars-layer" />

          {confetti.map((c) => (
            <div
              key={c.id}
              className={`confetti confetti-${c.shape}`}
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.shape === "rect" ? c.size * 2.2 : c.size,
                background: c.color,
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
                transform: `rotate(${c.rotate}deg)`,
              }}
            />
          ))}

          <div style={styles.birthdayContent}>
            <p style={styles.happyEyebrow}>✦ ✦ ✦</p>
            <h1 style={styles.happyHeading}>
              Happy <span style={styles.happyHeadingAccent}>Birthday</span>
            </h1>
            <h2 style={styles.happyNameHeading}>{HER_NAME}</h2>

            {/* Cake */}
            <div style={styles.cakeWrap}>
              <div style={styles.candleFlameHolder}>
                <div
                  className={candleLit ? "flame" : ""}
                  style={{
                    ...styles.flame,
                    opacity: candleLit ? 1 : 0,
                    transform: candleLit ? "scale(1)" : "scale(0.2)",
                  }}
                />
                <div style={styles.candleStick} />
              </div>
              <div style={styles.cakeTopLayer}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} style={{ ...styles.sprinkle, left: `${8 + i * 12}%` }} />
                ))}
              </div>
              <div style={styles.cakeMidLayer} />
              <div style={styles.cakeBaseLayer} />
              <div style={styles.cakePlate} />
            </div>

            {candleLit ? (
              <button style={styles.blowButton} onClick={handleBlowCandle} className="blow-btn">
                🕯️ Blow the Candle
              </button>
            ) : (
              <p style={styles.wishGranted}>✨ wish granted ✨</p>
            )}

            {!surpriseOpen ? (
              <button style={styles.surpriseButton} onClick={handleSurprise} className="surprise-btn">
                💌 Tap for a Message
              </button>
            ) : (
              <div key={burstKey} style={styles.messageCard} className="message-card">
                <p style={styles.messageText}>{MESSAGE}</p>
                <p style={styles.messageSign}>— always yours</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function lighten(hex) {
  return shade(hex, 0.35);
}
function darken(hex) {
  return shade(hex, -0.25);
}
function shade(hex, amt) {
  const num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + Math.round(255 * amt);
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * amt);
  let b = (num & 0x0000ff) + Math.round(255 * amt);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/* ============================ STYLES ============================ */

const styles = {
  appWrapper: {
    width: "100%",
    minHeight: "100dvh",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    overflow: "hidden",
    position: "relative",
    boxSizing: "border-box",
  },

  starsLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },

  /* ---------------- GATE ---------------- */
  gateScreen: {
    position: "relative",
    width: "100%",
    minHeight: "100dvh",
    background: "radial-gradient(ellipse at 50% 20%, #2c1a4d 0%, #180f2e 55%, #0c0818 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "6vh 4vw",
    boxSizing: "border-box",
  },
  gateTitleWrap: {
    textAlign: "center",
    marginBottom: "clamp(16px, 4vh, 32px)",
    zIndex: 3,
  },
  gateEyebrow: {
    color: "#c9a7f5",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    fontSize: "clamp(10px, 2vw, 13px)",
    margin: 0,
    fontWeight: 500,
  },
  gateName: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontStyle: "italic",
    color: "#fdf6ff",
    fontSize: "clamp(28px, 7vw, 56px)",
    margin: "6px 0 0",
    textShadow: "0 0 30px rgba(242,193,78,0.35)",
  },
  gateFrame: {
    position: "relative",
    width: "min(90vw, 420px)",
    height: "min(58vh, 480px)",
    borderRadius: "160px 160px 12px 12px",
    overflow: "hidden",
    boxShadow: "0 0 0 6px #f2c14e, 0 0 60px rgba(242,193,78,0.35), 0 30px 60px rgba(0,0,0,0.5)",
    background: "#0c0818",
  },
  gateDoor: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    background: "linear-gradient(135deg, #4b2e7f 0%, #2c1a4d 55%, #1c1032 100%)",
    transition: "transform 1.3s cubic-bezier(.72,-0.1,.24,1.05)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gateDoorLeft: {
    left: 0,
    borderRight: "2px solid rgba(242,193,78,0.5)",
    borderTopLeftRadius: "160px",
  },
  gateDoorRight: {
    right: 0,
    borderLeft: "2px solid rgba(242,193,78,0.5)",
    borderTopRightRadius: "160px",
  },
  doorPanelInner: {
    width: "70%",
    height: "80%",
    border: "1.5px solid rgba(242,193,78,0.4)",
    borderRadius: "120px 120px 8px 8px",
    position: "relative",
  },
  doorOrnamentTop: {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#f2c14e",
    boxShadow: "0 0 12px #f2c14e",
  },
  doorOrnamentBottom: {
    position: "absolute",
    bottom: "12%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 26,
    height: 26,
    borderRadius: "50%",
    border: "2px solid rgba(242,193,78,0.5)",
  },
  keyholeGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 18,
    height: 18,
    borderRadius: "50%",
    transform: "translate(-50%,-50%)",
    background: "#fff2b2",
    boxShadow: "0 0 40px 18px rgba(242,193,78,0.65)",
    zIndex: 1,
  },
  tapButton: {
    position: "absolute",
    bottom: "8%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 4,
    background: "linear-gradient(120deg, #f2c14e, #ff9f68)",
    border: "none",
    borderRadius: "999px",
    padding: "12px 22px",
    fontSize: "clamp(12px, 2.4vw, 15px)",
    fontWeight: 700,
    letterSpacing: "0.08em",
    color: "#2c1a4d",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 8px 24px rgba(242,193,78,0.45)",
  },
  tapButtonIcon: { fontSize: "0.8em" },
  gateFooterHint: {
    marginTop: "clamp(14px, 3vh, 24px)",
    color: "rgba(253,246,255,0.55)",
    fontSize: "clamp(11px, 2vw, 13px)",
    fontStyle: "italic",
    minHeight: "1.2em",
    textAlign: "center",
  },

  /* ---------------- BALLOONS ---------------- */
  balloonScreen: {
    position: "relative",
    width: "100%",
    minHeight: "100dvh",
    background: "linear-gradient(180deg, #1c1032 0%, #341f5c 55%, #4b2e7f 100%)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  balloonString: {
    position: "absolute",
    top: "100%",
    left: "50%",
    width: 1,
    height: 40,
    background: "rgba(255,255,255,0.5)",
  },
  balloonCenterText: {
    position: "relative",
    zIndex: 5,
    textAlign: "center",
  },
  balloonCenterHeading: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontStyle: "italic",
    color: "#fdf6ff",
    fontSize: "clamp(24px, 6vw, 44px)",
    textShadow: "0 0 30px rgba(242,193,78,0.4)",
    animation: "pulseText 1.6s ease-in-out infinite",
  },

  /* ---------------- BIRTHDAY ---------------- */
  birthdayScreen: {
    position: "relative",
    width: "100%",
    minHeight: "100dvh",
    background: "radial-gradient(ellipse at 50% 0%, #4b2e7f 0%, #2c1a4d 45%, #120b22 100%)",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "6vh 4vw 8vh",
    boxSizing: "border-box",
  },
  birthdayContent: {
    position: "relative",
    zIndex: 5,
    width: "min(94vw, 560px)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  happyEyebrow: {
    color: "#f2c14e",
    letterSpacing: "0.4em",
    fontSize: "clamp(10px, 2vw, 14px)",
    margin: 0,
  },
  happyHeading: {
    fontFamily: "'Playfair Display', Georgia, serif",
    color: "#fdf6ff",
    fontSize: "clamp(34px, 9vw, 72px)",
    margin: "8px 0 0",
    lineHeight: 1.05,
    animation: "popIn 0.9s cubic-bezier(.2,1.4,.4,1) both",
  },
  happyHeadingAccent: {
    fontStyle: "italic",
    background: "linear-gradient(120deg, #f2c14e, #ff6fa5 60%, #c9a7f5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  happyNameHeading: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontStyle: "italic",
    color: "#ff6fa5",
    fontSize: "clamp(20px, 5vw, 34px)",
    margin: "6px 0 0",
    textShadow: "0 0 24px rgba(255,111,165,0.5)",
  },

  cakeWrap: {
    position: "relative",
    marginTop: "clamp(28px, 6vh, 50px)",
    width: "min(60vw, 220px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  candleStick: {
    width: 6,
    height: 26,
    background: "linear-gradient(180deg, #fff2b2, #f2c14e)",
    borderRadius: 3,
  },
  candleFlameHolder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: -2,
  },
  flame: {
    width: 12,
    height: 18,
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    background: "radial-gradient(circle at 50% 70%, #fff2b2 0%, #f2c14e 45%, #ff6f3c 100%)",
    marginBottom: 2,
    transition: "opacity 0.5s ease, transform 0.5s ease",
    boxShadow: "0 0 18px 6px rgba(255,159,104,0.6)",
  },
  cakeTopLayer: {
    position: "relative",
    width: "70%",
    height: 26,
    background: "linear-gradient(180deg,#fff2b2,#f2c14e)",
    borderRadius: "10px 10px 0 0",
    zIndex: 2,
  },
  sprinkle: {
    position: "absolute",
    top: 6,
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#ff6fa5",
  },
  cakeMidLayer: {
    width: "88%",
    height: 34,
    background: "linear-gradient(180deg,#ff9f68,#ff6fa5)",
    marginTop: -2,
    zIndex: 1,
  },
  cakeBaseLayer: {
    width: "100%",
    height: 40,
    background: "linear-gradient(180deg,#c9a7f5,#7a5bd6)",
    borderRadius: "0 0 10px 10px",
    marginTop: -2,
  },
  cakePlate: {
    width: "115%",
    height: 8,
    background: "rgba(253,246,255,0.85)",
    borderRadius: "50%",
    marginTop: 4,
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
  },

  blowButton: {
    marginTop: "clamp(20px, 4vh, 32px)",
    background: "rgba(253,246,255,0.08)",
    border: "1.5px solid rgba(253,246,255,0.4)",
    borderRadius: "999px",
    padding: "10px 20px",
    color: "#fdf6ff",
    fontSize: "clamp(13px, 2.4vw, 15px)",
    cursor: "pointer",
    fontWeight: 500,
  },
  wishGranted: {
    marginTop: "clamp(20px, 4vh, 32px)",
    color: "#f2c14e",
    fontSize: "clamp(13px, 2.4vw, 15px)",
    fontStyle: "italic",
    letterSpacing: "0.05em",
  },
  surpriseButton: {
    marginTop: "clamp(18px, 3.5vh, 26px)",
    background: "linear-gradient(120deg,#ff6fa5,#f2c14e)",
    border: "none",
    borderRadius: "999px",
    padding: "14px 26px",
    color: "#2c1a4d",
    fontSize: "clamp(14px, 2.6vw, 16px)",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 26px rgba(255,111,165,0.4)",
  },
  messageCard: {
    marginTop: "clamp(18px, 3.5vh, 26px)",
    background: "rgba(253,246,255,0.08)",
    border: "1.5px solid rgba(242,193,78,0.4)",
    borderRadius: 20,
    padding: "clamp(18px,4vw,28px)",
    backdropFilter: "blur(6px)",
  },
  messageText: {
    color: "#fdf6ff",
    fontSize: "clamp(14px, 2.6vw, 17px)",
    lineHeight: 1.7,
    margin: 0,
  },
  messageSign: {
    marginTop: 14,
    color: "#f2c14e",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontStyle: "italic",
    fontSize: "clamp(13px, 2.4vw, 16px)",
  },
};

/* ============================ GLOBAL CSS (keyframes, pseudo-elems, media queries) ============================ */

const globalCss = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=Poppins:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html, body { margin: 0; padding: 0; }

.stars-layer {
  background-image:
    radial-gradient(1.5px 1.5px at 10% 20%, rgba(255,255,255,0.8), transparent),
    radial-gradient(1.5px 1.5px at 80% 15%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 60% 40%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1.5px 1.5px at 45% 90%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 20% 50%, rgba(255,255,255,0.5), transparent);
  background-size: 100% 100%;
  animation: twinkle 3.5s ease-in-out infinite alternate;
}
@keyframes twinkle {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

.gate-door:active { filter: brightness(1.15); }

.tap-btn { animation: floatBtn 2.2s ease-in-out infinite; }
@keyframes floatBtn {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-6px); }
}

.keyhole-glow { animation: keyholePulse 1.8s ease-in-out infinite; }
@keyframes keyholePulse {
  0%, 100% { box-shadow: 0 0 30px 14px rgba(242,193,78,0.5); }
  50% { box-shadow: 0 0 46px 22px rgba(242,193,78,0.8); }
}

@keyframes pulseText {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.balloon {
  position: absolute;
  bottom: -160px;
  border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
  animation-name: floatUp;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
  box-shadow: inset -6px -6px 14px rgba(0,0,0,0.15), inset 6px 6px 14px rgba(255,255,255,0.25);
}
@keyframes floatUp {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 1; }
  50%  { transform: translateY(-60vh) translateX(var(--sway)); }
  100% { transform: translateY(-125vh) translateX(calc(var(--sway) * -1)); opacity: 1; }
}

.confetti { position: absolute; top: -5%; animation-name: confettiFall; animation-timing-function: linear; animation-iteration-count: infinite; }
.confetti-circle { border-radius: 50%; }
.confetti-square { border-radius: 2px; }
.confetti-rect { border-radius: 2px; }
@keyframes confettiFall {
  0%   { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
  8%   { opacity: 1; }
  100% { transform: translateY(115vh) rotate(360deg); opacity: 0.9; }
}

@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.7) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

.flame {
  animation: flicker 0.35s ease-in-out infinite alternate;
}
@keyframes flicker {
  0%   { transform: scale(1) rotate(-2deg); }
  100% { transform: scale(1.12) rotate(2deg); }
}

.blow-btn:hover, .surprise-btn:hover { filter: brightness(1.08); }
.blow-btn:active, .surprise-btn:active, .tap-btn:active { transform: scale(0.96); }

.message-card { animation: cardIn 0.6s cubic-bezier(.2,1.4,.4,1) both; }
@keyframes cardIn {
  0%   { opacity: 0; transform: scale(0.85) translateY(14px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

@media (max-width: 420px) {
  .balloon { filter: brightness(1.05); }
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
}
`;