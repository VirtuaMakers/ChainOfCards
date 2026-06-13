import { Board as BoardType, Card, Player } from "./types";
import CardTile from "./CardTile";

interface Props {
  board: BoardType;
  onCellClick: (index: number) => void;
  currentTurn: Player;
}

export default function Board({ board, onCellClick, currentTurn }: Props) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 110px)",
      gridTemplateRows: "repeat(3, 130px)",
      gap: 6,
      padding: 12,
      background: "#1a1a2e",
      borderRadius: 8,
      border: "2px solid #444",
    }}>
      {board.map((cell, i) => (
        <div
          key={i}
          onClick={() => !cell && onCellClick(i)}
          style={{
            width: 110,
            height: 130,
            background: cell ? "transparent" : "#2a2a4a",
            border: cell ? "none" : "2px dashed #555",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: cell ? "default" : "pointer",
            transition: "background 0.15s",
          }}
        >
          {cell && <CardTile card={cell.card} owner={cell.owner} />}
        </div>
      ))}
    </div>
  );
}
