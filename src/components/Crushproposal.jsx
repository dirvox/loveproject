import React, { useState, useRef } from "react";

const questions = [
  {
    q: "Ek sacchi baat pucchu?",
    sub: "Kya tum believe karti ho ki kuch log bina try kiye smile la dete hain?",
    yes: "Haan, believe karti hoon",
    no: "Kabhi socha nahi",
  },
  {
    q: "Agar main kahoon ki tumhari yaad roz aati hai...",
    sub: "toh kya tumhe bhi kabhi kabhi mera khayal aata hai?",
    yes: "Shayad haan",
    no: "Bata nahi sakti",
  },
  {
    q: "Last one, promise.",
    sub: "Kya tum ready ho ek chhoti si sacchai sunne ke liye?",
    yes: "Ready hoon",
    no: "Thoda darr lag raha hai",
  },
];

const heartEmojis = ["💗", "💖", "💕", "💓", "💞"];

export default function CrushProposal() {
  const [stage, setStage] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const wrapRef = useRef(null);

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(135deg, #ffdde1 0%, #ffe6f0 45%, #ffd1dc 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', 'Poppins', sans-serif",
      padding: "24px",
      boxSizing: "border-box",
      overflow: "hidden",
      position: "relative",
    },
    card: {
      background: "rgba(255, 255, 255, 0.85)",
      borderRadius: "24px",
      padding: "clamp(24px, 6vw, 48px)",
      maxWidth: "480px",
      width: "100%",
      textAlign: "center",
      boxShadow: "0 20px 60px rgba(214, 51, 108, 0.25)",
      backdropFilter: "blur(6px)",
      position: "relative",
      zIndex: 2,
    },
    title: {
      fontSize: "clamp(22px, 5vw, 30px)",
      color: "#c2185b",
      marginBottom: "10px",
      fontWeight: 700,
    },
    sub: {
      fontSize: "clamp(14px, 3.5vw, 17px)",
      color: "#6d4c5c",
      marginBottom: "26px",
      lineHeight: 1.5,
    },
    heart: {
      fontSize: "clamp(40px, 12vw, 64px)",
      marginBottom: "16px",
      animation: "pulse 1.4s ease-in-out infinite",
      display: "inline-block",
    },
    primaryBtn: {
      background: "linear-gradient(135deg, #ff5c8a, #ff85a2)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "14px 34px",
      fontSize: "clamp(15px, 3.5vw, 17px)",
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(255, 92, 138, 0.4)",
      transition: "transform 0.2s ease",
      margin: "6px",
    },
    ghostBtn: {
      background: "transparent",
      color: "#c2185b",
      border: "2px solid #ffb3c6",
      borderRadius: "50px",
      padding: "12px 30px",
      fontSize: "clamp(14px, 3.5vw, 16px)",
      fontWeight: 600,
      cursor: "pointer",
      margin: "6px",
    },
    btnRow: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "20px",
      position: "relative",
      minHeight: "70px",
    },
    noBtn: {
      background: "#fff",
      color: "#c2185b",
      border: "2px solid #ffb3c6",
      borderRadius: "50px",
      padding: "12px 30px",
      fontSize: "clamp(14px, 3.5vw, 16px)",
      fontWeight: 600,
      cursor: "pointer",
      position: "relative",
      transition: "transform 0.15s ease, left 0.15s ease, top 0.15s ease",
    },
    finalScreen: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    floatingHeart: {
      position: "absolute",
      fontSize: "22px",
      animation: "floatUp 3.5s linear forwards",
      zIndex: 1,
      pointerEvents: "none",
    },
    counter: {
      fontSize: "13px",
      color: "#b06080",
      marginBottom: "16px",
      letterSpacing: "1px",
    },
  };

  const keyframes = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.12); }
    }
    @keyframes floatUp {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-400px) scale(1.4); opacity: 0; }
    }
    @keyframes popIn {
      0% { transform: scale(0.7); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  const moveNoButton = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wrapWidth = wrap.offsetWidth;
    const wrapHeight = wrap.offsetHeight;
    const maxX = Math.max(wrapWidth - 120, 40);
    const maxY = Math.max(wrapHeight - 50, 20);
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setNoPos({ x: newX, y: newY });
    setYesScale((prev) => Math.min(prev + 0.12, 2.2));
  };

  const handleQuestionYes = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setStage("final");
    }
  };

  const [floatingHearts, setFloatingHearts] = useState([]);

  const handleAccept = () => {
    setAccepted(true);
    const hearts = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }));
    setFloatingHearts(hearts);
  };

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>

      {floatingHearts.map((h) => (
        <span
          key={h.id}
          style={{
            ...styles.floatingHeart,
            left: `${h.left}%`,
            bottom: "0px",
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}

      <div style={styles.card}>
        {stage === "intro" && (
          <div style={{ animation: "popIn 0.5s ease" }}>
            <div style={styles.heart}>💌</div>
            <div style={styles.title}>Hey tum...</div>
            <div style={styles.sub}>
              Ek chhota sa surprise hai tumhare liye. Bas 3 sawaal, phir ek sacchi baat.
            </div>
            <button
              style={styles.primaryBtn}
              onClick={() => setStage("questions")}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Shuru karein 💕
            </button>
          </div>
        )}

        {stage === "questions" && (
          <div style={{ animation: "popIn 0.5s ease" }}>
            <div style={styles.counter}>
              SAWAAL {qIndex + 1} / {questions.length}
            </div>
            <div style={styles.heart}>{heartEmojis[qIndex % heartEmojis.length]}</div>
            <div style={styles.title}>{questions[qIndex].q}</div>
            <div style={styles.sub}>{questions[qIndex].sub}</div>
            <div style={styles.btnRow}>
              <button
                style={styles.primaryBtn}
                onClick={handleQuestionYes}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                {questions[qIndex].yes}
              </button>
              <button
                style={styles.ghostBtn}
                onClick={handleQuestionYes}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                {questions[qIndex].no}
              </button>
            </div>
          </div>
        )}

        {stage === "final" && !accepted && (
          <div style={{ animation: "popIn 0.5s ease" }}>
            <div style={styles.heart}>😳💗</div>
            <div style={styles.title}>Will you be my girlfriend?</div>
            <div style={styles.sub}>
              Sach mein tumhe bahut pasand karta hoon. Ek chance doगी mujhe?
            </div>
            <div style={styles.btnRow} ref={wrapRef}>
              <button
                style={{
                  ...styles.primaryBtn,
                  transform: `scale(${yesScale})`,
                }}
                onClick={handleAccept}
              >
                Yes 😍
              </button>
              <button
                style={{
                  ...styles.noBtn,
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={(e) => {
                  e.preventDefault();
                  moveNoButton();
                }}
              >
                No
              </button>
            </div>
          </div>
        )}

        {stage === "final" && accepted && (
          <div style={{ ...styles.finalScreen, animation: "popIn 0.6s ease" }}>
            <div style={{ ...styles.heart, fontSize: "clamp(50px, 15vw, 80px)" }}>🥰💖</div>
            <div style={styles.title}>Yay! Tumne haan bol diya!</div>
            <div style={styles.sub}>
              Aaj se officially hum dono ek dooje ke hain. Thank you for saying yes 💕
            </div>
          </div>
        )}
      </div>
    </div>
  );
}