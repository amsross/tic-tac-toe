import { LCRSTree, Stack } from "../data-structures/index.ts";
import { Board } from "./index.ts";

export class AI {
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

  private createTree(
    startingBoard: Board,
    depth: number,
  ): LCRSTree<[Board, number]> {
    const tree = new LCRSTree<[Board, number]>([startingBoard, -1]);
    const stack = new Stack<[number, number]>();
    stack.push([0, 0]);

    for (const [treeNode, previousDepth] of stack) {
      const [previousBoard] = tree.getNode(treeNode)!;
      if (
        previousDepth >= depth || previousBoard.isGameOver()
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

  // https://en.wikipedia.org/wiki/Minimax
  // https://www.math.umd.edu/~immortal/CMSC351/notes/minimax.pdf
  private minimax(
    tree: LCRSTree<[Board, number]>,
    node: number,
    depth: number,
  ): [number, number] {
    const [board] = tree.getNode(node)!;
    const childNodes = tree.getChildren(node);

    if (childNodes.length === 0 || board.isGameOver()) {
      return [node, board?.value ?? 0];
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

  private getNextMove(tree: LCRSTree<[Board, number]>): number {
    const [bestNodeIndex] = this.minimax(tree, 0, 0);

    const [, move] = tree.getNode(bestNodeIndex)!;

    return move;
  }

  processBoard(board: Board): number {
    const tree = this.createTree(board, this.#difficulty);

    return this.getNextMove(tree);
  }
}
