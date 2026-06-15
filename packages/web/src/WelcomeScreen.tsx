import React, { useEffect, useState } from "react";

interface Props {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: Props) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020f0f 0%, #051e1e 40%, #031428 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Courier New', monospace",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Grid floor */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "45%",
        backgroundImage: `
          linear-gradient(rgba(0,200,180,0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,180,0.2) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        transform: "perspective(400px) rotateX(60deg)",
        transformOrigin: "bottom center",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
      }} />

      {/* Glow orb */}
      <div style={{
        position: "absolute",
        top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 420, height: 420,
        background: "radial-gradient(circle, rgba(0,200,180,0.15) 0%, rgba(0,120,200,0.08) 50%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
        <div style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 900,
          letterSpacing: "0.15em",
          color: glitch ? "#00fff0" : "#e0fffa",
          textShadow: glitch
            ? "3px 0 #00e5ff, -3px 0 #00ffb3, 0 0 30px #00e5ff"
            : "0 0 20px rgba(0,200,180,0.9), 0 0 60px rgba(0,180,200,0.4)",
          transform: glitch ? "translateX(3px)" : "none",
          transition: "color 0.05s, transform 0.05s",
        }}>
          CHAIN OF CARDS
        </div>

        <div style={{
          fontSize: "clamp(0.75rem, 3.5vw, 1.1rem)",
          color: "#7fffd4",
          letterSpacing: "0.3em",
          marginTop: 8,
          textShadow: "0 0 12px rgba(127,255,212,0.8)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          ⛓ &nbsp; never break the chain &nbsp; ⛓
        </div>

        <button
          onClick={onStart}
          style={{
            marginTop: 56,
            padding: "14px 48px",
            fontSize: "1.1rem",
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#020f0f",
            background: "linear-gradient(90deg, #00b4a6, #00e5ff)",
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
            boxShadow: "0 0 24px rgba(0,200,180,0.6), 0 0 60px rgba(0,229,255,0.2)",
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(0,200,180,0.9), 0 0 80px rgba(0,229,255,0.4)";
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(0,200,180,0.6), 0 0 60px rgba(0,229,255,0.2)";
          }}
        >
          Play
        </button>

        <div style={{ marginTop: 24, color: "rgba(0,200,180,0.45)", fontSize: "0.75rem", letterSpacing: "0.2em" }}>
          BETA · FIRST EDITION
        </div>
      </div>
    </div>
  );
}
