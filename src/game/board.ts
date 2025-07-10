const cellToString = (cell: "X" | "O" | null): string => cell || " ";

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

export class Board {
  private cells: ("X" | "O" | null)[];

  asSeed(): ("X" | "O" | null)[] {
    return structuredClone(this.cells);
  }

  constructor(seed?: ("X" | "O" | null)[]) {
    this.cells = seed ?? Array(9).fill(null);
  }

  reset(): this {
    this.cells.fill(null);
    return this;
  }

  getAvailableCells(): number[] {
    return this.cells
      .reduce((cells: number[], cell, index) => {
        if (cell === null) {
          cells.push(index);
        }

        return cells;
      }, []);
  }

  move(index: number, mark: "X" | "O"): this {
    if (index < 0 || index > 8) {
      throw new Error("Index out of bounds");
    }

    if (this.cells[index] !== null) {
      throw new Error("Cell already occupied");
    }

    this.cells[index] = mark;
    return this;
  }

  toString(): string {
    return `
  ${cellToString(this.cells[0])}  |  ${cellToString(this.cells[1])}  |  ${
      cellToString(this.cells[2])
    }
-----------------
  ${cellToString(this.cells[3])}  |  ${cellToString(this.cells[4])}  |  ${
      cellToString(this.cells[5])
    }
-----------------
  ${cellToString(this.cells[6])}  |  ${cellToString(this.cells[7])}  |  ${
      cellToString(this.cells[8])
    }
`;
  }

  isGameOver(): boolean {
    // every cell in the scoring line is occupied
    if (this.getAvailableCells().length === 0) {
      return true;
    }

    let totalX = 0;
    let totalO = 0;
    for (const scoringLine of scoringLines) {
      const scoreX = this.scoreLine("X", scoringLine);
      const scoreO = this.scoreLine("O", scoringLine);
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

  private scoreLine(
    mark: "X" | "O",
    scoringLine: [number, number, number],
  ): number {
    if (scoringLine.every((index) => this.cells[index] === mark)) {
      return 10;
    }

    if (
      scoringLine.every((index) =>
        this.cells[index] === mark ||
        this.cells[index] === null
      )
    ) {
      return 1;
    }

    return 0;
  }

  get value(): number {
    return scoringLines.reduce((acc, scoringLine) => {
      const scoreX = this.scoreLine("X", scoringLine) * -1;
      const scoreO = this.scoreLine("O", scoringLine);

      return acc + scoreX + scoreO;
    }, 0);
  }
}
