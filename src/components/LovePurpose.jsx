import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'

/* ============================================================
   CONFIG — change these to make it yours ❤️
   ============================================================ */
const CONFIG = {
  // Curiosity-building questions before the big moment.
  // Each has a label and 1-2 buttons. Any button just moves forward.
  questions: [
    {
      text: "Quick question before anything else…",
      sub: "do you believe two people can be written for each other, long before they even meet?",
      options: ["Maybe… 👀", "I want to believe that"],
    },
    {
      text: "Okay, second question.",
      sub: "have these last few months felt like a page out of a really good story to you too?",
      options: ["Keep going…", "…yeah, actually"],
    },
    {
      text: "Be honest with me.",
      sub: "have you ever caught yourself smiling at your phone for absolutely no reason?",
      options: ["No comment 🙈", "Guilty."],
    },
    {
      text: "One last thing before I say what I actually came here to say…",
      sub: "are you sitting down? this one matters.",
      options: ["I'm listening"],
    },
  ],
  // The big reveal — doesn't say "I love you" directly.
  finalHeadline: "You're the favourite chapter I never saw coming.",
  finalSub: "And I don't want this story to end on this page.",
  finalQuestion: "So here's the only question that actually matters —",
  bigQuestion: "Will you be mine?",
  acceptLabel: "Yes, I will 💗",
  rejectLabel: "No",
  // Celebration screen
  successTitle: "It's official 💍",
  successMessage: "Best decision you've made all year. I promise to make you smile like this, always.",
}

/* ============================================================
   Small helpers
   ============================================================ */
const HEART_EMOJIS = ['❤️', '💗', '💕', '💖', '💘']
const randBetween = (min, max) => Math.random() * (max - min) + min

/* Ambient floating hearts drifting up in the background */
function FloatingHearts({ count = 16 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: randBetween(2, 96),
        size: randBetween(14, 30),
        duration: randBetween(9, 18),
        delay: randBetween(0, 10),
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        drift: randBetween(-40, 40),
      })),
    [count]
  )

  return (
    <div className="lp-hearts-bg" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="lp-float-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            '--drift': `${h.drift}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

/* Big celebratory heart/confetti burst shown after acceptance */
function CelebrationBurst({ count = 46 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: randBetween(0, 100),
        size: randBetween(14, 34),
        duration: randBetween(3.5, 6.5),
        delay: randBetween(0, 2.5),
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        rotate: randBetween(-60, 60),
      })),
    [count]
  )

  return (
    <div className="lp-celebration-burst" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="lp-confetti-heart"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--rot': `${p.rotate}deg`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

/* ============================================================
   Main component
   ============================================================ */
const LovePurpose = () => {
  // step: 0..N-1 = questions, N = final proposal, N+1 = accepted
  const totalQuestions = CONFIG.questions.length
  const [step, setStep] = useState(0)
  const [noPos, setNoPos] = useState({ top: null, left: null })
  const [dodgeCount, setDodgeCount] = useState(0)
  const stageRef = useRef(null)
  const noBtnRef = useRef(null)
  const yesBtnRef = useRef(null)

  const isQuestionStep = step < totalQuestions
  const isProposalStep = step === totalQuestions
  const isAcceptedStep = step === totalQuestions + 1

  const goNext = useCallback(() => setStep((s) => s + 1), [])

  /* Move the "No" button to a fresh random spot, avoiding the Yes button */
  const dodge = useCallback(() => {
    const stage = stageRef.current
    const noBtn = noBtnRef.current
    if (!stage || !noBtn) return

    const stageRect = stage.getBoundingClientRect()
    const btnW = noBtn.offsetWidth || 100
    const btnH = noBtn.offsetHeight || 46
    const padding = 12

    const maxLeft = Math.max(stageRect.width - btnW - padding, padding)
    const maxTop = Math.max(stageRect.height - btnH - padding, padding)

    const newLeft = randBetween(padding, maxLeft)
    const newTop = randBetween(padding, maxTop)

    setNoPos({ top: newTop, left: newLeft })
    setDodgeCount((c) => c + 1)
  }, [])

  // Give the "No" button an initial resting position once the proposal stage mounts
  useEffect(() => {
    if (isProposalStep) {
      const t = setTimeout(dodge, 50)
      return () => clearTimeout(t)
    }
  }, [isProposalStep, dodge])

  // The reject button must never actually register a click — every attempt just
  // repositions it. This covers touch devices (onClick) and desktop (onMouseEnter/onTouchStart).
  const handleRejectAttempt = (e) => {
    e.preventDefault()
    dodge()
  }

  const playfulNudge =
    dodgeCount === 0
      ? ''
      : dodgeCount < 3
      ? 'Nice try 😏'
      : dodgeCount < 6
      ? "It's not going to work…"
      : dodgeCount < 10
      ? 'Okay now you\u2019re just testing me 😂'
      : 'This button has commitment issues, apparently.'

  return (
    <div className="lp-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Quicksand:wght@400;500;600;700&display=swap');

        :root {
          --lp-bg-1: #fff0f3;
          --lp-bg-2: #ffe3ea;
          --lp-rose-100: #ffd9e2;
          --lp-rose-300: #ff9ebb;
          --lp-rose-500: #ff5c8a;
          --lp-rose-600: #f2477c;
          --lp-rose-700: #d6336c;
          --lp-plum-900: #4a1942;
          --lp-cream: #fffaf7;
          --lp-gold: #ffcf7a;
        }

        .lp-root {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: radial-gradient(circle at 20% 20%, var(--lp-bg-2), var(--lp-bg-1) 60%);
          font-family: 'Quicksand', sans-serif;
          color: var(--lp-plum-900);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(16px, 4vw, 40px);
          box-sizing: border-box;
        }

        * { box-sizing: border-box; }

        .lp-hearts-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .lp-float-heart {
          position: absolute;
          bottom: -10%;
          opacity: 0.55;
          animation-name: lp-float-up;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 2px 6px rgba(214, 51, 108, 0.15));
        }

        @keyframes lp-float-up {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.5; }
          100% { transform: translate(var(--drift), -115vh) rotate(20deg); opacity: 0; }
        }

        .lp-card {
          position: relative;
          z-index: 2;
          width: min(560px, 100%);
          min-height: clamp(360px, 55vh, 480px);
          background: rgba(255, 250, 247, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 28px;
          box-shadow: 0 20px 60px -20px rgba(214, 51, 108, 0.35), 0 4px 16px rgba(214, 51, 108, 0.08);
          padding: clamp(28px, 5vw, 48px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: clamp(16px, 3vw, 24px);
        }

        .lp-dots {
          display: flex;
          gap: 8px;
          margin-bottom: 4px;
        }
        .lp-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--lp-rose-100);
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .lp-dot.active {
          background: var(--lp-rose-600);
          transform: scale(1.3);
        }

        .lp-eyebrow {
          font-size: clamp(12px, 2vw, 14px);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--lp-rose-600);
          font-weight: 600;
        }

        .lp-question-text {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          font-size: clamp(20px, 4vw, 28px);
          line-height: 1.35;
          color: var(--lp-plum-900);
        }

        .lp-question-sub {
          font-size: clamp(14px, 2.6vw, 17px);
          color: #7a4a63;
          max-width: 46ch;
          line-height: 1.5;
        }

        .lp-options {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 6px;
        }

        .lp-btn {
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: clamp(14px, 2.4vw, 16px);
          padding: 12px 26px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .lp-btn:focus-visible {
          outline: 3px solid var(--lp-gold);
          outline-offset: 2px;
        }

        .lp-btn-primary {
          background: linear-gradient(135deg, var(--lp-rose-500), var(--lp-rose-700));
          color: #fff;
          box-shadow: 0 10px 24px -8px rgba(214, 51, 108, 0.55);
        }
        .lp-btn-primary:hover { transform: translateY(-2px) scale(1.03); }
        .lp-btn-primary:active { transform: translateY(0) scale(0.98); }

        .lp-btn-ghost {
          background: #fff;
          color: var(--lp-rose-700);
          border: 2px solid var(--lp-rose-100);
        }
        .lp-btn-ghost:hover {
          border-color: var(--lp-rose-300);
          transform: translateY(-2px);
        }

        /* -------- Proposal stage -------- */
        .lp-stage {
          position: relative;
          width: 100%;
          min-height: clamp(320px, 50vh, 420px);
        }

        .lp-stage-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 14px;
          padding-top: 4px;
        }

        .lp-signature-line {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(20px, 3.6vw, 26px);
          color: var(--lp-rose-700);
        }

        .lp-headline {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(19px, 3.6vw, 25px);
          line-height: 1.4;
          max-width: 40ch;
        }

        .lp-subline {
          font-size: clamp(13px, 2.3vw, 15px);
          color: #7a4a63;
        }

        .lp-big-question {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(34px, 7vw, 52px);
          color: var(--lp-rose-700);
          margin: 4px 0 2px;
        }

        .lp-nudge {
          min-height: 20px;
          font-size: 13px;
          color: #a15578;
          font-style: italic;
        }

        .lp-btn-row {
          position: relative;
          width: 100%;
          height: 64px;
          margin-top: 6px;
        }

        .lp-btn-yes {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          padding: 14px 34px;
          font-size: clamp(15px, 2.6vw, 17px);
        }

        .lp-btn-no {
          position: absolute;
          padding: 12px 26px;
          background: #fff;
          color: #b7607e;
          border: 2px solid var(--lp-rose-100);
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: top 0.35s cubic-bezier(.34,1.56,.64,1), left 0.35s cubic-bezier(.34,1.56,.64,1);
        }

        /* -------- Celebration -------- */
        .lp-celebration-burst {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 5;
        }
        .lp-confetti-heart {
          position: absolute;
          top: -8%;
          animation-name: lp-confetti-fall;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }
        @keyframes lp-confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translateY(115vh) rotate(var(--rot)); opacity: 0.9; }
        }

        .lp-teddy {
          font-size: clamp(56px, 12vw, 88px);
          animation: lp-teddy-bounce 1.6s ease-in-out infinite;
        }
        @keyframes lp-teddy-bounce {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }

        .lp-success-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(24px, 5vw, 34px);
          color: var(--lp-rose-700);
        }

        .lp-success-msg {
          font-size: clamp(14px, 2.6vw, 16px);
          color: #7a4a63;
          max-width: 42ch;
          line-height: 1.55;
        }

        .lp-pulse-hearts {
          display: flex;
          gap: 6px;
          font-size: clamp(18px, 3vw, 24px);
        }
        .lp-pulse-hearts span {
          animation: lp-pulse 1.2s ease-in-out infinite;
        }
        .lp-pulse-hearts span:nth-child(2) { animation-delay: 0.15s; }
        .lp-pulse-hearts span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes lp-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-float-heart, .lp-confetti-heart, .lp-teddy, .lp-pulse-hearts span {
            animation: none !important;
          }
        }

        @media (max-width: 420px) {
          .lp-card { border-radius: 22px; }
          .lp-btn-row { height: 56px; }
        }
      `}</style>

      <FloatingHearts />

      <div className="lp-card">
        {/* ---------------- Questions ---------------- */}
        {isQuestionStep && (
          <>
            <div className="lp-dots" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={totalQuestions}>
              {CONFIG.questions.map((_, i) => (
                <span key={i} className={`lp-dot ${i === step ? 'active' : ''}`} />
              ))}
            </div>
            <div className="lp-eyebrow">Just a few questions first</div>
            <div className="lp-question-text">{CONFIG.questions[step].text}</div>
            <div className="lp-question-sub">{CONFIG.questions[step].sub}</div>
            <div className="lp-options">
              {CONFIG.questions[step].options.map((opt, i) => (
                <button key={i} className="lp-btn lp-btn-ghost" onClick={goNext}>
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ---------------- Proposal ---------------- */}
        {isProposalStep && (
          <div className="lp-stage" ref={stageRef}>
            <div className="lp-stage-inner">
              <div className="lp-signature-line">To the one reading this,</div>
              <div className="lp-headline">{CONFIG.finalHeadline}</div>
              <div className="lp-subline">{CONFIG.finalSub}</div>
              <div className="lp-subline" style={{ marginTop: 6 }}>{CONFIG.finalQuestion}</div>
              <div className="lp-big-question">{CONFIG.bigQuestion}</div>

              <div className="lp-btn-row">
                <button
                  ref={yesBtnRef}
                  className="lp-btn lp-btn-primary lp-btn-yes"
                  onClick={goNext}
                >
                  {CONFIG.acceptLabel}
                </button>
                <button
                  ref={noBtnRef}
                  className="lp-btn-no"
                  style={
                    noPos.top !== null
                      ? { top: `${noPos.top}px`, left: `${noPos.left}px` }
                      : { top: '2px', right: '2px' }
                  }
                  onMouseEnter={handleRejectAttempt}
                  onTouchStart={handleRejectAttempt}
                  onClick={handleRejectAttempt}
                  aria-label="This button can't actually be pressed"
                >
                  {CONFIG.rejectLabel}
                </button>
              </div>
              <div className="lp-nudge">{playfulNudge}</div>
            </div>
          </div>
        )}

        {/* ---------------- Accepted ---------------- */}
        {isAcceptedStep && (
          <>
            <CelebrationBurst />
            <div className="lp-teddy">🧸💗</div>
            <div className="lp-success-title">{CONFIG.successTitle}</div>
            <div className="lp-success-msg">{CONFIG.successMessage}</div>
            <div className="lp-pulse-hearts">
              <span>❤️</span>
              <span>💖</span>
              <span>💕</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LovePurpose