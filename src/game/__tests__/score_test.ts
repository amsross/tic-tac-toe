import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { Board, Score } from "../index.ts";

describe("Score", () => {
  describe("isGameOver", () => {
    it("should recognize a an unfinished game", () => {
      assertEquals(Score.isGameOver(new Board()), false);
    });

    it("should recognize a win condition", () => {
      assertEquals(
        Score.isGameOver(
          new Board(["X", "X", "X", null, null, null, null, null, null]),
        ),
        true,
      );
    });

    it("should recognize no legal moves", () => {
      assertEquals(
        Score.isGameOver(
          new Board(["X", "X", "O", "O", "O", "X", "X", "O", "X"]),
        ),
        true,
      );
    });

    it("should recognize no path to victory", () => {
      assertEquals(
        Score.isGameOver(
          new Board(["X", null, "O", "O", "O", "X", "X", "X", "O"]),
        ),
        true,
      );
    });
  });

  describe("getScore", () => {
    it("should calculate the score correctly", () => {
      assertEquals(Score.getScore(new Board()), 0);

      // initial state
      assertEquals(Score.getScore(new Board()), 0);

      // O wins
      assertEquals(
        Score.getScore(
          new Board(["X", "X", "O", "O", "X", "O", "X", "O", "X"]),
        ),
        -10,
      );

      // X wins
      assertEquals(
        Score.getScore(
          new Board(["O", "O", "X", "X", "O", "X", "O", "X", "O"]),
        ),
        10,
      );

      assertEquals(
        Score.getScore(
          new Board([null, null, null, null, "X", null, null, null, null]),
        ),
        -4,
      );

      assertEquals(
        Score.getScore(
          new Board([null, null, null, null, "O", null, null, null, null]),
        ),
        4,
      );

      assertEquals(
        Score.getScore(
          new Board(["X", null, null, null, null, null, "O", null, "O"]),
        ),
        2,
      );
    });
  });
});
