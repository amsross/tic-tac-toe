import { Interface } from "node:readline";
import { createInterface } from "node:readline/promises";
import process from "node:process";
import { AI, Board } from "./game/index.ts";

const example = `
  0  |  1  |  2
-----------------
  3  |  4  |  5
-----------------
  6  |  7  |  8
`;

export const main = (rl: Interface, board: Board, ai: AI) => {
  console.clear();
  console.log("Tic-Tac-Toe");
  console.log(example);
  console.log(`difficulty ${ai.difficulty}`);
  console.log("");
  console.log(board.toString());
  console.log("");
  rl.prompt();

  rl.on("line", (line) => {
    console.clear();
    console.log("Tic-Tac-Toe");
    console.log(example);
    console.log(`difficulty ${ai.difficulty}`);

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
        board.move(parseInt(command, 10), "X");

        if (board.isGameOver()) {
          console.log("Game Over!");
          ai.difficulty += 1;
        } else {
          board.move(ai.processBoard(board), "O");
          if (board.isGameOver()) {
            console.log("Game Over!");
          } else {
            console.log("");
          }
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

    const board = new Board();
    const ai = new AI({ difficulty: 1 });

    main(rl, board, ai);
  })();
}
