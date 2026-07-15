import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Sparkles, Volume2, VolumeX, ArrowRight, Gift, Compass
} from 'lucide-react';

export default function InteractiveLoveStory2() {
  const [stage, setStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickHearts, setClickHearts] = useState([]);

  // 1. Global Click-to-Heart Effect Handler
  const handleGlobalClick = (e) => {
    // Avoid triggering if clicking on active game elements or specific buttons
    const id = Date.now() + Math.random();
    const newHeart = {
      id,
      x: e.clientX,
      y: e.clientY,
    };
    setClickHearts((prev) => [...prev, newHeart]);

    // Cleanup heart after animation completes
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1200);
  };

  // 2. Strict Filtered Steps Configuration
  const handleNext = () => {
    if (stage === 1) setStage(3);
    else if (stage === 3) setStage(4);
    else if (stage === 4) setStage(6);
    else if (stage === 6) setStage(8);
    else if (stage === 8) setStage(10);
    else if (stage === 10) setStage(14); // Moves to Proposal before final ending
    else if (stage === 14) setStage(15);
  };

  const resetStory = () => setStage(1);

  return (
    <div 
      onClick={handleGlobalClick}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-200 to-teal-50 text-slate-800 font-sans flex flex-col items-center justify-center p-4 select-none"
    >
      
      {/* Click Hearts Rendering Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {clickHearts.map((h) => (
          <span
            key={h.id}
            className="absolute text-xl pointer-events-none animate-ping text-rose-500"
            style={{
              left: h.x - 10,
              top: h.y - 10,
              transition: 'transform 1s ease-out, opacity 1s ease-out',
              animation: 'floatUp 1.2s forwards'
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Embedded CSS for custom floating effects */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-120px) scale(1.4); opacity: 0; }
        }
        @keyframes balloonUp {
          0% { transform: translateY(100vh) scale(1); opacity: 1; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }
        .animate-balloon { animation: balloonUp 4s linear forwards; }
      `}</style>

      {/* Audio Toggle Control */}
      <div className="fixed top-4 right-4 z-50 bg-white/70 backdrop-blur-md p-2 rounded-full shadow-lg border border-pink-200 flex items-center gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
          className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
        >
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <span className="text-xs font-medium text-pink-700 pr-2 hidden sm:inline">
          {isPlaying ? "🎵 Vibe Check active" : "Music Paused"}
        </span>
      </div>

      {/* Main Card Wrapper */}
      <main className="w-full max-w-md z-10 my-auto">
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 sm:p-8 shadow-xl shadow-pink-200/40">
          {stage === 1 && <StageWelcome onNext={handleNext} />}
          {stage === 3 && <StageQuestions onNext={handleNext} />}
          {stage === 4 && <StageMiniGame onNext={handleNext} />}
          {stage === 6 && <StageBonusFortune onNext={handleNext} />}
          {stage === 8 && <StageWhyYou onNext={handleNext} />}
          {stage === 10 && <StageTypingEffect onNext={handleNext} />}
          {stage === 14 && <StageFinalProposal onNext={handleNext} />}
          {stage === 15 && <StageEnding onReset={resetStory} />}
        </div>
      </main>
    </div>
  );
}

// --- 1. WELCOME SCREEN ---
function StageWelcome({ onNext }) {
  return (
    <div className="text-center space-y-6 py-2">
      <div className="inline-flex p-4 bg-rose-100 rounded-full text-rose-500 animate-bounce">
        <Heart size={44} fill="currentColor" />
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">
          Hey Gorgeous! 👑
        </h1>
        <p className="text-[10px] font-bold tracking-widest text-pink-500 uppercase">
          Blushing alert active 🙈
        </p>
      </div>
      <p className="text-sm font-semibold text-gray-700 leading-relaxed px-1">
        Vaise toh dimaag me rehti ho, par aaj thoda dil me utar kar dekho... Khas tumhare liye banaya hai.
      </p>
      {/* <div className="p-3.5 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-dashed border-pink-200 italic text-rose-700 font-extrabold text-xs">
        "End tak sath rukhne ka waada karo, varna dil chura lunga tumhara! 🥹👉👈"
      </div> */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black rounded-xl text-xs sm:text-sm shadow-md flex flex-col items-center justify-center gap-0.5"
      >
        <span className="flex items-center gap-1">💌 Open My Secret Hub <ArrowRight size={14} /></span>
        {/* <span className="text-[9px] opacity-80">(Tap anywhere for multiple hearts! 😉)</span> */}
      </button>
    </div>
  );
}

// --- 3. CUTE QUESTIONS (2 Questions) ---
function StageQuestions({ onNext }) {
  const [subStep, setSubStep] = useState(1);
  const [feedback, setFeedback] = useState("");

  const handleQ1 = (e) => {
    e.stopPropagation();
    setFeedback("Mujhe pehle se pata tha! 😏❤️");
    setTimeout(() => { setFeedback(""); setSubStep(2); }, 1500);
  };

  const handleQ2 = (e) => {
    e.stopPropagation();
    setFeedback("Bilkul sahi jawab! Ekdum 100% correct 😂❤️");
    setTimeout(() => { setFeedback(""); onNext(); }, 1500);
  };

  return (
    <div className="min-h-[250px] flex flex-col justify-between relative">
      {feedback && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 rounded-2xl text-center font-bold text-lg text-pink-600 p-4 animate-scaleUp">
          {feedback}
        </div>
      )}

      {subStep === 1 ? (
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-pink-500">Sawaal No. 1</span>
          <h3 className="text-lg font-bold text-gray-800">Mera message dekhte hi sabse pehla reaction kya hota hai?</h3>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {["😊 Pyari si Smile", "🙈 Attitude/Ignore", "😂 Bass Hasna", "❤️ Waiting for it"].map((ans) => (
              <button key={ans} onClick={handleQ1} className="p-3 bg-white/80 rounded-xl border border-pink-100 hover:border-pink-400 font-medium text-xs sm:text-sm">
                {ans}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase font-bold tracking-wider text-pink-500">Sawaal No. 2</span>
          <h3 className="text-lg font-bold text-gray-800">Tumhe sabse zyada smile kaun karwata hai?</h3>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {["😎 Only Me", "🐼 Obviously Me", "🥹 Definitely Me", "😂 Sudhar jao, Me"].map((ans) => (
              <button key={ans} onClick={handleQ2} className="p-3 bg-white/80 rounded-xl border border-pink-100 hover:border-pink-400 font-medium text-xs sm:text-sm">
                {ans}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- 4. MINI LOVE GAME ---
function StageMiniGame({ onNext }) {
  const [score, setScore] = useState(0);
  const [basketPos, setBasketPos] = useState(50);
  const [heartPos, setHeartPos] = useState({ top: 0, left: 50 });

  useEffect(() => {
    if (score >= 5) return;
    const interval = setInterval(() => {
      setHeartPos((prev) => {
        if (prev.top >= 90) {
          if (Math.abs(prev.left - basketPos) < 20) {
            setScore((s) => s + 1);
          }
          return { top: 0, left: Math.random() * 85 };
        }
        return { ...prev, top: prev.top + 7 };
      });
    }, 60);
    return () => clearInterval(interval);
  }, [basketPos, score]);

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-bold text-gray-800">Game Zone: Catch My Hearts! ❤️</h3>
      <div className="text-xs font-bold text-pink-600 bg-pink-50 py-1 px-3 rounded-full inline-block">
        Hearts Caught: {score} / 5
      </div>

      {score < 5 ? (
        <div>
          <div className="h-40 bg-gradient-to-b from-rose-50 to-pink-100/40 rounded-2xl relative overflow-hidden border border-pink-200">
            <div className="absolute text-rose-500 text-lg" style={{ top: `${heartPos.top}%`, left: `${heartPos.left}%` }}>❤️</div>
            <div className="absolute bottom-2 text-xl transform -translate-x-1/2" style={{ left: `${basketPos}%` }}>🧺</div>
          </div>
          <div className="flex justify-center gap-4 mt-3">
            <button onClick={(e) => { e.stopPropagation(); setBasketPos((p) => Math.max(10, p - 20)); }} className="px-4 py-1.5 bg-white border border-pink-200 rounded-lg text-xs font-bold shadow-sm">◀ Left</button>
            <button onClick={(e) => { e.stopPropagation(); setBasketPos((p) => Math.min(90, p + 20)); }} className="px-4 py-1.5 bg-white border border-pink-200 rounded-lg text-xs font-bold shadow-sm">Right ▶</button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
          <p className="text-sm font-bold text-emerald-800">Wow, tumne toh saare dil loot liye! 😉</p>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="w-full py-2.5 bg-pink-500 text-white font-bold rounded-xl text-xs shadow">
            Aage Chalo ✨
          </button>
        </div>
      )}
    </div>
  );
}

// --- 6. BONUS FORTUNE WHEEL ---
function StageBonusFortune({ onNext }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  const fortunes = [
    "Unlimited Pyar aur Tareef 🤗",
    "Next Weekend Treats 🍕",
    "No-Fight Passport for 1 Month 🤐",
    "Choti si Romantic Long Drive 🚗"
  ];

  const spin = (e) => {
    e.stopPropagation();
    if (spinning) return;
    setSpinning(true);
    setResult("");
    setTimeout(() => {
      setResult(fortunes[Math.floor(Math.random() * fortunes.length)]);
      setSpinning(false);
    }, 1500);
  };

  return (
    <div className="text-center space-y-5">
      <h3 className="text-lg font-bold text-gray-800">Love Fortune Wheel 🎲</h3>
      <div className="flex justify-center py-2">
        <div className={`w-24 h-24 rounded-full border-4 border-dashed border-pink-400 flex items-center justify-center bg-pink-50 ${spinning ? 'animate-spin' : ''}`}>
          <Compass className="text-pink-500" size={32} />
        </div>
      </div>
      {result && (
        <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-xs font-bold text-pink-700 animate-scaleUp">
          🎁 Aapka Gift: <div className="text-sm text-gray-900 mt-0.5">{result}</div>
        </div>
      )}
      <button onClick={result ? (e) => { e.stopPropagation(); onNext(); } : spin} className="w-full py-3 bg-pink-500 text-white text-xs font-bold rounded-xl shadow">
        {spinning ? "Kismat ghum rahi hai..." : result ? "Gift Claim Karo & Continue" : "🎲 Spin Wheel"}
      </button>
    </div>
  );
}

// --- 8. WHY YOU ---
function StageWhyYou({ onNext }) {
  const traits = [
    { title: "😊 Tumhari Smile", desc: "Jo mera pura din chalane ke liye kafi hai." },
    { title: "🌸 Tumhara Nature", desc: "Jiske samne baaki sab boring lagte hain." },
    { title: "✨ Everything", desc: "Pata nahi kyu, par tum jaisi bhi ho ekdum perfect ho." }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-center text-gray-800">Aakhir Tum Hi Kyu? 🤔</h3>
      <div className="space-y-2">
        {traits.map((t, idx) => (
          <div key={idx} className="p-3 bg-white/80 rounded-xl border border-pink-100">
            <h4 className="font-bold text-pink-600 text-xs sm:text-sm">{t.title}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{t.desc}</p>
          </div>
        ))}
      </div>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="w-full py-2.5 bg-slate-800 text-white font-semibold rounded-xl text-xs">
        Ek Last Message Padho ⏳
      </button>
    </div>
  );
}

// --- 10. TYPING EFFECT ---
function StageTypingEffect({ onNext }) {
  const [text, setText] = useState("");
  const message = "Pata hai... jab bhi mera mood thoda low feel karta hu, tumhara ek text aate hi sab automatically normal ho jata hai. Tum sirf meri dost nahi, ab meri sabse favorite notification ban chuki ho... ✨";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + message.charAt(index));
      index++;
      if (index >= message.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5">
      <div className="p-4 bg-white/90 rounded-xl border border-pink-100 shadow-inner min-h-[120px] font-mono text-xs sm:text-sm leading-relaxed text-pink-950">
        {text}
        <span className="animate-pulse font-bold text-pink-500">|</span>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="w-full py-2.5 bg-pink-500 text-white font-semibold rounded-xl text-xs">
        Click to see the End 💝
      </button>
    </div>
  );
}

// --- 14. FINAL PROPOSAL (With Moving NO Button, Falling Hearts & Celebration Balloons) ---
function StageFinalProposal({ onNext }) {
  const [noClicks, setNoClicks] = useState(0);
  const [noStyle, setNoStyle] = useState({});
  const [celebration, setCelebration] = useState(false);
  const [celebrationItems, setCelebrationItems] = useState([]);

  const prompts = [
    "Galat Button! 🙈",
    "Wrong choice, try again! 😏",
    "Yeh option valid nahi hai 😌",
    "I'm not accepting this response! 😤",
    "System error: Click YES! ❤️"
  ];

  const moveNoButton = (e) => {
    e.stopPropagation();
    setNoClicks((prev) => prev + 1);
    const x = Math.floor(Math.random() * 160) - 80; 
    const y = Math.floor(Math.random() * 120) - 60;
    setNoStyle({
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 0.15s ease',
      fontSize: `${Math.max(10, 14 - noClicks)}px`
    });
  };

  const handleYes = (e) => {
    e.stopPropagation();
    setCelebration(true);
    
    // Spawn celebration particles dynamically
    const items = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      type: i % 2 === 0 ? '🎈' : '❤️',
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 20 + 20
    }));
    setCelebrationItems(items);
  };

  return (
    <div className="text-center space-y-6 py-4 relative min-h-[220px]">
      {celebration && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {celebrationItems.map((item) => (
            <div
              key={item.id}
              className="absolute bottom-0 animate-balloon"
              style={{
                left: `${item.left}%`,
                fontSize: `${item.size}px`,
                animationDelay: `${item.delay}s`
              }}
            >
              {item.type}
            </div>
          ))}
        </div>
      )}

      {!celebration ? (
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Will You Be Mine Forever? 🥹❤️</h2>
          <div className="flex gap-4 items-center justify-center pt-2">
            <button 
              onClick={handleYes}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black rounded-xl shadow-md transform hover:scale-110 transition-transform"
            >
              ❤️ YES!
            </button>
            <button 
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={noStyle}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 text-sm font-bold rounded-xl border border-gray-300"
            >
              {noClicks === 0 ? "💔 NO" : prompts[Math.min(noClicks - 1, prompts.length - 1)]}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-scaleUp">
          <h2 className="text-2xl sm:text-3xl font-black text-pink-600">SHE SAID YES! 🎉🥳</h2>
          <p className="text-xs sm:text-sm font-medium text-gray-700 bg-pink-50 p-3 rounded-xl border border-pink-100">
            Mera din, meri smile aur mera hamesha ab sab tumhara hua! Thank you for choosing me. 🥰
          </p>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl shadow">
            Final Box Open Karo 🎁
          </button>
        </div>
      )}
    </div>
  );
}

// --- 15. ENDING ---
function StageEnding({ onReset }) {
  const [activeGift, setActiveGift] = useState("");

  return (
    <div className="text-center space-y-5">
      <div className="inline-block p-3 bg-rose-100 rounded-full text-rose-500">
        <Heart size={32} fill="currentColor" />
      </div>
      
      <h2 className="text-xl font-extrabold text-gray-950">Meri Ultimate Happiness Ho! 🥹❤️</h2>
      
      <p className="text-xs sm:text-sm italic font-medium text-gray-600 leading-relaxed px-2">
        "Log kehte hain unhe chand sitare chahiye, par sach bolu toh mujhe toh bas tumhara sath chahiye... Hamesha ke liye!"
      </p>

      <div className="bg-white/50 border border-white p-3 rounded-2xl space-y-2">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {[
            { id: "vibe", label: "🎵 Our Vibe" },
            { id: "promise", label: "🤝 Pinky Promise" },
          ].map((gift) => (
            <button 
              key={gift.id}
              onClick={(e) => { e.stopPropagation(); setActiveGift(activeGift === gift.id ? "" : gift.id); }}
              className="p-2 bg-white rounded-xl border border-pink-100 font-bold"
            >
              {gift.label}
            </button>
          ))}
        </div>
        {activeGift && (
          <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-xs font-medium text-left">
            {activeGift === "vibe" && "🎵 Har gaane ki lyrics ab tumhari yaad dilati hain!"}
            {activeGift === "promise" && "🤝 Waada raha, chahe koi bhi situation ho hum sath khade rahenge!"}
          </div>
        )}
      </div>

      <div className="border-t border-pink-200/40 pt-4">
        <button onClick={(e) => { e.stopPropagation(); onReset(); }} className="text-xs font-semibold text-pink-500 hover:underline">
          🔄 Safar ko dobara shuru karein?
        </button>
      </div>
    </div>
  );
}