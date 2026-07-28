import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// Pre-defined attractive images from Unsplash for cards
const FOOD_OPTIONS = [
  { id: 'italian', label: 'Italian & Pasta', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80' },
  { id: 'sushi', label: 'Sushi Date', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&q=80' },
  { id: 'pizza', label: 'Pizza & Chill', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80' },
  { id: 'tacos', label: 'Tacos & Margs', img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&q=80' },
];

const MOVIE_OPTIONS = [
  { id: 'romcom', label: 'Romantic Comedy', img: 'https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9b?w=300&q=80' },
  { id: 'horror', label: 'Horror / Spooky', img: 'https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=300&q=80' },
  { id: 'scifi', label: 'Sci-Fi / Marvel', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&q=80' },
  { id: 'comedy', label: 'Pure Comedy', img: 'https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?w=300&q=80' },
];

export default function BirthdaySurprise() {
  const [gateOpen, setGateOpen] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [planSubmitted, setPlanSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '',
    food: '',
    movie: ''
  });

  const canvasRef = useRef(null);
  const gateTextRef = useRef(null);
  const formContainerRef = useRef(null);
  const balloonsRef = useRef(null);

  // GSAP: Animate the text on the gate
  useEffect(() => {
    if (gateTextRef.current) {
      gsap.fromTo(
        gateTextRef.current.children,
        { y: 10, opacity: 0.5, scale: 0.9 },
        { 
          y: -5, 
          opacity: 1, 
          scale: 1.1, 
          duration: 1.5, 
          yoyo: true, 
          repeat: -1, 
          stagger: 0.2, 
          ease: "sine.inOut" 
        }
      );
    }
  }, []);

  // GSAP: Animate floating balloons when gate opens
  useEffect(() => {
    if (gateOpen && balloonsRef.current) {
      gsap.to(balloonsRef.current.children, {
        y: () => `-=${Math.random() * 30 + 20}`,
        x: () => `${Math.random() * 20 - 10}`,
        rotation: () => `${Math.random() * 10 - 5}`,
        duration: () => Math.random() * 2 + 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }
  }, [gateOpen]);

  // GSAP: Animate cards when the planner step is active
  useEffect(() => {
    if (candlesBlown && !planSubmitted && formContainerRef.current) {
      gsap.fromTo(
        ".choice-card",
        { opacity: 0, y: 40, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }
      );
    }
  }, [candlesBlown, planSubmitted]);

  // Canvas Confetti System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const confettiColors = ['#FF4081', '#00E5FF', '#FFEA00', '#B042FF', '#FF0055'];
    const confetti = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 6 + 4,
      speedY: Math.random() * 2 + 1,
      speedX: Math.random() * 2 - 1,
      angle: Math.random() * 360,
      spin: Math.random() * 3 - 1.5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y / 50) + p.speedX;
        p.angle += p.spin;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.fillRect(-p.size / 2, -p.size, p.size, p.size * 2);
        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleOpenGate = () => {
    if (!gateOpen) setGateOpen(true);
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
  };

  const handleSubmitPlan = (e) => {
    e.preventDefault();
    if (!formData.food || !formData.movie || !formData.date) {
      alert("Please select a date, food, and movie for our special day! ❤️");
      return;
    }
    setPlanSubmitted(true);
  };

  const updateSelection = (type, value) => {
    setFormData(prev => ({ ...prev, [type]: value }));
    gsap.fromTo(`.card-${value}`, 
      { scale: 0.95 }, 
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
    );
  };

  return (
    <>
      <style>{`
        @keyframes bowGlowPulse {
          0% { transform: scale(0.92); opacity: 0.6; box-shadow: 0 0 15px rgba(255, 64, 129, 0.4); }
          50% { transform: scale(1.12); opacity: 0.2; box-shadow: 0 0 35px rgba(255, 64, 129, 0.9); }
          100% { transform: scale(0.92); opacity: 0.6; box-shadow: 0 0 15px rgba(255, 64, 129, 0.4); }
        }
        @keyframes flameFlicker {
          0%, 100% { transform: scale(1) rotate(-1deg); opacity: 0.9; }
          50% { transform: scale(1.1) rotate(2deg); opacity: 1; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #FF4081 0%, #ffffff 50%, #FF4081 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: goldShimmer 4s linear infinite;
        }
        @keyframes goldShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        input[type="date"] {
          width: 100%;
          padding: 12px;
          margin-bottom: 25px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 1rem;
          box-sizing: border-box;
          font-family: inherit;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
        input:focus {
          outline: none;
          border-color: #FF4081;
          box-shadow: 0 0 8px rgba(255, 64, 129, 0.5);
        }
        /* Custom Scrollbar for cards container */
        .cards-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .cards-scroll::-webkit-scrollbar-thumb {
          background: #FF4081;
          border-radius: 10px;
        }
      `}</style>

      <section style={styles.hero}>
        <div style={styles.heroBackdrop} />
        <canvas ref={canvasRef} style={styles.petalCanvas} />

        {/* 🎈 Floating Balloons (Visible when gate opens) */}
        <div 
          ref={balloonsRef} 
          style={{
            ...styles.balloonsContainer,
            opacity: gateOpen ? 1 : 0,
            pointerEvents: 'none'
          }}
        >
          <div style={{...styles.balloon, background: '#FF4081', left: '10%'}}></div>
          <div style={{...styles.balloon, background: '#00E5FF', left: '25%', top: '20%'}}></div>
          <div style={{...styles.balloon, background: '#FFEA00', left: '75%', top: '15%'}}></div>
          <div style={{...styles.balloon, background: '#B042FF', left: '85%'}}></div>
          <div style={{...styles.balloon, background: '#FF0055', left: '50%', top: '-5%'}}></div>
        </div>

        {/* 3D Gate Wrapper */}
        <div style={{ ...styles.gateContainer, pointerEvents: gateOpen ? 'none' : 'auto' }}>
          <div style={{ ...styles.gatePanel, ...styles.gateLeft, transform: gateOpen ? 'rotateY(-115deg)' : 'rotateY(0deg)' }}>
            <div style={styles.gateArchFrame} />
            <div style={styles.gateJaliPattern} />
          </div>
          <div style={{ ...styles.gatePanel, ...styles.gateRight, transform: gateOpen ? 'rotateY(115deg)' : 'rotateY(0deg)' }}>
            <div style={styles.gateArchFrame} />
            <div style={styles.gateJaliPattern} />
          </div>

          {/* Ceremonial Silk Ribbon Overlay */}
          <div style={styles.ribbonWrapper}>
            <div style={{ ...styles.ribbonBand, left: 0, transformOrigin: 'left center', transform: gateOpen ? 'scaleX(0) rotate(-5deg)' : 'scaleX(1) rotate(0deg)', opacity: gateOpen ? 0 : 1 }} />
            <div style={{ ...styles.ribbonBand, right: 0, transformOrigin: 'right center', transform: gateOpen ? 'scaleX(0) rotate(5deg)' : 'scaleX(1) rotate(0deg)', opacity: gateOpen ? 0 : 1 }} />

            <div
              onClick={handleOpenGate}
              style={{ ...styles.ribbonBowContainer, transform: gateOpen ? 'scale(0) rotate(90deg)' : 'scale(1) rotate(0deg)', opacity: gateOpen ? 0 : 1 }}
            >
              <div style={styles.bowPulseRing} />
              <div style={styles.bowKnot}>
                <div style={{ ...styles.bowLoop, transform: 'rotate(-38deg) translateX(8px)' }} />
                <div style={styles.bowCenterSeal}>
                  <div ref={gateTextRef} style={styles.sealNamesContainer}>
                    <span style={styles.sealNames}>Open</span>
                    <span style={styles.sealNames}>For</span>
                    <span style={styles.sealNames}>Magic</span>
                  </div>
                </div>
                <div style={{ ...styles.bowLoop, transform: 'rotate(38deg) translateX(-8px)' }} />
              </div>
              <div style={{ marginTop: '50px', fontSize: '0.85rem', color: '#FFB2EB', letterSpacing: '2px', textTransform: 'uppercase', textShadow: '0 2px 6px rgba(0,0,0,0.9)', fontWeight: 600 }}>Tap to Open</div>
            </div>
          </div>
        </div>

        {/* Revealed Content Card */}
        <div
          style={{
            ...styles.heroContent,
            opacity: gateOpen ? 1 : 0,
            transform: gateOpen ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(30px)',
            pointerEvents: gateOpen ? 'auto' : 'none',
          }}
        >
          <div style={styles.invitationCard}>
            
            {!candlesBlown ? (
              // STEP 1: Cake & Wishes
              <div>
                <h3 style={styles.heroEyebrow}>✦ IT'S YOUR SPECIAL DAY ✦</h3>
                <h1 style={styles.heroTitle}>Happy Birthday <span className="shimmer-text">Gorgeous!</span></h1>
                <p style={styles.heroSub}>Make a wish and blow out the candles to unlock your surprise!</p>
                
                <div style={styles.cakeContainer}>
                  <div style={{ display: 'flex', justifyContent: 'center', height: '40px', alignItems: 'flex-end' }}>
                    <div style={styles.candle}><div style={styles.flame}></div></div>
                    <div style={{...styles.candle, margin: '0 10px'}}><div style={styles.flame}></div></div>
                    <div style={styles.candle}><div style={styles.flame}></div></div>
                  </div>
                  <div style={{ fontSize: '6rem', lineHeight: '1', marginTop: '-15px', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}>🎂</div>
                </div>

                <button onClick={handleBlowCandles} style={styles.btnAction}>
                  💨 Blow Candles
                </button>
              </div>
            ) : !planSubmitted ? (
              // STEP 2: Date Planner with Image Cards
              <div ref={formContainerRef} style={{ width: '100%' }}>
                <h2 style={{ fontSize: '1.8rem', color: '#FF80AB', marginBottom: '5px', marginTop: 0 }}>Yay! Let's Plan Your Date ❤️</h2>
                <p style={{...styles.heroSub, marginBottom: '20px'}}>You are the birthday queen. Pick what we're doing!</p>
                
                <form onSubmit={handleSubmitPlan} style={{ textAlign: 'left', width: '100%' }}>
                  
                  <label style={styles.label}>When are we celebrating?</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />

                  <label style={styles.label}>What are we eating? 🍕</label>
                  <div className="cards-scroll" style={styles.cardsScrollContainer}>
                    {FOOD_OPTIONS.map((item) => (
                      <div 
                        key={item.id} 
                        className={`choice-card card-${item.id}`}
                        onClick={() => updateSelection('food', item.id)}
                        style={{
                          ...styles.cardImage, 
                          backgroundImage: `url(${item.img})`,
                          border: formData.food === item.id ? '3px solid #FF4081' : '2px solid transparent',
                          boxShadow: formData.food === item.id ? '0 0 15px rgba(255,64,129,0.8)' : 'none'
                        }}
                      >
                        <div style={styles.cardOverlay}>{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <label style={{...styles.label, marginTop: '20px'}}>Which movie genre? 🍿</label>
                  <div className="cards-scroll" style={styles.cardsScrollContainer}>
                    {MOVIE_OPTIONS.map((item) => (
                      <div 
                        key={item.id} 
                        className={`choice-card card-${item.id}`}
                        onClick={() => updateSelection('movie', item.id)}
                        style={{
                          ...styles.cardImage, 
                          backgroundImage: `url(${item.img})`,
                          border: formData.movie === item.id ? '3px solid #FF4081' : '2px solid transparent',
                          boxShadow: formData.movie === item.id ? '0 0 15px rgba(255,64,129,0.8)' : 'none'
                        }}
                      >
                        <div style={styles.cardOverlay}>{item.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '25px' }}>
                    <button type="submit" style={styles.btnAction}>
                      Confirm Our Date 🥰
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // STEP 3: Confirmation
              <div style={{ animation: 'floatUp 0.6s ease reverse' }}>
                <h1 style={styles.heroTitle}>It's a Date! 🎉</h1>
                <p style={styles.heroSub}>
                  I can't wait to celebrate with you on <b>{formData.date}</b>. <br/><br/>
                  Get ready for some amazing <b>{FOOD_OPTIONS.find(f => f.id === formData.food)?.label}</b> and snuggles while we watch a <b>{MOVIE_OPTIONS.find(m => m.id === formData.movie)?.label}</b> movie. <br/><br/>
                  I love you so much! Have the best birthday ever! ❤️
                </p>
                <div style={{ fontSize: '4rem', margin: '20px 0' }}>💌🧸💐</div>
              </div>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
}

/* ==========================================================================
   Styles Object 
   ========================================================================== */
const styles = {
  hero: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a0510',
    color: '#ffffff',
    boxSizing: 'border-box',
    fontFamily: '"Georgia", "Times New Roman", serif',
  },
  heroBackdrop: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, #4a0d26 0%, #200411 60%, #0d0106 100%)',
    zIndex: 1,
  },
  petalCanvas: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    pointerEvents: 'none',
  },
  balloonsContainer: {
    position: 'absolute',
    top: '10%',
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
    display: 'flex',
    justifyContent: 'space-between',
  },
  balloon: {
    position: 'absolute',
    width: '60px',
    height: '75px',
    borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
    boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.3), inset 5px 5px 15px rgba(255,255,255,0.4)',
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
    background: 'linear-gradient(145deg, #4a152e 0%, #1f0712 100%)',
    border: '4px solid #FF80AB',
    boxSizing: 'border-box',
    transition: 'transform 2.2s cubic-bezier(0.77, 0, 0.175, 1)',
    transformStyle: 'preserve-3d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 0 80px rgba(0,0,0,0.9)',
  },
  gateLeft: { left: 0, transformOrigin: 'left center', borderRight: '2px solid #FF80AB' },
  gateRight: { right: 0, transformOrigin: 'right center', borderLeft: '2px solid #FF80AB' },
  gateArchFrame: {
    position: 'absolute',
    inset: '20px',
    border: '2px solid rgba(255, 128, 171, 0.5)',
    borderRadius: '180px 180px 0 0',
    pointerEvents: 'none',
  },
  gateJaliPattern: {
    position: 'absolute',
    inset: '30px',
    border: '1px dashed rgba(255, 128, 171, 0.3)',
    borderRadius: '160px 160px 0 0',
    backgroundImage: 'radial-gradient(#FF80AB 1px, transparent 1px)',
    backgroundSize: '30px 30px',
    opacity: 0.15,
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
  },
  ribbonBand: {
    position: 'absolute',
    height: '45px',
    width: '50%',
    background: 'linear-gradient(180deg, #F50057 0%, #C51162 50%, #880E4F 100%)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
    borderTop: '1px solid #FF80AB',
    borderBottom: '1px solid #FF80AB',
    transition: 'transform 1.4s cubic-bezier(0.7, 0, 0.84, 0), opacity 1.2s ease',
  },
  ribbonBowContainer: {
    position: 'relative',
    zIndex: 9,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.8s ease',
  },
  bowPulseRing: {
    position: 'absolute',
    inset: '-15px',
    borderRadius: '50%',
    border: '2px solid #FF80AB',
    animation: 'bowGlowPulse 2.5s infinite ease-in-out',
  },
  bowKnot: { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  bowLoop: {
    width: '48px',
    height: '70px',
    background: 'linear-gradient(135deg, #FF4081, #C51162)',
    border: '2px solid #FFB2EB',
    borderRadius: '50% 50% 12% 12%',
    boxShadow: '0 6px 12px rgba(0,0,0,0.5)',
  },
  bowCenterSeal: {
    position: 'relative',
    zIndex: 2,
    width: '120px',
    height: '120px',
    background: 'radial-gradient(circle, #FFE4E1 0%, #FF80AB 60%, #C51162 100%)',
    border: '3px solid #ffffff',
    borderRadius: '50%',
    boxShadow: '0 8px 25px rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4a0d26',
  },
  sealNamesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sealNames: {
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: '2px 0',
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    transition: 'opacity 1.4s ease 0.6s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
    padding: '0 20px',
    maxWidth: '600px',
    width: '100%',
    boxSizing: 'border-box',
  },
  invitationCard: {
    background: 'rgba(30, 8, 18, 0.85)',
    backdropFilter: 'blur(12px)',
    border: '2px solid rgba(255, 128, 171, 0.4)',
    padding: 'clamp(20px, 4vw, 40px)',
    borderRadius: '24px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heroEyebrow: { color: '#FF80AB', fontSize: 'clamp(0.85rem, 2vw, 1rem)', letterSpacing: '3px', marginBottom: '1rem' },
  heroTitle: { fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#ffffff', marginBottom: '0.8rem', marginTop: 0 },
  heroSub: { fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)', color: '#e0e0e0', lineHeight: 1.6 },
  cakeContainer: { margin: '30px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  candle: {
    width: '10px', height: '40px',
    background: 'repeating-linear-gradient(45deg, #fff, #fff 5px, #FF4081 5px, #FF4081 10px)',
    borderRadius: '4px', position: 'relative'
  },
  flame: {
    position: 'absolute', top: '-22px', right: '-2px', transform: 'translateX(-50%)',
    width: '14px', height: '22px', background: '#FFD700',
    borderRadius: '50% 50% 20% 20%', boxShadow: '0 0 15px #FFD700, 0 0 30px #FF8C00',
    animation: 'flameFlicker 0.1s ease infinite alternate'
  },
  btnAction: {
    display: 'inline-block', padding: '14px 36px',
    background: 'linear-gradient(135deg, #FF4081 0%, #F50057 50%, #C51162 100%)',
    color: '#ffffff', fontWeight: 'bold', fontSize: '1rem',
    border: 'none', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase',
    borderRadius: '30px', boxShadow: '0 6px 20px rgba(255, 64, 129, 0.4)', transition: 'transform 0.2s',
  },
  label: { fontSize: '0.9rem', color: '#FFB2EB', marginBottom: '10px', fontWeight: 'bold', display: 'block', letterSpacing: '0.5px' },
  cardsScrollContainer: {
    display: 'flex',
    gap: '15px',
    overflowX: 'auto',
    paddingBottom: '15px',
    marginBottom: '10px',
    scrollSnapType: 'x mandatory',
  },
  cardImage: {
    minWidth: '140px',
    height: '140px',
    borderRadius: '16px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    scrollSnapAlign: 'start',
    transition: 'transform 0.2s',
    flexShrink: 0,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
    color: '#fff',
    padding: '10px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    textAlign: 'center'
  }
};