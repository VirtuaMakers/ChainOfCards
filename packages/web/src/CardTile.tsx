import { Card } from "./types";
import type { Player } from "./types";

interface Props {
  card: Card;
  owner: Player;
}

const directionPositions: Record<string, React.CSSProperties> = {
  N:  { top: 4,  left: "50%", transform: "translateX(-50%)" },
  S:  { bottom: 4, left: "50%", transform: "translateX(-50%)" },
  W:  { left: 4, top: "50%", transform: "translateY(-50%)" },
  E:  { right: 4, top: "50%", transform: "translateY(-50%)" },
  NW: { top: 4,  left: 4 },
  NE: { top: 4,  right: 4 },
  SW: { bottom: 4, left: 4 },
  SE: { bottom: 4, right: 4 },
};

export default function CardTile({ card, owner }: Props) {
  const bg = owner === "P1" ? "#1a3a5c" : "#5c1a1a";

  return (
    <div style={{
      position: "relative",
      width: 100,
      height: 120,
      background: bg,
      border: "2px solid #ccc",
      borderRadius: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: 11,
      fontWeight: "bold",
    }}>
      <span style={{ fontSize: 10, textAlign: "center", padding: "0 4px", zIndex: 1 }}>
        {card.name}
      </span>
      {Object.entries(card.values).map(([dir, val]) => (
        <span key={dir} style={{
          position: "absolute",
          fontSize: 12,
          fontWeight: "bold",
          color: "#ffd700",
          ...directionPositions[dir],
        }}>
          {val}
        </span>
      ))}
    </div>
  );
}
