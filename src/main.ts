import { Interface } from "node:readline";
import { createInterface } from "node:readline/promises";
import process from "node:process";
import { AI, Board, Score } from "./game/index.ts";

const example = new Board([0, 1, 2, 3, 4, 5, 6, 7, 8]).toString();

export const main = (rl: Interface, board: Board<"X" | "O">, ai: AI) => {
  console.clear();
  console.log("Tic-Tac-Toe");
  console.log(example);
  console.log("");
  console.log(board.toString());
  console.log("");
  console.log(`difficulty ${ai.difficulty}`);
  rl.prompt();

  rl.on("line", (line) => {
    console.clear();
    console.log("Tic-Tac-Toe");
    console.log(example);

    const command = line.trim().toLowerCase();
    if (command === "exit") {
      console.log("Goodbye!");
      console.log(board.toString());
      console.log("");
      rl.close();
    } else if (command.match(/^reset \d+$/)) {
      try {
        ai.difficulty = parseInt(command.split(" ")[1], 10);
        board.reset();
        console.log("");
      } catch (error) {
        console.error(`${error}`);
      }
    } else if (command === "reset") {
      board.reset();
      console.log("");
    } else if (command.match(/^\d+$/)) {
      try {
        if (!Score.isGameOver(board)) {
          board.move(parseInt(command, 10), "X");

          if (Score.isGameOver(board)) {
            console.log("Game Over!");
            ai.difficulty += 1;
          } else {
            board.move(ai.getNextMove(board), "O");
            if (Score.isGameOver(board)) {
              console.log("Game Over!");
            } else {
              console.log("");
            }
          }
        } else {
          console.log("Game Over!");
        }
      } catch (error) {
        console.error(`${error}`);
      }
    } else {
      console.log(
        "Unknown command!",
      );
    }

    console.log(board.toString());
    console.log("");
    console.log(`difficulty ${ai.difficulty}`);

    rl.prompt();
  }).on("close", () => {
    process.exit(0);
  });
};

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  (() => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "your move> ",
    });

    const board = new Board<"X" | "O">();
    const ai = new AI({ difficulty: 1 });

    main(rl, board, ai);
  })();
}
