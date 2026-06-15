import { useState } from "react";
import Board from "./Board";
import WelcomeScreen from "./WelcomeScreen";
import CardTile, { P1_COLOR, P2_COLOR } from "./CardTile";
import { resolveFlips } from "./gameLogic";
import { Board as BoardType, Card, Player } from "./types";

const EMPTY_BOARD: BoardType = [null,null,null, null,null,null, null,null,null];

const SAMPLE_CARDS: Record<Player, Card[]> = {
  P1: [
    { id:"p1-1", name:"Ironclad",   ownerId:"p1", isPersonal:false, values:{ N:45, S:30, E:60, W:20 } },
    { id:"p1-2", name:"Stoneback",  ownerId:"p1", isPersonal:false, values:{ N:55, S:55, E:10, W:10 } },
    { id:"p1-3", name:"Swiftclaw",  ownerId:"p1", isPersonal:false, values:{ NE:70, SW:40, NW:25, SE:50 } },
    { id:"p1-4", name:"Duskblade",  ownerId:"p1", isPersonal:false, values:{ N:80, E:15, SE:60, W:35 } },
    { id:"p1-5", name:"My Card",    ownerId:"p1", isPersonal:true,  edition:"first", values:{ N:75, S:60, E:80, W:70 } },
  ],
  P2: [
    { id:"p2-1", name:"Ashfang",    ownerId:"p2", isPersonal:false, values:{ N:50, S:50, E:50, W:50 } },
    { id:"p2-2", name:"Voidwing",   ownerId:"p2", isPersonal:false, values:{ NW:65, SE:65, NE:30, SW:30 } },
    { id:"p2-3", name:"Embercrest", ownerId:"p2", isPersonal:false, values:{ N:90, S:10, E:40, W:40 } },
    { id:"p2-4", name:"Mudthorn",   ownerId:"p2", isPersonal:false, values:{ N:20, S:80, E:55, W:45 } },
    { id:"p2-5", name:"Rival Card", ownerId:"p2", isPersonal:true,  edition:"first", values:{ N:65, S:65, NE:55, SW:55 } },
  ],
};

const btnStyle: React.CSSProperties = {
  padding: "12px 40px",
  fontFamily: "'Courier New', monospace",
  fontSize: "1rem", fontWeight: 700, letterSpacing: "0.3em",
  color: "#0d0221",
  background: "linear-gradient(90deg, #00b4a6, #00e5ff)",
  border: "none", borderRadius: 2, cursor: "pointer",
  boxShadow: "0 0 24px rgba(0,200,180,0.6)",
};

export default function App() {
  const [screen, setScreen] = useState<"welcome" | "game">("welcome");
  const [board, setBoard] = useState<BoardType>(EMPTY_BOARD);
  const [hands, setHands] = useState(SAMPLE_CARDS);
  const [turn, setTurn] = useState<Player>("P1");
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastFlips, setLastFlips] = useState<number[]>([]);

  function startGame() {
    setBoard(EMPTY_BOARD);
    setHands(SAMPLE_CARDS);
    setTurn("P1");
    setSelected(null);
    setLastFlips([]);
    setScreen("game");
  }

  function selectCard(card: Card) {
    setSelected(selected?.id === card.id ? null : card);
  }

  function placeCard(index: number) {
    if (!selected || board[index]) return;
    let newBoard = [...board] as BoardType;
    newBoard[index] = { card: selected, owner: turn };
    newBoard = resolveFlips(newBoard, index, turn);

    const flipped: number[] = [];
    newBoard.forEach((cell, i) => {
      if (i !== index && board[i] && board[i]!.owner !== newBoard[i]?.owner) flipped.push(i);
    });

    setBoard(newBoard);
    setLastFlips(flipped);
    setHands(h => ({ ...h, [turn]: h[turn].filter(c => c.id !== selected.id) }));
    setSelected(null);
    setTurn(t => t === "P1" ? "P2" : "P1");
  }

  if (screen === "welcome") return <WelcomeScreen onStart={startGame} />;

  const p1Score = board.filter(c => c?.owner === "P1").length;
  const p2Score = board.filter(c => c?.owner === "P2").length;
  const totalPlaced = board.filter(c => c !== null).length;
  const isOver = totalPlaced === 9 || p1Score >= 6 || p2Score >= 6;

  const winText = p1Score >= 6 ? "P1 WINS — 6 CARDS"
    : p2Score >= 6 ? "P2 WINS — 6 CARDS"
    : p1Score > p2Score ? "P1 WINS"
    : p2Score > p1Score ? "P2 WINS"
    : "DRAW";
  const winColor = p1Score > p2Score ? P1_COLOR : p2Score > p1Score ? P2_COLOR : "#aaa";

  return (
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(160deg, #020f0f 0%, #051e1e 40%, #031428 100%)",
      color: "#fff",
      fontFamily: "'Courier New', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "env(safe-area-inset-top, 1rem) 0.75rem env(safe-area-inset-bottom, 1rem)",
      boxSizing: "border-box",
      overflowX: "hidden",
    }}>
      {/* Scanlines */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>

        {/* Header */}
        <h1 style={{
          letterSpacing: "0.12em", margin: "0.5rem 0 0",
          color: "#e0fffa", textShadow: "0 0 20px rgba(0,200,180,0.8)",
          fontSize: "clamp(1.1rem, 5vw, 1.6rem)", textAlign: "center",
        }}>
          CHAIN OF CARDS ⛓️
        </h1>

        {/* Status */}
        {!isOver ? (
          <p style={{
            margin: 0, letterSpacing: "0.08em", fontSize: "clamp(0.75rem, 3.5vw, 0.95rem)",
            color: turn === "P1" ? P1_COLOR : P2_COLOR,
            textShadow: `0 0 8px ${turn === "P1" ? P1_COLOR : P2_COLOR}`,
          }}>
            {turn === "P1" ? "◈ P1" : "◈ P2"} — {selected ? `${selected.name} selected` : "choose a card"}
          </p>
        ) : (
          <p style={{
            margin: 0, fontSize: "clamp(1rem, 4.5vw, 1.3rem)", fontWeight: "bold", letterSpacing: "0.12em",
            color: winColor, textShadow: "0 0 16px currentColor",
          }}>
            {winText}
          </p>
        )}

        {/* P2 hand — top (opponent), shown face-down feel, cards horizontal */}
        <div style={{ width: "100%" }}>
          <div style={{ color: P2_COLOR, fontWeight: "bold", letterSpacing: "0.15em", fontSize: "0.8rem", textShadow: `0 0 6px ${P2_COLOR}`, marginBottom: 6, textAlign: "center" }}>
            P2 · {p2Score}
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {hands.P2.map(card => (
              <div key={card.id} style={{ opacity: turn === "P2" ? 1 : 0.4, transition: "opacity 0.2s" }}>
                <CardTile card={card} owner="P2" selected={selected?.id === card.id}
                  onClick={() => turn === "P2" && selectCard(card)} small />
              </div>
            ))}
          </div>
        </div>

        {/* Board */}
        <Board board={board} onCellClick={placeCard} currentTurn={turn} highlightCells={lastFlips} />

        {/* P1 hand — bottom (local player) */}
        <div style={{ width: "100%" }}>
          <div style={{ color: P1_COLOR, fontWeight: "bold", letterSpacing: "0.15em", fontSize: "0.8rem", textShadow: `0 0 6px ${P1_COLOR}`, marginBottom: 6, textAlign: "center" }}>
            P1 · {p1Score}
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
            {hands.P1.map(card => (
              <div key={card.id} style={{ opacity: turn === "P1" ? 1 : 0.4, transition: "opacity 0.2s" }}>
                <CardTile card={card} owner="P1" selected={selected?.id === card.id}
                  onClick={() => turn === "P1" && selectCard(card)} small />
              </div>
            ))}
          </div>
        </div>

        {isOver && (
          <button onClick={startGame} style={{ ...btnStyle, marginTop: 8 }}>
            PLAY AGAIN
          </button>
        )}
      </div>
    </div>
  );
}
