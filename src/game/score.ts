import { Board } from "./board.ts";

type Mark = "X" | "O";

const scoringLines: [number, number, number][] = [
  [0, 1, 2], // horizontal
  [3, 4, 5], // horizontal
  [6, 7, 8], // horizontal
  [0, 3, 6], // vertical
  [1, 4, 7], // vertical
  [2, 5, 8], // vertical
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];

export class Score {
  static isGameOver(board: Board<Mark>): boolean {
    // every cell in the scoring line is occupied
    if (board.getAvailableCells().length === 0) {
      return true;
    }

    let totalX = 0;
    let totalO = 0;
    for (const scoringLine of scoringLines) {
      const scoreX = Score.scoreLine(board, "X", scoringLine);
      const scoreO = Score.scoreLine(board, "O", scoringLine);
      totalX += scoreX;
      totalO += scoreO;

      // one of the players has won
      if (scoreX >= 10 || scoreO >= 10) {
        return true;
      }
    }

    // no more legal moves left
    if (totalX === 0 && totalO === 0) {
      return true;
    }

    return false;
  }

  private static scoreLine(
    board: Board<Mark>,
    mark: Mark,
    scoringLine: [number, number, number],
  ): number {
    if (scoringLine.every((index) => board.getMarkAt(index) === mark)) {
      return 10;
    }

    if (
      scoringLine.every((index) =>
        board.getMarkAt(index) === mark ||
        board.getMarkAt(index) === null
      )
    ) {
      return 1;
    }

    return 0;
  }

  static getScore(board: Board<Mark>): number {
    return scoringLines.reduce((acc, scoringLine) => {
      const scoreX = Score.scoreLine(board, "X", scoringLine) * -1;
      const scoreO = Score.scoreLine(board, "O", scoringLine);

      return acc + scoreX + scoreO;
    }, 0);
  }
}
