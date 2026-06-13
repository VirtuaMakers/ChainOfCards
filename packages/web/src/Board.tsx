import { Board as BoardType, Card, Player } from "./types";
import CardTile from "./CardTile";

interface Props {
  board: BoardType;
  onCellClick: (index: number) => void;
  currentTurn: Player;
  highlightCells?: number[];
}

export default function Board({ board, onCellClick, currentTurn, highlightCells = [] }: Props) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 110px)",
      gridTemplateRows: "repeat(3, 130px)",
      gap: 6,
      padding: 12,
      background: "rgba(180,0,255,0.06)",
      borderRadius: 4,
      border: "1px solid rgba(180,0,255,0.3)",
      boxShadow: "0 0 30px rgba(180,0,255,0.15)",
    }}>
      {board.map((cell, i) => (
        <div
          key={i}
          onClick={() => !cell && onCellClick(i)}
          style={{
            width: 110,
            height: 130,
            background: highlightCells.includes(i) ? "rgba(255,215,0,0.15)" : cell ? "transparent" : "rgba(255,255,255,0.03)",
            border: highlightCells.includes(i) ? "2px solid #ffd700" : cell ? "none" : "2px dashed #444",
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
