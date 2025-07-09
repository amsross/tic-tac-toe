export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | null {
    return this.items.pop() ?? null;
  }

  peek(): T | null {
    return this.items[this.items.length - 1] ?? null;
  }

  size(): number {
    return this.items.length;
  }

  [Symbol.iterator](): Iterator<T> {
    return {
      next: (): IteratorResult<T> => {
        if (this.size() === 0) {
          return { done: true, value: undefined };
        }

        return { done: false, value: this.pop()! };
      },
    };
  }
}
