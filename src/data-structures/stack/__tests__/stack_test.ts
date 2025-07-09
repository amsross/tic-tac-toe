import { assertEquals } from "@std/assert";
import { Stack } from "../stack.ts";

Deno.test(function stackOperationsTest() {
  const stack = new Stack<number>();

  assertEquals(stack.size(), 0);
  assertEquals(stack.peek(), null);
  stack.push(1);
  assertEquals(stack.size(), 1);
  assertEquals(stack.peek(), 1);
  stack.push(2);
  assertEquals(stack.size(), 2);
  assertEquals(stack.peek(), 2);
  assertEquals(stack.pop(), 2);
  assertEquals(stack.size(), 1);
  assertEquals(stack.peek(), 1);
  assertEquals(stack.pop(), 1);
  assertEquals(stack.size(), 0);
  assertEquals(stack.peek(), null);
});

Deno.test(function stackIteratorTest() {
  const stack = new Stack<number>();

  stack.push(1);

  let i = 1;
  for (const item of stack) {
    assertEquals(item, i);
    if (i < 5) {
      stack.push(++i);
    }
  }

  assertEquals(i, 5);
  assertEquals(stack.size(), 0);
});
