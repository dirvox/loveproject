import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function UltimateGlassProposal() {
  const [envelopeState, setEnvelopeState] = useState('sealed'); // sealed, opening, opened, accepted
  const [maybeCount, setMaybeCount] = useState(0);

  const containerRef = useRef(null);
  const envelopeRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const waxSealRef = useRef(null);
  const paperContentRef = useRef(null);

  // Success confetti effect (heart particles)
  useEffect(() => {
    if (envelopeState === 'accepted') {
      const ctx = gsap.context(() => {
        const hearts = gsap.utils.toArray('.heart-confetti');
        hearts.forEach((heart) => {
          gsap.set(heart, {
            x: '50vw',
            y: '50vh',
            opacity: 1,
            scale: 'random(0.8, 2.5)',
          });
          gsap.to(heart, {
            x: `random(-50vw, 150vw)`,
            y: `random(-50vh, 150vh)`,
            opacity: 0,
            rotation: `random(-360, 360)`,
            duration: `random(2.5, 5)`,
            ease: "power3.out",
            delay: `random(0, 0.4)`
          });
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [envelopeState]);

  // Main opening animation sequence (PERFECTLY RESPONSIVE)
  const openLetter = () => {
    if (envelopeState !== 'sealed') return;

    setEnvelopeState('opening');
    
    const tl = gsap.timeline({
      onComplete: () => setEnvelopeState('opened')
    });

    // 1. Pop the wax seal
    tl.to(waxSealRef.current, { scale: 0, opacity: 0, duration: 0.4, ease: "back.in(2)" })
      
      // 2. Open the flap
      .to(flapRef.current, { rotationX: 180, duration: 0.6, ease: "power2.inOut" }, "-=0.1")
      .set(flapRef.current, { zIndex: 0 }) 
      
      // 3. Slide the letter up out of the envelope
      .to(letterRef.current, { yPercent: -120, duration: 0.8, ease: "power2.out" }, "-=0.2")
      
      // 4. Drop the envelope away completely
      .to(envelopeRef.current, { y: '100vh', scale: 0.5, opacity: 0, duration: 1, ease: "power3.inOut" }, "+=0.1")
      
      // 5. Transform the letter into a massive, centered Glass card
      .to(letterRef.current, { 
        position: 'fixed',
        top: '50%', 
        left: '50%', 
        xPercent: -50, 
        yPercent: -50,
        width: '90vw', 
        maxWidth: '450px',
        height: 'auto',
        minHeight: '60vh',
        padding: '2rem',
        borderRadius: '24px',
        boxShadow: '0 30px 60px -12px rgba(225, 29, 72, 0.5), inset 0 0 20px rgba(255,255,255,0.5)',
        duration: 0.8, 
        ease: "back.out(1.1)" 
      }, "-=0.6")
      
      // 6. Fade in the text inside the glass letter
      .fromTo(paperContentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.2");
  };

  const maybeMessages = [
    "Are you sure? 🥺",
    "Think about it again...",
    "But we'd look so cute!",
    "Okay, last chance!",
    "Maan jao na please..."
  ];

  const handleMaybe = () => {
    setMaybeCount(prev => (prev + 1) % maybeMessages.length);
    gsap.fromTo(".maybe-btn", { x: -8 }, { x: 8, duration: 0.1, repeat: 5, yoyo: true, ease: "linear" });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#ffd1df] via-[#ffb6c1] to-[#ff9a9e] flex items-center justify-center p-4 font-sans overflow-hidden relative selection:bg-rose-400 selection:text-white">
      
      {/* Import handwritten and modern fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Poppins:wght@300;400;600&display=swap');
          .font-handwritten { font-family: 'Dancing Script', cursive; }
          .font-modern { font-family: 'Poppins', sans-serif; }
          .envelope-perspective { perspective: 1500px; transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          
          /* Extreme Glassmorphism */
          .glass-panel {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-top: 1px solid rgba(255, 255, 255, 0.8);
            border-left: 1px solid rgba(255, 255, 255, 0.8);
          }
        `}
      </style>

      {/* Floating Animated Background Orbs for Deep Glass Reflection */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-white/40 mix-blend-overlay filter blur-[80px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-rose-500/30 mix-blend-multiply filter blur-[100px] animate-[pulse_8s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[30%] left-[60%] w-[40vw] h-[40vw] rounded-full bg-pink-400/40 mix-blend-screen filter blur-[90px] animate-[pulse_7s_ease-in-out_infinite]" />
      </div>

      {/* Main Centered Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        
        {/* === THE ENVELOPE === */}
        <div 
          ref={envelopeRef}
          className={`relative w-full max-w-[320px] aspect-[4/3] bg-rose-800 rounded-xl shadow-2xl envelope-perspective z-20 ${envelopeState === 'sealed' ? 'cursor-pointer hover:scale-105 transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(225,29,72,0.5)]' : ''}`} 
          onClick={openLetter}
        >
          
          {/* Back of Envelope (Inside) */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-800 to-rose-950 rounded-xl z-10 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ffb6c1_1px,_transparent_1px)] bg-[length:12px_12px]"></div>
          </div>

          {/* Top Flap */}
          <div ref={flapRef} className="absolute top-0 left-0 w-full h-[55%] bg-gradient-to-b from-rose-600 to-rose-700 rounded-t-xl origin-top z-40 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-t from-pink-100 to-pink-50 rounded-t-xl opacity-95 backface-hidden" style={{transform: 'rotateX(180deg)'}}>
              <div className="w-full h-full border-b-2 border-rose-300/50 border-dashed mt-3"></div>
            </div>
          </div>

          {/* Front V-Shapes */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="w-full h-full drop-shadow-xl">
              <path d="M0 0 L200 150 L400 0 L400 300 L0 300 Z" fill="#be123c" className="stroke-rose-900 stroke-[1]"/>
              <path d="M0 300 L200 150 L400 300 Z" fill="#9f1239" className="stroke-rose-950 stroke-[1]"/>
            </svg>
          </div>

          {/* The Romantic Wax Seal */}
          {envelopeState === 'sealed' && (
            <div ref={waxSealRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-red-600 to-red-900 border-[4px] border-red-950 shadow-[0_0_30px_rgba(159,18,57,0.8)] flex items-center justify-center z-50 transition-all duration-300 group-hover:scale-110">
              <span className="text-4xl md:text-5xl filter drop-shadow-lg text-white animate-pulse">❤️</span>
              <div className="absolute inset-2 border-2 border-red-400/30 rounded-full"></div>
            </div>
          )}

          {/* Hint Text */}
          {envelopeState === 'sealed' && (
            <p className="absolute -bottom-16 left-0 w-full text-center text-rose-700 font-modern font-bold tracking-[0.2em] uppercase text-xs md:text-sm animate-pulse z-0 drop-shadow-md">
              Tap the seal to open
            </p>
          )}
        </div>

        {/* === THE GLASS LETTER === */}
        {/* Initially hidden behind the envelope flap, waiting to slide up */}
        <div 
          ref={letterRef} 
          className="absolute z-10 w-[85%] max-w-[280px] h-[90%] glass-panel rounded-xl flex flex-col items-center justify-center overflow-hidden"
          style={{ top: '5%' }} 
        >
          <div ref={paperContentRef} className="opacity-0 flex flex-col items-center justify-between h-full w-full py-4 px-2">
            
            {/* Aesthetic Image */}
            <div className="w-28 h-28 md:w-32 md:h-32 mb-2 rounded-full overflow-hidden border-[4px] border-white/80 shadow-[0_8px_25px_rgba(225,29,72,0.3)] flex-shrink-0">
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGZnMDNvZXkwbng3ajJ4YXV5dXNxeGxvYzdxN2doMmR4M3NuM3R5OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yc2pHdAoxVOrJ2m5Ha/giphy.gif" 
                alt="Romantic mood" 
                className="w-full h-full object-cover"
              />
            </div>

            {envelopeState === 'accepted' ? (
              // --- SUCCESS CONTENT ---
              <div className="text-center flex flex-col justify-center flex-grow w-full animate-in fade-in zoom-in duration-700 px-4">
                <h1 className="font-handwritten text-5xl md:text-6xl font-bold text-rose-600 drop-shadow-md mb-2">
                  Yayyy! ❤️
                </h1>
                <p className="font-modern text-rose-950/80 text-base md:text-lg font-medium leading-relaxed">
                  You just made me the happiest person. I'll plan the perfect date for us! ✨
                </p>
              </div>
            ) : (
              // --- PROPOSAL CONTENT ---
              <div className="text-center flex flex-col items-center justify-between h-full w-full px-2 md:px-6">
                
                <div className="mt-2 mb-4">
                  <h1 className="font-handwritten text-4xl md:text-5xl lg:text-6xl font-bold text-rose-600 leading-tight drop-shadow-sm">
                    Will you be my <br/>Girlfriend?
                  </h1>
                </div>

                <p className="font-modern text-rose-950/70 text-sm md:text-base font-medium leading-relaxed mb-6">
                  I've been thinking about this a lot, and I really want you to be mine.
                </p>
                
                <div className="w-full space-y-3 mt-auto">
                  <button 
                    onClick={() => setEnvelopeState('accepted')}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-modern font-semibold text-lg hover:from-rose-600 hover:to-rose-700 hover:scale-[1.03] active:scale-95 transition-all shadow-[0_10px_25px_rgba(225,29,72,0.4)] border border-rose-400/50"
                  >
                    Yes, I Love You Too
                  </button>
                  <button 
                    onClick={handleMaybe}
                    className="maybe-btn w-full py-3 rounded-2xl bg-white/40 backdrop-blur-md text-rose-900 font-modern text-sm font-semibold hover:bg-white/60 transition-colors border border-white/60 shadow-sm"
                  >
                    {maybeMessages[maybeCount]}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Full-Screen Confetti Container */}
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => (
            <div key={i} className="heart-confetti absolute top-0 left-0 opacity-0 text-rose-500 text-3xl md:text-5xl filter drop-shadow-xl">❤️</div>
          ))}
        </div>

      </div>
    </div>
  );
}