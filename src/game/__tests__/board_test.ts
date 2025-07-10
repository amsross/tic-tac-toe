import { assertEquals } from "@std/assert";
import { Board } from "../board.ts";

Deno.test("board.toString", () => {
  assertEquals(
    new Board([null, null, null, null, null, null, null, null, null])
      .toString(),
    `
     |     |   
-----------------
     |     |   
-----------------
     |     |   
`,
  );

  assertEquals(
    new Board(["X", null, null, "O", "X", null, null, "O", "X"]).toString(),
    `
  X  |     |   
-----------------
  O  |  X  |   
-----------------
     |  O  |  X
`,
  );

  assertEquals(
    new Board(["X", "X", "O", "O", "X", "O", "X", "O", "X"]).toString(),
    `
  X  |  X  |  O
-----------------
  O  |  X  |  O
-----------------
  X  |  O  |  X
`,
  );
});

Deno.test("board.value", () => {
  // initial state
  assertEquals(new Board().value, 0);

  // X wins
  assertEquals(
    new Board(["X", "X", "O", "O", "X", "O", "X", "O", "X"]).value,
    10,
  );

  // O wins
  assertEquals(
    new Board(["O", "O", "X", "X", "O", "X", "O", "X", "O"]).value,
    -10,
  );

  assertEquals(
    new Board([null, null, null, null, "X", null, null, null, null]).value,
    4,
  );

  assertEquals(
    new Board([null, null, null, null, "O", null, null, null, null]).value,
    -4,
  );

  assertEquals(
    new Board(["X", null, null, null, null, null, "O", null, "O"]).value,
    -2,
  );
});
