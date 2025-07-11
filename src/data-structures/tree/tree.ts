// Left-Child Right-Sibling Tree
// https://en.wikipedia.org/wiki/Left-child_right-sibling_binary_tree
export class Tree<T> {
  private nodes: T[] = [];

  constructor(rootNode: T) {
    this.nodes.push(rootNode);
  }

  addSibling(existingSiblingIndex: number, node: T): number {
    let newSiblingIndex = 2 * existingSiblingIndex + 2;
    while (this.nodes[newSiblingIndex] !== undefined) {
      newSiblingIndex = 2 * newSiblingIndex + 2;
    }

    this.nodes[newSiblingIndex] = node;

    return newSiblingIndex;
  }

  addChild(parentIndex: number, node: T): number {
    const firstChildIndex = 2 * parentIndex + 1;
    if (this.nodes[firstChildIndex] === undefined) {
      this.nodes[firstChildIndex] = node;

      return firstChildIndex;
    }

    return this.addSibling(firstChildIndex, node);
  }

  toString(): string {
    return this.nodes.reduce((acc: string, node, index) => {
      if (node === undefined) {
        return acc;
      }
      return acc + `\n${index}: ${node}`;
    }, "");
  }

  getNode(index: number): T | undefined {
    return this.nodes[index];
  }

  getChildren(parentIndex: number): number[] {
    const children: number[] = [];

    // check the first child first
    let childIndex = 2 * parentIndex + 1;
    while (this.nodes[childIndex] !== undefined) {
      children.push(childIndex);
      // move on to the next sibling
      childIndex = 2 * childIndex + 2;
    }

    return children;
  }
}
