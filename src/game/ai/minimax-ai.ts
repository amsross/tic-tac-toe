import { Stack, Tree } from "../../data-structures/index.ts";
import { Board, Score } from "../index.ts";
import { AI } from "./ai.ts";

// https://en.wikipedia.org/wiki/Minimax
// https://www.math.umd.edu/~immortal/CMSC351/notes/minimax.pdf
export class MinimaxAI extends AI {
  private createTree(
    startingBoard: Board<"X" | "O">,
    depth: number,
  ): Tree<[Board<"X" | "O">, number]> {
    const tree = new Tree<[Board<"X" | "O">, number]>([startingBoard, -1]);
    const stack = new Stack<[number, number]>();
    stack.push([0, 0]);

    for (const [treeNode, previousDepth] of stack) {
      const [previousBoard] = tree.getNode(treeNode)!;
      if (
        previousDepth >= depth || Score.isGameOver(previousBoard)
      ) {
        continue;
      }

      for (const cell of previousBoard.getAvailableCells()) {
        const nextBoard = new Board(previousBoard.asSeed());
        nextBoard.move(cell, previousDepth % 2 === 0 ? "O" : "X");

        stack.push([
          tree.addChild(treeNode, [nextBoard, cell]),
          previousDepth + 1,
        ]);
      }
    }

    return tree;
  }

  private minimax(
    tree: Tree<[Board<"X" | "O">, number]>,
    node: number,
    depth: number,
  ): [number, number] {
    const [board] = tree.getNode(node)!;
    const childNodes = tree.getChildren(node);

    if (childNodes.length === 0 || Score.isGameOver(board)) {
      return [node, Score.getScore(board)];
    }

    let bestScore = depth % 2 === 0 ? -Infinity : Infinity;
    let bestNode = node;

    for (const child of childNodes) {
      const [idx, score] = this.minimax(tree, child, depth + 1);
      if (depth % 2 === 0) {
        if (score > bestScore) {
          bestScore = score;
          bestNode = idx;
        }
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestNode = idx;
        }
      }
    }

    // console.log({ node, bestNode, bestScore });
    return [node === 0 ? bestNode : node, bestScore];
  }

  getNextMove(board: Board<"X" | "O">): number {
    const tree = this.createTree(board, this.difficulty);

    const [bestNodeIndex] = this.minimax(tree, 0, 0);
    const [, move] = tree.getNode(bestNodeIndex)!;

    return move;
  }
}
