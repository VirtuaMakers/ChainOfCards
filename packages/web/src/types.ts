export type CardinalDirection = "N" | "S" | "E" | "W";
export type OrdinalDirection = "NE" | "NW" | "SE" | "SW";
export type Direction = CardinalDirection | OrdinalDirection;

export type CardValues = Partial<Record<Direction, number>>;

export interface Card {
  id: string;
  name: string;
  imageUrl?: string;
  values: CardValues;
  ownerId: string;
  nftTokenId?: string;
  isPersonal: boolean;
  edition?: "first" | "standard";
}

export type Player = "P1" | "P2";

export type BoardCell = { card: Card; owner: Player } | null;

export type Board = [
  BoardCell, BoardCell, BoardCell,
  BoardCell, BoardCell, BoardCell,
  BoardCell, BoardCell, BoardCell
];

export interface GameState {
  id: string;
  board: Board;
  players: Record<Player, { userId: string; hand: Card[] }>;
  currentTurn: Player;
  status: "waiting" | "active" | "finished";
  winner?: Player | "draw";
}
