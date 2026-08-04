import React, { useState, useRef, useEffect } from 'react';

export default function LovelyHinglishProposal() {
  const [isAccepted, setIsAccepted] = useState(false);
  
  // States for the No button dodging
  const [noStyle, setNoStyle] = useState({ position: 'relative' });
  
  // States for the Yes button Hold interaction
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  // --- 1. DODGING LOGIC FOR "NO" BUTTON ---
  const handleNoDodge = (e) => {
    e.preventDefault();
    
    // Get screen sizes, keeping a safe margin so the button doesn't go off-screen
    const maxX = window.innerWidth - 120; // 120 is approx button width
    const maxY = window.innerHeight - 60; // 60 is approx button height
    
    // Generate random X and Y within the screen
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    setNoStyle({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.2s ease-out'
    });
  };

  // --- 2. HOLD LOGIC FOR "YES" BUTTON ---
  const animateHold = (time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    
    // Calculate progress (fills up over 1.5 seconds = 1500ms)
    const progress = Math.min((elapsed / 1500) * 100, 100);
    setHoldProgress(progress);

    if (progress >= 100) {
      setIsAccepted(true);
    } else {
      requestRef.current = requestAnimationFrame(animateHold);
    }
  };

  const startHold = (e) => {
    // Prevent default to stop mobile context menus (long press)
    if (e.cancelable) e.preventDefault(); 
    setIsHolding(true);
    startTimeRef.current = null;
    requestRef.current = requestAnimationFrame(animateHold);
  };

  const stopHold = () => {
    setIsHolding(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setHoldProgress(0); // Reset if she lets go early!
  };

  // Confetti array for success screen
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    if (isAccepted) {
      setHearts(Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 1}s`,
        size: `${Math.random() * 1.5 + 1}rem`
      })));
    }
  }, [isAccepted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-50 flex items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* CSS for Confetti Animation & preventing mobile text selection */}
      <style>
        {`
          @keyframes floatDown {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
          }
          .no-select {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
        `}
      </style>

      {/* Raining Hearts Background on Success */}
      {isAccepted && hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed z-50 pointer-events-none"
          style={{
            left: heart.left,
            top: '-10vh',
            fontSize: heart.size,
            animation: `floatDown ${heart.animationDuration} linear ${heart.animationDelay} forwards`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Main Container - Fully Responsive Glassmorphism Card */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 md:p-10 rounded-[2rem] shadow-2xl shadow-rose-200/50 w-full max-w-sm md:max-w-md text-center z-10">
        
        {!isAccepted ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            
            {/* Cute Image */}
            <div className="w-40 h-40 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-pink-200">
              <img 
                src="https://images.unsplash.com/photo-1518192161663-5a415fb5f329?q=80&w=500&auto=format&fit=crop" 
                alt="Lovely aesthetic" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Hinglish Text */}
            <p className="text-rose-400 font-medium text-sm md:text-base tracking-widest uppercase mb-2">
              Suno... ek baat puchni thi 🫣
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-rose-600 mb-2 leading-tight">
              Will you be my <br/> Girlfriend? 🌹
            </h1>
            <p className="text-gray-500 text-sm md:text-base mb-8">
              Bohot socha, ab finally poochh hi liya! Sach sach batana...
            </p>
            
            {/* Buttons Area */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full h-24 md:h-16 relative">
              
              {/* YES BUTTON - HOLD INTERACTION */}
              <div className="relative w-48 h-14 rounded-full overflow-hidden shadow-lg shadow-rose-300/40 transform transition-transform hover:scale-105 active:scale-95 no-select">
                
                {/* Background Fill showing Progress */}
                <div 
                  className="absolute top-0 left-0 h-full bg-rose-500 transition-none"
                  style={{ width: `${holdProgress}%` }}
                />
                
                {/* Base Button Surface */}
                <button
                  onMouseDown={startHold}
                  onMouseUp={stopHold}
                  onMouseLeave={stopHold}
                  onTouchStart={startHold}
                  onTouchEnd={stopHold}
                  onContextMenu={(e) => e.preventDefault()}
                  className="absolute inset-0 w-full h-full bg-rose-400/20 text-rose-700 font-bold text-lg flex flex-col items-center justify-center no-select outline-none"
                >
                  <span className={`relative z-10 transition-colors ${holdProgress > 50 ? 'text-white' : 'text-rose-600'}`}>
                    Haan Ji! ❤️
                  </span>
                  <span className={`text-[0.65rem] relative z-10 uppercase tracking-widest ${holdProgress > 50 ? 'text-rose-100' : 'text-rose-400'}`}>
                    {isHolding ? "Daba ke rakho..." : "Press & Hold"}
                  </span>
                </button>
              </div>
              
              {/* NO BUTTON - DODGING INTERACTION */}
              <button 
                onMouseEnter={handleNoDodge}
                onTouchStart={handleNoDodge}
                style={noStyle}
                className="bg-gray-100 border border-gray-200 text-gray-500 px-8 py-3 rounded-full font-semibold text-base whitespace-nowrap z-20 shadow-sm"
              >
                Nahi 😒
              </button>
            </div>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 py-6">
            <div className="w-40 h-40 md:w-48 md:h-48 mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-rose-300">
              <img 
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=500&auto=format&fit=crop" 
                alt="Happy couple aesthetic" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-rose-400 font-medium text-sm md:text-base tracking-widest uppercase mb-2">
              Official ho gaya! 🎉
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-rose-600 mb-4">
              Yayyyy! I knew it! ❤️
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Ab toh pakka date fix. Jaldi se ready ho ja, main pick karne aa raha hoon! ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}