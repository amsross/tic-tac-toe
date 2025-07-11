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
