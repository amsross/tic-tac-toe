import { Board } from "../board.ts";

export abstract class AI {
  #difficulty: number = 1;

  get difficulty(): number {
    return this.#difficulty;
  }

  set difficulty(difficulty: number) {
    if (difficulty < 1 || difficulty > 10) {
      throw new Error("Difficulty must be between 1 and 10");
    }
    this.#difficulty = difficulty;
  }

  constructor({ difficulty = 1 }: { difficulty?: number }) {
    this.difficulty = difficulty;
  }

  abstract getNextMove(board: Board<"X" | "O">): number;
}
