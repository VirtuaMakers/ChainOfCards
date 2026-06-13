import { useState } from "react";
import Board from "./Board";
import { Board as BoardType, Card, Player } from "./types";

const EMPTY_BOARD: BoardType = [null,null,null, null,null,null, null,null,null];

const SAMPLE_CARDS: Record<Player, Card[]> = {
  P1: [
    { id:"p1-1", name:"Ironclad", ownerId:"p1", isPersonal:false, values:{ N:45, S:30, E:60, W:20 } },
    { id:"p1-2", name:"Stoneback", ownerId:"p1", isPersonal:false, values:{ N:55, S:55, E:10, W:10 } },
    { id:"p1-3", name:"Swiftclaw", ownerId:"p1", isPersonal:false, values:{ NE:70, SW:40, NW:25, SE:50 } },
    { id:"p1-4", name:"Duskblade", ownerId:"p1", isPersonal:false, values:{ N:80, E:15, SE:60, W:35 } },
    { id:"p1-5", name:"My Card", ownerId:"p1", isPersonal:true, edition:"first", values:{ N:75, S:60, E:80, W:70 } },
  ],
  P2: [
    { id:"p2-1", name:"Ashfang", ownerId:"p2", isPersonal:false, values:{ N:50, S:50, E:50, W:50 } },
    { id:"p2-2", name:"Voidwing", ownerId:"p2", isPersonal:false, values:{ NW:65, SE:65, NE:30, SW:30 } },
    { id:"p2-3", name:"Embercrest", ownerId:"p2", isPersonal:false, values:{ N:90, S:10, E:40, W:40 } },
    { id:"p2-4", name:"Mudthorn", ownerId:"p2", isPersonal:false, values:{ N:20, S:80, E:55, W:45 } },
    { id:"p2-5", name:"Rival Card", ownerId:"p2", isPersonal:true, edition:"first", values:{ N:65, S:65, NE:55, SW:55 } },
  ],
};

export default function App() {
  const [board, setBoard] = useState<BoardType>(EMPTY_BOARD);
  const [hands, setHands] = useState(SAMPLE_CARDS);
  const [turn, setTurn] = useState<Player>("P1");
  const [selected, setSelected] = useState<Card | null>(null);

  function selectCard(card: Card) {
    setSelected(selected?.id === card.id ? null : card);
  }

  function placeCard(index: number) {
    if (!selected || board[index]) return;
    const newBoard = [...board] as BoardType;
    newBoard[index] = { card: selected, owner: turn };
    setBoard(newBoard);
    setHands(h => ({ ...h, [turn]: h[turn].filter(c => c.id !== selected.id) }));
    setSelected(null);
    setTurn(t => t === "P1" ? "P2" : "P1");
  }

  const p1Score = board.filter(c => c?.owner === "P1").length;
  const p2Score = board.filter(c => c?.owner === "P2").length;
  const isOver = board.every(c => c !== null);

  return (
    <div style={{ minHeight:"100vh", background:"#0d0d1a", color:"#fff", fontFamily:"sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"2rem" }}>
      <h1 style={{ letterSpacing:4, marginBottom:4 }}>CHAIN OF CARDS ⛓️</h1>
      <p style={{ color:"#888", marginBottom:"1.5rem" }}>Never break the chain.</p>

      {!isOver && (
        <p style={{ marginBottom:"1rem", color: turn === "P1" ? "#6ab0ff" : "#ff6a6a" }}>
          {turn === "P1" ? "🔵 P1's turn" : "🔴 P2's turn"} — {selected ? `Selected: ${selected.name}` : "Select a card from your hand"}
        </p>
      )}
      {isOver && (
        <p style={{ fontSize:20, fontWeight:"bold", color: p1Score > p2Score ? "#6ab0ff" : p2Score > p1Score ? "#ff6a6a" : "#aaa" }}>
          {p1Score > p2Score ? "🔵 P1 Wins!" : p2Score > p1Score ? "🔴 P2 Wins!" : "Draw!"}
        </p>
      )}

      <div style={{ display:"flex", gap:"2rem", alignItems:"flex-start" }}>
        {/* P1 Hand */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ color:"#6ab0ff", fontWeight:"bold", textAlign:"center" }}>P1 ({p1Score})</div>
          {hands.P1.map(card => (
            <div key={card.id} onClick={() => turn === "P1" && selectCard(card)}
              style={{ opacity: turn === "P1" ? 1 : 0.4, cursor: turn === "P1" ? "pointer" : "default",
                outline: selected?.id === card.id ? "2px solid #ffd700" : "none", borderRadius:6 }}>
              <div style={{ background:"#1a3a5c", border:"2px solid #6ab0ff", borderRadius:6, padding:"4px 8px", fontSize:12, textAlign:"center" }}>
                {card.name}{card.isPersonal ? " ★" : ""}
              </div>
            </div>
          ))}
        </div>

        <Board board={board} onCellClick={placeCard} currentTurn={turn} />

        {/* P2 Hand */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ color:"#ff6a6a", fontWeight:"bold", textAlign:"center" }}>P2 ({p2Score})</div>
          {hands.P2.map(card => (
            <div key={card.id} onClick={() => turn === "P2" && selectCard(card)}
              style={{ opacity: turn === "P2" ? 1 : 0.4, cursor: turn === "P2" ? "pointer" : "default",
                outline: selected?.id === card.id ? "2px solid #ffd700" : "none", borderRadius:6 }}>
              <div style={{ background:"#5c1a1a", border:"2px solid #ff6a6a", borderRadius:6, padding:"4px 8px", fontSize:12, textAlign:"center" }}>
                {card.name}{card.isPersonal ? " ★" : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
