import { Cell } from './Cell';

export class Board {
	public cells: Cell[][];
	public size: number = 9;
	public boxSize: number = 3;
	private candidates: Set<number>[][];

	constructor() {
		this.cells = Array.from({ length: this.size }, (_, row) =>
			Array.from({ length: this.size }, (_, col) => new Cell(row, col))
		);

		this.candidates = Array.from({ length: this.size }, () =>
			Array.from({ length: this.size }, () => new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]))
		);
	}

	public generate(): boolean {
		return this.fillBoard();
	}

	private fillBoard(): boolean {
		const cell = this.findMostConstrainedCell();

		if (!cell) {
			return true;
		}

		const candidates = this.candidates[cell.row][cell.col];

		if (candidates.size === 0) {
			return false;
		}

		const numbers = Array.from(candidates).sort(() => Math.random() - 0.5);

		for (const number of numbers) {
			if (this.isValid(cell, number)) {
				this.cells[cell.row][cell.col].value = number;
				this.candidates[cell.row][cell.col].delete(number);

				if (this.fillBoard()) {
					return true;
				}

				this.cells[cell.row][cell.col].value = 0;
				this.candidates[cell.row][cell.col].add(number);
			}
		}

		return false;
	}

	private findMostConstrainedCell(): Cell | null {
		let minOptions = 10;
		let bestCell: Cell | null = null;

		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				const cell = this.cells[row][col];

				if (cell.value !== 0) {
					continue;
				}

				const optionCount = this.candidates[row][col].size;

				if (optionCount < minOptions) {
					minOptions = optionCount;
					bestCell = cell;

					if (minOptions === 1) {
						return bestCell;
					}
				}
			}
		}

		return bestCell;
	}

	private isValid(cell: Cell, number: number): boolean {
		for (let i = 0; i < this.size; i++) {
			if (this.cells[cell.row][i].value === number || this.cells[i][cell.col].value === number) {
				return false;
			}
		}

		const startRow = cell.row - (cell.row % this.boxSize);
		const startCol = cell.col - (cell.col % this.boxSize);

		for (let row = 0; row < this.boxSize; row++) {
			for (let col = 0; col < this.boxSize; col++) {
				if (this.cells[startRow + row][startCol + col].value === number) {
					return false;
				}
			}
		}

		return true;
	}
}
