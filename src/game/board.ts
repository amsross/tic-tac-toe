type Mark<T> = T | null;

const cellToString = <T>(cell: Mark<T>): string =>
  cell !== null ? `${cell}` : " ";

export class Board<T> {
  private cells: (Mark<T>)[];

  asSeed(): (Mark<T>)[] {
    return structuredClone(this.cells);
  }

  constructor(seed?: (Mark<T>)[]) {
    this.cells = seed ?? Array(9).fill(null);
  }

  reset(): this {
    this.cells.fill(null);
    return this;
  }

  getAvailableCells(): number[] {
    return this.cells
      .reduce((cells: number[], cell, index) => {
        if (cell === null) {
          cells.push(index);
        }

        return cells;
      }, []);
  }

  move(index: number, mark: NonNullable<Mark<T>>): this {
    if (index < 0 || index > 8) {
      throw new Error("Index out of bounds");
    }

    if (this.cells[index] !== null) {
      throw new Error("Cell already occupied");
    }

    this.cells[index] = mark;
    return this;
  }

  toString(): string {
    return `
  ${cellToString(this.cells[0])}  |  ${cellToString(this.cells[1])}  |  ${
      cellToString(this.cells[2])
    }
-----------------
  ${cellToString(this.cells[3])}  |  ${cellToString(this.cells[4])}  |  ${
      cellToString(this.cells[5])
    }
-----------------
  ${cellToString(this.cells[6])}  |  ${cellToString(this.cells[7])}  |  ${
      cellToString(this.cells[8])
    }
`;
  }

  getMarkAt(cell: number): Mark<T> {
    return this.cells[cell];
  }
}
