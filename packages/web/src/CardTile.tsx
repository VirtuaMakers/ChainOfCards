import React from "react";
import { Card, Direction, Player } from "./types";

const P1_COLOR = "#00B4A6";
const P2_COLOR = "#FF6B6B";

export { P1_COLOR, P2_COLOR };

interface Props {
  card: Card;
  owner: Player;
  selected?: boolean;
  onClick?: () => void;
  small?: boolean;
}

type DirLayout = { top?: string | number; bottom?: string | number; left?: string | number; right?: string | number; transform?: string };

function dirPositions(p: number): Record<Direction, DirLayout> {
  return {
    N:  { top: p,    left: "50%", transform: "translateX(-50%)" },
    S:  { bottom: p, left: "50%", transform: "translateX(-50%)" },
    W:  { left: p,   top: "50%",  transform: "translateY(-50%)" },
    E:  { right: p,  top: "50%",  transform: "translateY(-50%)" },
    NW: { top: p,    left: p },
    NE: { top: p,    right: p },
    SW: { bottom: p, left: p },
    SE: { bottom: p, right: p },
  };
}

export default function CardTile({ card, owner, selected, onClick, small }: Props) {
  const color = owner === "P1" ? P1_COLOR : P2_COLOR;
  // Standard trading card ratio: 2.5" × 3.5" = 5:7
  const w = small ? 65 : 100;
  const h = Math.round(w * 1.4); // 5:7 ratio
  const statSize = small ? 10 : 13;
  const nameSize = small ? 9 : 11;
  const pad = small ? 4 : 6;

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        width: w,
        height: h,
        background: `linear-gradient(145deg, #051e1e 60%, ${color}22)`,
        border: `2px solid ${selected ? "#ffd700" : color}`,
        borderRadius: 6,
        cursor: onClick ? "pointer" : "default",
        boxShadow: selected
          ? `0 0 16px #ffd700, 0 0 4px #ffd700`
          : `0 0 10px ${color}55`,
        transition: "box-shadow 0.15s, border-color 0.15s",
        flexShrink: 0,
      }}
    >
      {/* Colored top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: color, borderRadius: "4px 4px 0 0",
        opacity: 0.85,
      }} />

      {/* Card name */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: nameSize,
        color: "#ddd",
        textAlign: "center",
        padding: "16px 14px 10px",
        letterSpacing: "0.04em",
        pointerEvents: "none",
        lineHeight: 1.3,
      }}>
        {card.name}
        {card.isPersonal && (
          <span style={{ color: "#ffd700", marginLeft: 3 }}>★</span>
        )}
      </div>

      {/* Directional stats */}
      {(Object.entries(card.values) as [Direction, number][]).map(([dir, val]) => (
        <span key={dir} style={{
          position: "absolute",
          fontSize: statSize,
          fontWeight: "bold",
          color: color,
          textShadow: `0 0 6px ${color}`,
          lineHeight: 1,
          ...dirPositions(pad)[dir] as React.CSSProperties,
        }}>
          {val}
        </span>
      ))}
    </div>
  );
}
