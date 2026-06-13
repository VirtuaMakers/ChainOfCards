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
      background: "linear-gradient(160deg, #0d0221 0%, #1a0533 40%, #0a1628 100%)",
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
        bottom: 0,
        left: 0,
        right: 0,
        height: "45%",
        backgroundImage: `
          linear-gradient(rgba(180,0,255,0.25) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180,0,255,0.25) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        transform: "perspective(400px) rotateX(60deg)",
        transformOrigin: "bottom center",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
      }} />

      {/* Glow orb */}
      <div style={{
        position: "absolute",
        top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(180,0,255,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
        <div style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 900,
          letterSpacing: "0.15em",
          color: glitch ? "#ff00ff" : "#e0aaff",
          textShadow: glitch
            ? "3px 0 #00ffff, -3px 0 #ff00ff, 0 0 30px #ff00ff"
            : "0 0 20px rgba(180,0,255,0.8), 0 0 60px rgba(180,0,255,0.4)",
          transform: glitch ? "translateX(3px)" : "none",
          transition: "color 0.05s, transform 0.05s",
        }}>
          CHAIN OF CARDS
        </div>

        <div style={{
          fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
          color: "#00e5ff",
          letterSpacing: "0.4em",
          marginTop: 8,
          textShadow: "0 0 12px rgba(0,229,255,0.8)",
          textTransform: "uppercase",
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
            color: "#0d0221",
            background: "linear-gradient(90deg, #e040fb, #00e5ff)",
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
            boxShadow: "0 0 24px rgba(180,0,255,0.6), 0 0 60px rgba(0,229,255,0.2)",
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(180,0,255,0.9), 0 0 80px rgba(0,229,255,0.4)";
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(180,0,255,0.6), 0 0 60px rgba(0,229,255,0.2)";
          }}
        >
          Play
        </button>

        <div style={{ marginTop: 24, color: "rgba(180,0,255,0.5)", fontSize: "0.75rem", letterSpacing: "0.2em" }}>
          BETA · FIRST EDITION
        </div>
      </div>
    </div>
  );
}
