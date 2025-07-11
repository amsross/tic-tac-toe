import { assertEquals } from "@std/assert";
import { Tree } from "../../tree/tree.ts";

// https://en.wikipedia.org/wiki/Left-child_right-sibling_binary_tree
// https://en.wikipedia.org/wiki/Left-child_right-sibling_binary_tree#/media/File:N-ary_to_binary.svg
Deno.test(function Tree_addChild() {
  const tree = new Tree<string>("A");

  // first children should be at 2n+1 where n is the parent index
  // subsequent children should be at 2n+1 where n is the previous child's index
  assertEquals(tree.addChild(0, "B"), 1);
  assertEquals(tree.addChild(0, "C"), 4);
  assertEquals(tree.addChild(0, "D"), 10);
  assertEquals(tree.addChild(0, "E"), 22);
  assertEquals(tree.addChild(0, "F"), 46);
  assertEquals(tree.addChild(0, "G"), 94);
  assertEquals(tree.addChild(1, "H"), 3);
  assertEquals(tree.addChild(1, "I"), 8);
  assertEquals(tree.addChild(1, "J"), 18);
  assertEquals(tree.addChild(22, "K"), 45);
  assertEquals(tree.addChild(22, "L"), 92);
  assertEquals(tree.addChild(94, "M"), 189);
  assertEquals(tree.addChild(3, "N"), 7);
  assertEquals(tree.addChild(3, "O"), 16);
  assertEquals(tree.addChild(45, "P"), 91);
  assertEquals(tree.addChild(92, "Q"), 185);
});
