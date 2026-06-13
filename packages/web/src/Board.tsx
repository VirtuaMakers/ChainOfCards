import { Board as BoardType, Player } from "./types";
import CardTile from "./CardTile";

interface Props {
  board: BoardType;
  onCellClick: (index: number) => void;
  currentTurn: Player;
  highlightCells?: number[];
}

export default function Board({ board, onCellClick, currentTurn, highlightCells = [] }: Props) {
  // Cell size based on viewport: fill available width up to ~480px max
  const cellSize = "min(28vw, 130px)";

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(3, ${cellSize})`,
      gridTemplateRows: `repeat(3, calc(${cellSize} * 1.18))`,
      gap: "min(1.5vw, 6px)",
      padding: "min(2vw, 10px)",
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
            background: highlightCells.includes(i) ? "rgba(255,215,0,0.15)" : cell ? "transparent" : "rgba(255,255,255,0.03)",
            border: highlightCells.includes(i) ? "2px solid #ffd700" : cell ? "none" : "2px dashed #333",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: cell ? "default" : "pointer",
            transition: "background 0.15s, border-color 0.15s",
          }}
        >
          {cell && (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CardTile card={cell.card} owner={cell.owner} small />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
