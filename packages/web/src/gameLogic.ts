import { Board, Card, CardValues, Direction, Player } from "./types";

const OPPOSITES: Partial<Record<Direction, Direction>> = {
  N: "S", S: "N", E: "W", W: "E",
  NE: "SW", SW: "NE", NW: "SE", SE: "NW",
};

const CARDINAL_DIRS: Direction[] = ["N", "S", "E", "W"];
const ORDINAL_DIRS: Direction[] = ["NE", "NW", "SE", "SW"];

// Neighbors: [cellIndex, attackDirection from placed card]
const NEIGHBORS: [number, Direction][][] = [
  [[1,"E"],[3,"S"],[4,"SE"]],           // 0
  [[0,"W"],[2,"E"],[3,"SW"],[4,"S"],[5,"SE"]], // 1
  [[1,"W"],[4,"SW"],[5,"S"]],           // 2
  [[0,"N"],[1,"NE"],[4,"E"],[6,"S"],[7,"SE"]], // 3
  [[0,"NW"],[1,"N"],[2,"NE"],[3,"W"],[5,"E"],[6,"SW"],[7,"S"],[8,"SE"]], // 4
  [[1,"NW"],[2,"N"],[4,"W"],[7,"SW"],[8,"S"]], // 5
  [[3,"N"],[4,"NE"],[7,"E"]],           // 6
  [[3,"NW"],[4,"N"],[5,"NE"],[6,"W"],[8,"E"]], // 7
  [[4,"NW"],[5,"N"],[7,"W"]],           // 8
];

function isCardinal(values: CardValues) {
  return CARDINAL_DIRS.some(d => values[d] !== undefined);
}
function isOrdinal(values: CardValues) {
  return ORDINAL_DIRS.some(d => values[d] !== undefined);
}

export function resolveFlips(board: Board, placedIndex: number, placedOwner: Player): Board {
  const newBoard = [...board] as Board;
  const placed = newBoard[placedIndex]!;

  for (const [neighborIndex, attackDir] of NEIGHBORS[placedIndex]) {
    const neighbor = newBoard[neighborIndex];
    if (!neighbor || neighbor.owner === placedOwner) continue;

    const defendDir = OPPOSITES[attackDir]!;
    const attackVal = placed.card.values[attackDir];
    const defendVal = neighbor.card.values[defendDir];

    // No attack value in this direction — skip
    if (attackVal === undefined) continue;

    const attackerIsOrdinal = ORDINAL_DIRS.includes(attackDir);
    const defenderHasMatchingType = attackerIsOrdinal
      ? isOrdinal(neighbor.card.values)
      : isCardinal(neighbor.card.values);

    // Auto-flip: defender has no values of the matching type
    if (!defenderHasMatchingType) {
      newBoard[neighborIndex] = { ...neighbor, owner: placedOwner };
      continue;
    }

    // No defend value in this direction — auto-flip
    if (defendVal === undefined) {
      newBoard[neighborIndex] = { ...neighbor, owner: placedOwner };
      continue;
    }

    // Normal comparison
    if (attackVal > defendVal) {
      newBoard[neighborIndex] = { ...neighbor, owner: placedOwner };
    }
  }

  return newBoard;
}
