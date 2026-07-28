import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ============================================================================
   ✏️  EDIT THIS SECTION — apni GF ki details yahan daalo
   ============================================================================ */
const CONFIG = {
  herName: 'Priya',                       // uska naam
  yourName: 'Devansh',                    // apna naam
  birthdayDateLabel: '28 July',           // sirf display ke liye, kisi bhi format mein
  wishMessage:
    "Tumhare jaisa dil pura duniya mein nahi milega. Aaj ka din sirf tumhare naam hai — har khushi, har muskaan, sab kuch tumhare liye. Happy Birthday, meri jaan! ✨",
  foodOptions: [
    { emoji: '🍕', label: 'Pizza' },
    { emoji: '🍛', label: 'Biryani' },
    { emoji: '🥟', label: 'Momos' },
    { emoji: '🍜', label: 'Pasta' },
    { emoji: '🍫', label: 'Chocolate Cake' },
    { emoji: '🍦', label: 'Ice Cream' },
  ],
  movieOptions: [
    { emoji: '💕', label: 'Romantic' },
    { emoji: '😂', label: 'Comedy' },
    { emoji: '😱', label: 'Horror' },
    { emoji: '🎬', label: 'Bollywood Drama' },
    { emoji: '🎭', label: 'Thriller' },
    { emoji: '✨', label: 'Animated' },
  ],
};
/* ========================================================================== */

const STEPS = ['gate', 'wish', 'cake', 'food', 'movie', 'final'];

export default function BirthdaySurpriseNew2() {
  const [step, setStep] = useState('gate');
  const [gateOpen, setGateOpen] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const starCanvasRef = useRef(null);
  const balloonCanvasRef = useRef(null);
  const confettiCanvasRef = useRef(null);

  const stepIndex = STEPS.indexOf(step);

  /* ---------------- Ambient twinkling starfield (always on) ---------------- */
  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.008,
    }));

    const render = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const twinkle = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 214, 240, ${0.15 + twinkle * 0.6})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------------- Balloon shower (runs during "wish" step) ---------------- */
  useEffect(() => {
    if (step !== 'wish') return;
    const canvas = balloonCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#ff6fa5', '#ffd166', '#c77dff', '#7ee8fa', '#ff9770'];
    const balloons = Array.from({ length: 16 }).map(() => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      size: Math.random() * 18 + 22,
      speed: Math.random() * 0.6 + 0.35,
      drift: Math.random() * 0.6 - 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      wobble: Math.random() * Math.PI * 2,
    }));

    const drawBalloon = (b) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      // string
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, b.size * 1.1);
      ctx.lineTo(0, b.size * 1.1 + 22);
      ctx.stroke();
      // balloon body
      ctx.beginPath();
      ctx.fillStyle = b.color;
      ctx.ellipse(0, 0, b.size * 0.72, b.size, 0, 0, Math.PI * 2);
      ctx.fill();
      // highlight
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.ellipse(-b.size * 0.22, -b.size * 0.35, b.size * 0.16, b.size * 0.24, 0, 0, Math.PI * 2);
      ctx.fill();
      // knot
      ctx.beginPath();
      ctx.fillStyle = b.color;
      ctx.moveTo(-4, b.size * 0.98);
      ctx.lineTo(4, b.size * 0.98);
      ctx.lineTo(0, b.size * 1.12);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      balloons.forEach((b) => {
        b.y -= b.speed;
        b.wobble += 0.02;
        b.x += Math.sin(b.wobble) * 0.4 + b.drift;
        if (b.y < -60) {
          b.y = canvas.height + 60;
          b.x = Math.random() * canvas.width;
        }
        drawBalloon(b);
      });
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [step]);

  /* ---------------- Confetti burst (fires once when candles are blown) ---------------- */
  const fireConfetti = useCallback(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff6fa5', '#ffd166', '#c77dff', '#7ee8fa', '#ff9770', '#ffffff'];
    const pieces = Array.from({ length: 140 }).map(() => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height * 0.55,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -14 - 4,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      spin: (Math.random() - 0.5) * 12,
      gravity: 0.35,
    }));

    let frame = 0;
    let raf;
    const render = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      if (frame < 130) {
        raf = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleOpenGate = () => {
    if (gateOpen) return;
    setGateOpen(true);
    setTimeout(() => setStep('wish'), 900);
  };

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    setTimeout(() => fireConfetti(), 500);
  };

  const goTo = (s) => setStep(s);

  const restart = () => {
    setGateOpen(false);
    setCandlesBlown(false);
    setSelectedFood(null);
    setSelectedMovie(null);
    setStep('gate');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Dancing+Script:wght@600&family=Poppins:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        @keyframes bowGlowPulse {
          0% { transform: scale(0.92); opacity: 0.6; }
          50% { transform: scale(1.12); opacity: 0.2; }
          100% { transform: scale(0.92); opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flicker {
          0%, 100% { transform: scaleY(1) translateX(0); opacity: 1; }
          25% { transform: scaleY(1.1) translateX(1px); opacity: 0.85; }
          50% { transform: scaleY(0.9) translateX(-1px); opacity: 1; }
          75% { transform: scaleY(1.05) translateX(1px); opacity: 0.9; }
        }
        @keyframes smokeRise {
          0% { transform: translateY(0) scale(0.6); opacity: 0.7; }
          100% { transform: translateY(-40px) scale(1.4); opacity: 0; }
        }
        @keyframes popIn {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #ffd166 0%, #ffffff 50%, #ffd166 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .bday-card {
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }

        .option-card {
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .option-card:hover { transform: translateY(-4px); }
        .option-card:active { transform: translateY(-1px) scale(0.98); }

        .primary-btn {
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .primary-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(255,111,165,0.45); }
        .primary-btn:active { transform: translateY(0) scale(0.97); }
        .primary-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

        @media (max-width: 600px) {
          .bow-center-seal { width: 108px !important; height: 108px !important; }
          .seal-names { font-size: 0.8rem !important; }
          .bow-loop { width: 28px !important; height: 46px !important; }
          .cake-scene { transform: scale(0.8); }
          .options-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div style={styles.app}>
        <canvas ref={starCanvasRef} style={styles.starCanvas} />
        <canvas ref={confettiCanvasRef} style={styles.confettiCanvas} />

        {/* progress dots once the gate is open */}
        {step !== 'gate' && (
          <div style={styles.progressRow}>
            {STEPS.slice(1).map((s, i) => (
              <span
                key={s}
                style={{
                  ...styles.progressDot,
                  background: i <= stepIndex - 1 ? '#ffd166' : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        )}

        {/* ---------------- STEP: GATE ---------------- */}
        {step === 'gate' && (
          <section style={styles.hero}>
            <div style={styles.heroBackdrop} />
            <div style={styles.gateContainer}>
              <div
                style={{
                  ...styles.gatePanel,
                  ...styles.gateLeft,
                  transform: gateOpen ? 'rotateY(-115deg)' : 'rotateY(0deg)',
                }}
              >
                <div style={styles.gateArchFrame} />
              </div>
              <div
                style={{
                  ...styles.gatePanel,
                  ...styles.gateRight,
                  transform: gateOpen ? 'rotateY(115deg)' : 'rotateY(0deg)',
                }}
              >
                <div style={styles.gateArchFrame} />
              </div>

              <div style={styles.ribbonWrapper}>
                <div
                  style={{
                    ...styles.ribbonBand,
                    left: 0,
                    transformOrigin: 'left center',
                    transform: gateOpen ? 'scaleX(0) rotate(-5deg)' : 'scaleX(1) rotate(0deg)',
                    opacity: gateOpen ? 0 : 1,
                  }}
                />
                <div
                  style={{
                    ...styles.ribbonBand,
                    right: 0,
                    transformOrigin: 'right center',
                    transform: gateOpen ? 'scaleX(0) rotate(5deg)' : 'scaleX(1) rotate(0deg)',
                    opacity: gateOpen ? 0 : 1,
                  }}
                />
                <div
                  onClick={handleOpenGate}
                  role="button"
                  tabIndex={0}
                  aria-label="Ribbon khol kar surprise dekho"
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenGate()}
                  style={{
                    ...styles.ribbonBowContainer,
                    transform: gateOpen ? 'scale(0) rotate(90deg)' : 'scale(1) rotate(0deg)',
                    opacity: gateOpen ? 0 : 1,
                  }}
                >
                  <div style={styles.bowPulseRing} />
                  <div style={styles.bowKnot}>
                    <div className="bow-loop" style={{ ...styles.bowLoop, transform: 'rotate(-38deg) translateX(8px)' }} />
                    <div className="bow-center-seal" style={styles.bowCenterSeal}>
                      <span className="seal-names" style={styles.sealNames}>{CONFIG.herName}</span>
                    </div>
                    <div className="bow-loop" style={{ ...styles.bowLoop, transform: 'rotate(38deg) translateX(-8px)' }} />
                  </div>
                  <div style={styles.gateCtaPrompt}>Tap to Untie 🎀</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ---------------- STEP: WISH ---------------- */}
        {step === 'wish' && (
          <section style={styles.centerScene}>
            <canvas ref={balloonCanvasRef} style={styles.balloonCanvas} />
            <div className="bday-card" style={styles.card}>
              <p style={styles.eyebrow}>✦ {CONFIG.birthdayDateLabel} ✦</p>
              <h1 style={styles.title}>
                Happy Birthday<br />
                <span className="shimmer-text" style={styles.scriptName}>{CONFIG.herName}</span>
              </h1>
              <p style={styles.wishText}>{CONFIG.wishMessage}</p>
              <p style={styles.fromText}>— with all my love, {CONFIG.yourName}</p>
              <button className="primary-btn" style={styles.goldBtn} onClick={() => goTo('cake')}>
                Aage Badho →
              </button>
            </div>
          </section>
        )}

        {/* ---------------- STEP: CAKE ---------------- */}
        {step === 'cake' && (
          <section style={styles.centerScene}>
            <div className="bday-card" style={styles.card}>
              <h2 style={styles.subtitle}>Ek wish maango aur candles bujhao 🕯️</h2>

              <div className="cake-scene" style={styles.cakeWrapper}>
                <div style={styles.candlesRow}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} style={styles.candle}>
                      {!candlesBlown ? (
                        <span style={{ ...styles.flame, animationDelay: `${i * 0.15}s` }} />
                      ) : (
                        <span style={styles.smoke} />
                      )}
                    </div>
                  ))}
                </div>
                <div style={styles.cakeTierTop} />
                <div style={styles.cakeDrip} />
                <div style={styles.cakeTierBottom} />
                <div style={styles.cakePlate} />
              </div>

              {!candlesBlown ? (
                <button className="primary-btn" style={styles.goldBtn} onClick={handleBlowCandles}>
                  💨 Candles Bujhao
                </button>
              ) : (
                <div style={{ animation: 'popIn 0.5s ease both' }}>
                  <p style={styles.wishGranted}>Wish granted! Ab woh zaroor puri hogi 🎉</p>
                  <button className="primary-btn" style={styles.goldBtn} onClick={() => goTo('food')}>
                    Aage Badho →
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ---------------- STEP: FOOD ---------------- */}
        {step === 'food' && (
          <section style={styles.centerScene}>
            <div className="bday-card" style={styles.card}>
              <h2 style={styles.subtitle}>Aaj khaane mein kya mann hai? 🍽️</h2>
              <div className="options-grid" style={styles.optionsGrid}>
                {CONFIG.foodOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className="option-card"
                    onClick={() => setSelectedFood(opt.label)}
                    style={{
                      ...styles.optionCard,
                      ...(selectedFood === opt.label ? styles.optionCardActive : {}),
                    }}
                  >
                    <span style={styles.optionEmoji}>{opt.emoji}</span>
                    <span style={styles.optionLabel}>{opt.label}</span>
                  </div>
                ))}
              </div>
              <button
                className="primary-btn"
                style={styles.goldBtn}
                disabled={!selectedFood}
                onClick={() => goTo('movie')}
              >
                Aage Badho →
              </button>
            </div>
          </section>
        )}

        {/* ---------------- STEP: MOVIE ---------------- */}
        {step === 'movie' && (
          <section style={styles.centerScene}>
            <div className="bday-card" style={styles.card}>
              <h2 style={styles.subtitle}>Aaj kaunsi movie dekhni hai? 🎬</h2>
              <div className="options-grid" style={styles.optionsGrid}>
                {CONFIG.movieOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className="option-card"
                    onClick={() => setSelectedMovie(opt.label)}
                    style={{
                      ...styles.optionCard,
                      ...(selectedMovie === opt.label ? styles.optionCardActive : {}),
                    }}
                  >
                    <span style={styles.optionEmoji}>{opt.emoji}</span>
                    <span style={styles.optionLabel}>{opt.label}</span>
                  </div>
                ))}
              </div>
              <button
                className="primary-btn"
                style={styles.goldBtn}
                disabled={!selectedMovie}
                onClick={() => goTo('final')}
              >
                Aage Badho →
              </button>
            </div>
          </section>
        )}

        {/* ---------------- STEP: FINAL ---------------- */}
        {step === 'final' && (
          <section style={styles.centerScene}>
            <div className="bday-card" style={styles.card}>
              <p style={styles.eyebrow}>✦ Perfect Plan Ready ✦</p>
              <h2 style={styles.subtitle}>Toh aaj ka plan hua:</h2>
              <div style={styles.summaryBox}>
                <p style={styles.summaryLine}>🍽️ Khaana: <strong>{selectedFood}</strong></p>
                <p style={styles.summaryLine}>🎬 Movie: <strong>{selectedMovie}</strong></p>
              </div>
              <p style={styles.wishText}>
                Ab bas relax karo, aaj ka din pura tumhare naam hai. Happy Birthday phir se, {CONFIG.herName}! 💖
              </p>
              <button className="primary-btn" style={styles.goldBtnOutline} onClick={restart}>
                ↺ Dobara Dekho
              </button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

/* ============================================================================
   Styles
   ============================================================================ */
const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
const FONT_SCRIPT = "'Dancing Script', cursive";
const FONT_BODY = "'Poppins', sans-serif";

const styles = {
  app: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    background: 'radial-gradient(circle at 50% 20%, #2b1055 0%, #190933 55%, #0d051c 100%)',
    overflow: 'hidden',
    fontFamily: FONT_BODY,
    color: '#fff',
  },
  starCanvas: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
  },
  confettiCanvas: {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    pointerEvents: 'none',
  },
  balloonCanvas: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  progressRow: {
    position: 'fixed',
    top: '18px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 20,
  },
  progressDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background 0.4s ease',
  },

  /* ---- gate ---- */
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBackdrop: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, rgba(255,111,165,0.15) 0%, transparent 65%)',
    zIndex: 1,
  },
  gateContainer: {
    position: 'absolute',
    inset: 0,
    zIndex: 5,
    perspective: '1400px',
    display: 'flex',
  },
  gatePanel: {
    position: 'absolute',
    top: 0,
    width: '50%',
    height: '100%',
    background: 'linear-gradient(145deg, #3a1466 0%, #1c0838 100%)',
    border: '4px solid #ffd166',
    boxSizing: 'border-box',
    transition: 'transform 2s cubic-bezier(0.77,0,0.175,1)',
    transformStyle: 'preserve-3d',
  },
  gateLeft: { left: 0, transformOrigin: 'left center', borderRight: '2px solid #ffd166' },
  gateRight: { right: 0, transformOrigin: 'right center', borderLeft: '2px solid #ffd166' },
  gateArchFrame: {
    position: 'absolute',
    inset: '20px',
    border: '2px solid rgba(255,209,102,0.5)',
    borderRadius: '180px 180px 0 0',
  },
  ribbonWrapper: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '80px',
    transform: 'translateY(-50%)',
    zIndex: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  ribbonBand: {
    position: 'absolute',
    height: '55px',
    width: '50%',
    background: 'linear-gradient(180deg, #ff6fa5 0%, #c77dff 50%, #5b1a8f 100%)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.35)',
    borderTop: '2px solid #ffd166',
    borderBottom: '2px solid #ffd166',
    transition: 'transform 1.2s cubic-bezier(0.7,0,0.84,0), opacity 1s ease',
  },
  ribbonBowContainer: {
    position: 'relative',
    zIndex: 9,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.9s cubic-bezier(0.68,-0.55,0.265,1.55), opacity 0.7s ease',
    outline: 'none',
    pointerEvents: 'auto',
  },
  bowPulseRing: {
    position: 'absolute',
    inset: '-15px',
    borderRadius: '50%',
    border: '2px solid #ffd166',
    animation: 'bowGlowPulse 2.5s infinite ease-in-out',
    pointerEvents: 'none',
  },
  bowKnot: { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  bowLoop: {
    width: '48px',
    height: '70px',
    background: 'linear-gradient(135deg, #ff6fa5, #c77dff)',
    border: '2px solid #ffd166',
    borderRadius: '50% 50% 12% 12%',
    boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
  },
  bowCenterSeal: {
    position: 'relative',
    zIndex: 2,
    width: '135px',
    height: '135px',
    background: 'radial-gradient(circle, #fff3d1 0%, #ffd166 60%, #b8860b 100%)',
    border: '3px solid #ffffff',
    borderRadius: '50%',
    boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3a0d5e',
    textAlign: 'center',
    padding: '10px',
  },
  sealNames: { fontSize: '1rem', fontWeight: 'bold', fontFamily: FONT_DISPLAY },
  gateCtaPrompt: {
    marginTop: '95px',
    fontSize: '0.85rem',
    color: '#ffe082',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: 600,
  },

  /* ---- shared card scenes ---- */
  centerScene: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '90px 16px 40px',
    zIndex: 2,
  },
  card: {
    position: 'relative',
    zIndex: 3,
    width: '100%',
    maxWidth: '560px',
    textAlign: 'center',
    background: 'rgba(43, 16, 85, 0.55)',
    backdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,209,102,0.35)',
    borderRadius: '28px',
    padding: 'clamp(24px, 5vw, 48px) clamp(18px, 4vw, 36px)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  },
  eyebrow: {
    color: '#ffd166',
    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
    letterSpacing: '3px',
    marginBottom: '0.8rem',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(2rem, 6vw, 3.2rem)',
    lineHeight: 1.15,
    margin: '0 0 1.2rem',
  },
  scriptName: {
    fontFamily: FONT_SCRIPT,
    fontSize: 'clamp(2.4rem, 8vw, 4rem)',
  },
  subtitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
    marginBottom: '1.4rem',
  },
  wishText: {
    fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
    lineHeight: 1.7,
    color: '#f0e6ff',
    marginBottom: '1rem',
  },
  fromText: {
    fontFamily: FONT_SCRIPT,
    fontSize: '1.3rem',
    color: '#ffd166',
    marginBottom: '2rem',
  },
  wishGranted: {
    fontSize: '1.1rem',
    color: '#ffe082',
    marginBottom: '1.4rem',
    fontWeight: 600,
  },
  goldBtn: {
    display: 'inline-block',
    padding: '14px 34px',
    background: 'linear-gradient(135deg, #ffe082 0%, #ffd166 50%, #c9932e 100%)',
    color: '#2b1055',
    fontWeight: 700,
    fontSize: '0.95rem',
    border: 'none',
    letterSpacing: '0.5px',
    borderRadius: '30px',
    boxShadow: '0 6px 20px rgba(255,209,102,0.35)',
  },
  goldBtnOutline: {
    display: 'inline-block',
    padding: '13px 32px',
    background: 'transparent',
    color: '#ffd166',
    fontWeight: 700,
    fontSize: '0.95rem',
    border: '2px solid #ffd166',
    letterSpacing: '0.5px',
    borderRadius: '30px',
  },

  /* ---- cake ---- */
  cakeWrapper: {
    position: 'relative',
    width: '220px',
    height: '210px',
    margin: '0 auto 2rem',
  },
  candlesRow: {
    position: 'absolute',
    top: '-38px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '18px',
    zIndex: 3,
  },
  candle: {
    position: 'relative',
    width: '6px',
    height: '30px',
    background: 'linear-gradient(180deg, #fff3d1, #ffd166)',
    borderRadius: '2px',
  },
  flame: {
    position: 'absolute',
    top: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '9px',
    height: '16px',
    background: 'radial-gradient(circle, #fff7cc 0%, #ffb703 55%, #ff6b00 100%)',
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    boxShadow: '0 0 12px rgba(255,183,3,0.9)',
    animation: 'flicker 0.5s ease-in-out infinite',
  },
  smoke: {
    position: 'absolute',
    top: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '6px',
    height: '10px',
    background: 'rgba(220,220,220,0.6)',
    borderRadius: '50%',
    animation: 'smokeRise 1.6s ease-out infinite',
  },
  cakeTierTop: {
    position: 'absolute',
    top: '30px',
    left: '35px',
    right: '35px',
    height: '80px',
    background: 'linear-gradient(180deg, #ff9fc4 0%, #ff6fa5 100%)',
    borderRadius: '14px 14px 6px 6px',
    boxShadow: 'inset 0 -8px 0 rgba(255,255,255,0.15)',
    zIndex: 2,
  },
  cakeDrip: {
    position: 'absolute',
    top: '100px',
    left: '30px',
    right: '30px',
    height: '20px',
    background: '#fff3d1',
    borderRadius: '0 0 40% 40% / 0 0 100% 100%',
    zIndex: 2,
  },
  cakeTierBottom: {
    position: 'absolute',
    top: '110px',
    left: '10px',
    right: '10px',
    height: '80px',
    background: 'linear-gradient(180deg, #c77dff 0%, #9d4edd 100%)',
    borderRadius: '10px',
    boxShadow: 'inset 0 -10px 0 rgba(255,255,255,0.12)',
    zIndex: 1,
  },
  cakePlate: {
    position: 'absolute',
    bottom: '0',
    left: '-10px',
    right: '-10px',
    height: '14px',
    background: 'linear-gradient(180deg, #ffe082, #c9932e)',
    borderRadius: '50%',
  },

  /* ---- options ---- */
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '1.8rem',
  },
  optionCard: {
    background: 'rgba(255,255,255,0.06)',
    border: '2px solid rgba(255,255,255,0.15)',
    borderRadius: '16px',
    padding: '16px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  optionCardActive: {
    border: '2px solid #ffd166',
    background: 'rgba(255,209,102,0.15)',
    boxShadow: '0 8px 20px rgba(255,209,102,0.25)',
  },
  optionEmoji: { fontSize: '1.8rem' },
  optionLabel: { fontSize: '0.8rem', fontWeight: 500 },

  /* ---- summary ---- */
  summaryBox: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '16px',
    padding: '18px',
    marginBottom: '1.6rem',
  },
  summaryLine: {
    fontSize: '1rem',
    margin: '6px 0',
  },
};