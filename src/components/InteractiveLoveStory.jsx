import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Sparkles, Smile, MessageCircle, Star, ThumbsUp, 
  MapPin, Clock, Calendar, ChevronRight, Play, Pause, 
  Volume2, VolumeX, ArrowRight, Award, Gift, Compass
} from 'lucide-react';

// --- MAIN COMPONENT ---
export default function InteractiveLoveStory() {
  const [stage, setStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Background particles state
  const [particles, setParticles] = useState([]);

  // Generate floating background hearts
  useEffect(() => {
    const initialParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5
    }));
    setParticles(initialParticles);
  }, [stage]);

  const nextStage = () => setStage((prev) => prev + 1);
  const resetStory = () => setStage(1);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-200 to-teal-50 text-slate-800 font-sans selection:bg-pink-300 selection:text-white flex flex-col items-center justify-center p-4">
      
      {/* Background Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 text-rose-400/30 animate-bounce"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              transform: `translateY(100vh)`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Floating Audio Control (Simulated Music UI) */}
      <div className="fixed top-4 right-4 z-50 bg-white/70 backdrop-blur-md p-2 rounded-full shadow-lg border border-pink-200 flex items-center gap-2 transition-all hover:scale-105">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
        >
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <span className="text-xs font-medium text-pink-700 pr-2 hidden sm:inline">
          {isPlaying ? "Lover's Theme.mp3" : "Music Paused"}
        </span>
      </div>

      {/* Dynamic Stage Manager */}
      <main className="w-full max-w-lg z-10 my-auto">
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-500 hover:shadow-pink-200/50">
          {stage === 1 && <StageWelcome onNext={nextStage} />}
          {stage === 2 && <StageRules onNext={nextStage} />}
          {stage === 3 && <StageQuestions onNext={nextStage} />}
          {stage === 4 && <StageMiniGame onNext={nextStage} />}
          {stage === 5 && <StageBonusQuiz onNext={nextStage} />}
          {stage === 6 && <StageBonusFortune onNext={nextStage} />}
          {stage === 7 && <StageMemorySection onNext={nextStage} />}
          {stage === 8 && <StageWhyYou onNext={nextStage} />}
          {stage === 9 && <StageCountdown onNext={nextStage} />}
          {stage === 10 && <StageTypingEffect onNext={nextStage} />}
          {stage === 11 && <StageComplimentCarousel onNext={nextStage} />}
          {stage === 12 && <StageLoveMeter onNext={nextStage} />}
          {stage === 13 && <StageBeforeProposal onNext={nextStage} />}
          {stage === 14 && <StageFinalProposal onNext={nextStage} />}
          {stage === 15 && <StageEnding onReset={resetStory} />}
        </div>
      </main>
    </div>
  );
}

// ==========================================
// STAGE COMPONENTS
// ==========================================

// 1. Welcome Screen
function StageWelcome({ onNext }) {
  return (
    <div className="text-center space-y-6 animate-fadeIn">
      <div className="inline-flex p-4 bg-pink-100 rounded-full text-pink-500 animate-pulse">
        <Heart size={48} fill="currentColor" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Hey Beautiful! 🌸
      </h1>
      <p className="text-lg text-gray-600 font-medium">
        I made something incredibly special, just for you... 
      </p>
      <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100 italic text-pink-700">
        "Promise me you'll stay until the very end? 🥹"
      </div>
      <button
        onClick={onNext}
        className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl shadow-md hover:from-pink-600 hover:to-rose-600 transform transition hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
      >
        <span>💌 Open My Heart</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

// 2. Funny Rule Page
function StageRules({ onNext }) {
  const rules = [
    { icon: "😤", text: "Absolute no skipping allowed!" },
    { icon: "😊", text: "Smiling is legally compulsory here." },
    { icon: "❤️", text: "Be 100% honest with your answers." },
    { icon: "🙈", text: "No overthinking allowed." },
    { icon: "😏", text: "Pay close attention to the last question!" },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        <Sparkles className="text-amber-500" /> Executive Rules
      </h2>
      <div className="space-y-3">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex items-center gap-4 p-3 bg-white/40 rounded-xl border border-pink-100/50 hover:bg-white/80 transition-all">
            <span className="text-2xl">{rule.icon}</span>
            <p className="font-medium text-gray-700 text-sm sm:text-base">{rule.text}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onNext}
        className="w-full py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-900 transition-colors shadow-md text-center block"
      >
        Okay Captain 🫡❤️
      </button>
    </div>
  );
}

// 3. Cute Questions (Merged step-by-step state machine)
function StageQuestions({ onNext }) {
  const [subStep, setSubStep] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [sliderVal, setSliderVal] = useState(50);

  const handleQ1 = (text) => {
    setFeedback("I knew it! 😏❤️");
    setTimeout(() => { setFeedback(""); setSubStep(2); }, 1500);
  };

  const handleQ2 = () => {
    setFeedback("Correct Answer! 😂❤️ Definitely me!");
    setTimeout(() => { setFeedback(""); setSubStep(3); }, 1500);
  };

  const handleQ3 = () => {
    setSubStep(4);
  };

  const handleQ4 = () => {
    setFeedback("Great choice! Can't wait for it 🥰");
    setTimeout(() => { onNext(); }, 1800);
  };

  return (
    <div className="min-h-[300px] flex flex-col justify-between animate-fadeIn">
      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center font-bold text-xl text-pink-600 border border-pink-200 transform scale-105 transition-all">
            {feedback}
          </div>
        </div>
      )}

      {subStep === 1 && (
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-pink-500">Question 1 of 4</span>
          <h3 className="text-xl font-bold text-gray-800">What's your first reaction when you see my message?</h3>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {["😊 Smile", "🙈 Ignore", "😂 Laugh", "❤️ Wait for it"].map((ans) => (
              <button key={ans} onClick={() => handleQ1(ans)} className="p-4 bg-white/80 rounded-xl border border-pink-100 hover:border-pink-400 hover:bg-pink-50/50 transition-all font-medium text-sm text-left">
                {ans}
              </button>
            ))}
          </div>
        </div>
      )}

      {subStep === 2 && (
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-pink-500">Question 2 of 4</span>
          <h3 className="text-xl font-bold text-gray-800">Who makes you smile the most?</h3>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {["😎 Me", "🐼 Me", "🥹 Definitely Me", "😂 Maybe Me"].map((ans) => (
              <button key={ans} onClick={handleQ2} className="p-4 bg-white/80 rounded-xl border border-pink-100 hover:border-pink-400 hover:bg-pink-50/50 transition-all font-medium text-sm text-left">
                {ans}
              </button>
            ))}
          </div>
        </div>
      )}

      {subStep === 3 && (
        <div className="space-y-6 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-pink-500">Question 3 of 4</span>
          <h3 className="text-xl font-bold text-gray-800">Rate how much you miss me right now...</h3>
          <div className="py-4 space-y-4">
            <input 
              type="range" min="0" max="100" value={sliderVal} 
              onChange={(e) => setSliderVal(e.target.value)}
              className="w-full accent-pink-500 h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-2xl font-black text-pink-600">❤️ Love Meter: {sliderVal}%</div>
            <p className="text-xs text-gray-500">(Spoiler: Real range starts from 1000%)</p>
          </div>
          <button onClick={handleQ3} className="w-full py-3 bg-pink-500 text-white font-semibold rounded-xl shadow">
            Lock Answer ⭐⭐⭐⭐⭐
          </button>
        </div>
      )}

      {subStep === 4 && (
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-pink-500">Question 4 of 4</span>
          <h3 className="text-xl font-bold text-gray-800">If we go on a dream date next weekend...</h3>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { label: "🍕 Pizza & Chill", icon: "🍕" },
              { label: "🍿 Late Movie Night", icon: "🍿" },
              { label: "🌸 Romantic Long Walk", icon: "🌸" },
              { label: "☕ Cozy Coffee Talk", icon: "☕" }
            ].map((date) => (
              <button key={date.label} onClick={handleQ4} className="p-4 bg-white/80 rounded-xl border border-pink-100 hover:border-pink-400 hover:bg-pink-50/50 transition-all font-medium text-sm text-center flex flex-col items-center gap-1">
                <span className="text-2xl">{date.icon}</span>
                <span>{date.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 4. Mini Love Game (Catch Hearts)
function StageMiniGame({ onNext }) {
  const [score, setScore] = useState(0);
  const [basketPos, setBasketPos] = useState(50); // percentage
  const [heartPos, setHeartPos] = useState({ top: 0, left: 50 });
  const gameAreaRef = useRef(null);

  useEffect(() => {
    if (score >= 10) return;

    const interval = setInterval(() => {
      setHeartPos((prev) => {
        if (prev.top >= 90) {
          // Check collision
          const dynamicLeft = prev.left;
          if (Math.abs(dynamicLeft - basketPos) < 20) {
            setScore((s) => s + 1);
          }
          return { top: 0, left: Math.random() * 90 };
        }
        return { ...prev, top: prev.top + 5 };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [basketPos, score]);

  const moveLeft = () => setBasketPos((p) => Math.max(10, p - 15));
  const moveRight = () => setBasketPos((p) => Math.min(90, p + 15));

  return (
    <div className="space-y-4 text-center animate-fadeIn">
      <h3 className="text-xl font-bold text-gray-800">Mini Love Game: Catch My Heart ❤️</h3>
      <p className="text-xs text-gray-500">Use controllers to move the basket. Collect 10 hearts!</p>
      
      <div className="text-sm font-bold text-pink-600 bg-pink-50 py-1 px-3 rounded-full inline-block">
        Hearts Caught: {score} / 10
      </div>

      {score < 10 ? (
        <div>
          <div ref={gameAreaRef} className="h-48 bg-gradient-to-b from-rose-50 to-pink-100/50 rounded-2xl relative overflow-hidden border border-pink-200">
            {/* Falling Heart */}
            <div 
              className="absolute text-rose-500 text-xl transition-all duration-700 pointer-events-none"
              style={{ top: `${heartPos.top}%`, left: `${heartPos.left}%` }}
            >
              ❤️
            </div>

            {/* Basket */}
            <div 
              className="absolute bottom-2 text-2xl transition-all duration-150 transform -translate-x-1/2"
              style={{ left: `${basketPos}%` }}
            >
              🧺
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button onClick={moveLeft} className="px-6 py-2 bg-white border border-pink-200 shadow-sm rounded-lg font-bold">◀ Move Left</button>
            <button onClick={moveRight} className="px-6 py-2 bg-white border border-pink-200 shadow-sm rounded-lg font-bold">Move Right ▶</button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4 animate-scaleUp">
          <p className="text-lg font-bold text-emerald-800">You collected my heart entirely! ❤️</p>
          <button onClick={onNext} className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl shadow">
            Continue Journey
          </button>
        </div>
      )}
    </div>
  );
}

// 5. BONUS: Mini Quiz
function StageBonusQuiz({ onNext }) {
  const [currentQ, setCurrentQ] = useState(1);
  const [notice, setNotice] = useState("");

  const answers = {
    1: ["My Eyes 👀", "Your Smile 😊", "Both, duh! 💖"],
    2: ["1 hour", "24/7 constantly", "Every single second"],
  };

  const handleAns = () => {
    if (currentQ === 1) {
      setNotice("Excellent choice! You're brilliant 🙈");
      setTimeout(() => { setNotice(""); setCurrentQ(2); }, 1500);
    } else {
      setNotice("Exactly! Scientific absolute truth.");
      setTimeout(() => { setNotice(""); onNext(); }, 1500);
    }
  };

  return (
    <div className="space-y-4 text-center animate-fadeIn relative">
      {notice && (
        <div className="absolute inset-0 bg-white/90 z-10 flex items-center justify-center font-bold text-pink-600 rounded-2xl text-lg animate-pulse">
          {notice}
        </div>
      )}
      <span className="text-xs font-bold tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase">Bonus Game: Trivia</span>
      
      {currentQ === 1 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">What is my absolute favorite thing about you?</h3>
          <div className="flex flex-col gap-2">
            {answers[1].map((a) => (
              <button key={a} onClick={handleAns} className="w-full py-3 bg-white border border-pink-200 rounded-xl hover:bg-pink-50 text-sm font-medium">{a}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">How often do you cross my mind?</h3>
          <div className="flex flex-col gap-2">
            {answers[2].map((a) => (
              <button key={a} onClick={handleAns} className="w-full py-3 bg-white border border-pink-200 rounded-xl hover:bg-pink-50 text-sm font-medium">{a}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 6. BONUS: Fortune Wheel
function StageBonusFortune({ onNext }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  const fortunes = ["Unlimited Hugs 🤗", "Late Night Long Drive 🚗", "Movie Date Selection Authority 🍿", "Breakfast in Bed 🥞"];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult("");
    setTimeout(() => {
      const randomWin = fortunes[Math.floor(Math.random() * fortunes.length)];
      setResult(randomWin);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="text-center space-y-6 animate-fadeIn">
      <div className="space-y-1">
        <span className="text-xs font-bold tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase">Bonus Game 2</span>
        <h3 className="text-xl font-bold">Love Fortune Wheel</h3>
        <p className="text-xs text-gray-500">Spin the wheel to lock in your guaranteed reward prize!</p>
      </div>

      <div className="flex justify-center py-4">
        <div className={`w-32 h-32 rounded-full border-4 border-dashed border-pink-400 flex items-center justify-center bg-pink-50 relative ${spinning ? 'animate-spin' : ''}`}>
          <Compass className="text-pink-500" size={40} />
        </div>
      </div>

      {result && (
        <div className="p-4 bg-pink-50 border border-pink-200 rounded-xl font-bold text-pink-700 animate-scaleUp text-sm">
          🎉 Congratulations! You won: <div className="text-base text-gray-900 mt-1">{result}</div>
        </div>
      )}

      <button 
        onClick={result ? onNext : spin} 
        className={`w-full py-3 text-white font-bold rounded-xl shadow ${result ? 'bg-slate-800 hover:bg-slate-900' : 'bg-pink-500 hover:bg-pink-600'}`}
      >
        {spinning ? "Spinning your luck..." : result ? "Claim Prize & Continue" : "🎲 Spin Wheel"}
      </button>
    </div>
  );
}

// 7. Memory Section
function StageMemorySection({ onNext }) {
  const memories = [
    { title: "✨ First Hi", desc: "Where the magic spark subtly initiated." },
    { title: "😊 First Smile", desc: "The exact second I knew you were very different." },
    { title: "❤️ First Laugh", desc: "Shared inside jokes that sealed the deal completely." },
    { title: "🥹 Favorite Moment", desc: "Every simple everyday second spent talking to you." }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        <Calendar className="text-pink-500" /> Our Beautiful Journey
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {memories.map((m, i) => (
          <div key={i} className="p-4 bg-white/70 rounded-2xl border border-white/60 shadow-sm hover:scale-[1.02] transition-transform">
            <h4 className="font-bold text-pink-600 text-sm">{m.title}</h4>
            <p className="text-xs text-gray-600 mt-1">{m.desc}</p>
          </div>
        ))}
      </div>
      <button onClick={onNext} className="w-full py-3 bg-pink-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2">
        <span>See Why It's You</span> <ChevronRight size={16} />
      </button>
    </div>
  );
}

// 8. Why You?
function StageWhyYou({ onNext }) {
  const traits = [
    { title: "❤️ Your Smile", desc: "Lights up my entire universe instantly." },
    { title: "🌸 Your Kindness", desc: "How genuinely pure and gentle your soul is." },
    { title: "🥹 Your Eyes", desc: "I find myself getting totally lost in them." },
    { title: "😊 Your Voice", desc: "My absolute favorite, safest soundtrack." }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-bold text-center text-gray-800">Why You? Out of Everyone...</h3>
      <div className="space-y-3">
        {traits.map((t, idx) => (
          <div key={idx} className="p-3 bg-gradient-to-r from-pink-50 to-rose-50/50 rounded-xl border border-pink-100/60 transform hover:rotate-1 transition-all duration-300">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">{t.title}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{t.desc}</p>
          </div>
        ))}
      </div>
      <button onClick={onNext} className="w-full py-3 bg-slate-800 text-white font-semibold rounded-xl text-sm">
        Check Timeline Counter ⏳
      </button>
    </div>
  );
}

// 9. Countdown
function StageCountdown({ onNext }) {
  return (
    <div className="text-center space-y-6 animate-fadeIn">
      <h3 className="text-xl font-bold text-gray-800">It's Been...</h3>
      <div className="grid grid-cols-3 gap-2 bg-white/80 p-4 rounded-2xl border border-pink-100">
        <div>
          <div className="text-3xl font-black text-pink-600 animate-pulse">120</div>
          <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Days</div>
        </div>
        <div>
          <div className="text-3xl font-black text-pink-600">15</div>
          <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Hours</div>
        </div>
        <div>
          <div className="text-3xl font-black text-pink-600">43</div>
          <div className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Minutes</div>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-600">...since I realized you are my absolute favorite person. 🥹❤️</p>
      <button onClick={onNext} className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl shadow">
        Read My Letter 💌
      </button>
    </div>
  );
}

// 10. Cute Typing Effect
function StageTypingEffect({ onNext }) {
  const [text, setText] = useState("");
  const fullMessage = "Every single day I get to talk to you... I find myself feeling exponentially happier. Maybe that's because you are quickly becoming my most cherished, absolute favorite person in the world... ✨";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + fullMessage.charAt(index));
      index++;
      if (index >= fullMessage.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-5 bg-white/80 rounded-2xl border border-pink-100 shadow-inner min-h-[140px] font-mono text-sm leading-relaxed text-pink-900">
        {text}
        <span className="animate-ping">|</span>
      </div>
      <button onClick={onNext} className="w-full py-3 bg-pink-500 text-white font-semibold rounded-xl shadow text-xs uppercase tracking-widest">
        Next: Compliments Carousel ✨
      </button>
    </div>
  );
}

// 11. Compliment Carousel
function StageComplimentCarousel({ onNext }) {
  const compliments = [
    "You look absolutely stunning, always. 🌟",
    "You instantly make any bad day completely better. ☀️",
    "You are infinitely prettier than any golden sunset. 🌅",
    "You are my ultimate sense of profound peace. 🕊️"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % compliments.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [compliments.length]);

  return (
    <div className="text-center space-y-6 py-4 animate-fadeIn">
      <div className="h-20 flex items-center justify-center px-4">
        <p className="text-lg font-bold text-gray-800 transition-all duration-500 transform scale-105">
          "{compliments[index]}"
        </p>
      </div>
      <div className="flex justify-center gap-1.5">
        {compliments.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-pink-500 w-4' : 'bg-pink-200'}`} />
        ))}
      </div>
      <button onClick={onNext} className="w-full py-3 bg-slate-800 text-white font-semibold rounded-xl text-sm">
        Initialize Love Diagnostics 📊
      </button>
    </div>
  );
}

// 12. Love Meter Loading
function StageLoveMeter({ onNext }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center space-y-6 py-4 animate-fadeIn">
      <h3 className="text-lg font-bold tracking-tight uppercase text-gray-500 text-xs">System Analysis: Love Level</h3>
      
      <div className="w-full bg-pink-100 rounded-full h-4 overflow-hidden border border-pink-200 p-0.5 shadow-inner">
        <div 
          className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-3xl font-black text-pink-600">{progress}%</div>

      {progress === 100 && (
        <div className="space-y-4 animate-scaleUp">
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-rose-700 font-bold text-sm">
            🚨 Critical Warning: Cuterness levels exceed all known cosmic limits!
          </div>
          <button onClick={onNext} className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl shadow">
            Proceed to Destination 🚀
          </button>
        </div>
      )}
    </div>
  );
}

// 13. Before Proposal (Darker/Suspense theme built-in)
function StageBeforeProposal({ onNext }) {
  return (
    <div className="text-center space-y-6 py-8 animate-fadeIn">
      <div className="inline-block p-4 bg-red-100 rounded-full text-red-500 animate-ping">
        <Heart size={32} fill="currentColor" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
        I have one absolute last question...
      </h3>
      <p className="text-sm text-gray-500 italic">Take a deep breath. Take your time. 🥹</p>
      <button onClick={onNext} className="w-full py-3 bg-pink-600 text-white font-bold rounded-xl shadow hover:bg-pink-700 transition-all">
        Hear Me Out ❤️
      </button>
    </div>
  );
}

// 14. Final Proposal (Running Away NO Button + Confetti Simulation)
function StageFinalProposal({ onNext }) {
  const [noClicks, setNoClicks] = useState(0);
  const [noStyle, setNoStyle] = useState({});
  const [yesAccepted, setYesAccepted] = useState(false);

  const noPrompts = [
    "Wrong Button! 🙈",
    "Nice try, choose wisely! 😏",
    "Error 404: Option Unavailable 😌",
    "I'm legally not accepting that answer! 😤",
    "System override: Press YES! ❤️"
  ];

  const handleNoHoverOrClick = () => {
    setNoClicks((prev) => prev + 1);
    const randomX = Math.floor(Math.random() * 120) - 60; // relative boundary shift
    const randomY = Math.floor(Math.random() * 80) - 40;
    setNoStyle({
      transform: `translate(${randomX}px, ${randomY}px)`,
      fontSize: `${Math.max(10, 14 - noClicks)}px`,
      transition: 'all 0.2s ease'
    });
  };

  if (yesAccepted) {
    return (
      <div className="text-center space-y-6 animate-scaleUp">
        <div className="text-5xl animate-bounce">🎉🎆💖</div>
        <h2 className="text-3xl font-black text-pink-600">SHE SAID YES! 🥹❤️</h2>
        <div className="p-5 bg-gradient-to-tr from-pink-500 to-rose-500 text-white rounded-2xl shadow-xl text-left text-sm leading-relaxed space-y-3">
          <p className="font-bold border-b border-white/20 pb-2">Dear My Forever,</p>
          <p>Thank you for making me the single happiest person on this planet. I promise to cherish every smile, preserve our inner child, and build an unimaginably beautiful world right beside you. ✨</p>
        </div>
        <button onClick={onNext} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow">
          Explore Our Secrets & Future Timeline 🗺️
        </button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-8 py-4 animate-fadeIn relative">
      <div className="space-y-2">
        <div className="text-6xl animate-pulse inline-block">💝</div>
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Will You Be Mine Forever?</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
        {/* YES BUTTON */}
        <button 
          onClick={() => setYesAccepted(true)}
          className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xl rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all animate-bounce"
        >
          ❤️ YES!
        </button>

        {/* NO BUTTON */}
        <button 
          onMouseEnter={handleNoHoverOrClick}
          onClick={handleNoHoverOrClick}
          style={noStyle}
          className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl border border-gray-300 shadow-sm"
        >
          {noClicks === 0 ? "💔 NO" : noPrompts[Math.min(noClicks - 1, noPrompts.length - 1)]}
        </button>
      </div>
    </div>
  );
}

// 15. Ending, Dreams Timeline & Gift Section
function StageEnding({ onReset }) {
  const [activeGift, setActiveGift] = useState("");

  const dreamTimeline = [
    { year: "2026 ❤️", task: "Our Beautiful First Dream Date" },
    { year: "2027 🌸", task: "More Unforgettable Personal Adventures" },
    { year: "2028 ✈️", task: "International Trips & Exploring Continents Together" },
    { year: "Forever ✨", task: "Infinite Support, Love & Absolute Happiness" }
  ];

  return (
    <div className="space-y-6 animate-fadeIn text-center">
      <span className="text-xs uppercase font-bold tracking-widest text-pink-500">The Beginning of Us</span>
      
      {/* Timeline view */}
      <div className="bg-white/40 border border-white p-4 rounded-2xl text-left space-y-3">
        <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wide flex items-center gap-1">
          <Award size={12} /> Future Horizon Roadmap
        </h4>
        <div className="space-y-3 text-xs">
          {dreamTimeline.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <span className="font-bold text-pink-600 whitespace-nowrap">{item.year}</span>
              <span className="text-gray-700 font-medium">{item.task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gift Section Accordion */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-gray-700 flex items-center justify-center gap-1">
          <Gift size={16} className="text-pink-500" /> Open Unlocked Gift Boxes
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "song", label: "🎵 Our Song", content: "Can't Help Falling in Love - Handpicked for us." },
            { id: "photos", label: "📸 Memory Vault", content: "Reserved space for all our upcoming cute polaroids." },
            { id: "secret", label: "💌 Secret Note", content: "You look breathtakingly beautiful reading this right now." },
            { id: "plans", label: "🌹 Ultimate Plan", content: "A romantic cozy sunset coffee session real soon!" }
          ].map((gift) => (
            <button 
              key={gift.id}
              onClick={() => setActiveGift(activeGift === gift.id ? "" : gift.id)}
              className="p-2.5 bg-white rounded-xl border border-pink-100 text-xs font-semibold hover:bg-pink-50 transition-colors"
            >
              {gift.label}
            </button>
          ))}
        </div>
        {activeGift && (
          <div className="p-3 bg-pink-500 text-white rounded-xl text-xs font-medium animate-scaleUp mt-2">
            {activeGift === "song" && "🎵 Our Song: Playing on loop in my mind every time you smile!"}
            {activeGift === "photos" && "📸 Memory Vault: Ready to fill up with our endless selfies!"}
            {activeGift === "secret" && "💌 Secret Note: You have an absolute monopoly over my heart."}
            {activeGift === "plans" && "🌹 Future Plan: Boundless coffee dates and dynamic long drives!"}
          </div>
        )}
      </div>

      <div className="border-t border-pink-200/40 pt-4 text-center space-y-3">
        <p className="text-sm italic font-medium text-gray-600">
          "Every single love story in the world is profoundly beautiful... but I am infinitely confident ours will always be my absolute favorite." ❤️
        </p>
        <span className="text-xs text-gray-400 block">🌌 Space Stars & Moon Witnessed Your Choice</span>
      </div>

      <button 
        onClick={onReset} 
        className="text-xs font-bold text-pink-500 hover:underline pt-2 block mx-auto"
      >
        🔄 Relive the Journey Again
      </button>
    </div>
  );
}