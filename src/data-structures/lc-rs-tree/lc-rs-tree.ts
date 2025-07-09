// Left-Child Right-Sibling Tree
export class LCRSTree<T> {
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
}
