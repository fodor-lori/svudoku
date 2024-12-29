import { Cell } from './';

export const GRID_SIZE = 9;
export const BOX_SIZE = Math.sqrt(GRID_SIZE);

export default class Grid {
	cells: Cell[][];
	emptyCells: Cell[];
	candidates: Set<number>[][];

	constructor() {
		this.emptyCells = [];

		this.cells = Array.from({ length: 9 }, (_, row) =>
			Array.from({ length: 9 }, (_, col) => {
				const cell = new Cell(row, col);
				this.emptyCells.push(cell);
				return cell;
			})
		);

		this.candidates = Array.from({ length: 9 }, () =>
			Array.from({ length: 9 }, () => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
		);
	}

	getCell(row: number, col: number): Cell {
		return this.cells[row][col];
	}

	setCell(row: number, col: number, value: number): void {
		const cell = this.cells[row][col];

		if (cell.value === value) {
			return;
		}

		if (cell.value !== 0) {
			this.clearCell(row, col);
		}

		cell.setValue(value);
		cell.candidates.clear();
		this.removeFromEmptyCells(cell);

		this.forEachInRow(row, (r, c) => {
			if (this.cells[r][c].isEmpty()) {
				this.cells[r][c].removeCandidate(value);
			}
		});

		this.forEachInCol(col, (r, c) => {
			if (this.cells[r][c].isEmpty()) {
				this.cells[r][c].removeCandidate(value);
			}
		});

		this.forEachInBox(row, col, (r, c) => {
			if (this.cells[r][c].isEmpty()) {
				this.cells[r][c].removeCandidate(value);
			}
		});
	}

	clearCell(row: number, col: number): void {
		const cell = this.cells[row][col];
		const oldValue = cell.value;

		cell.setValue(0);
		this.addToEmptyCells(cell);

		this.forEachInRow(row, (r, c) => {
			this.reAddCandidateIfValid(r, c, oldValue);
		});

		this.forEachInCol(col, (r, c) => {
			this.reAddCandidateIfValid(r, c, oldValue);
		});

		this.forEachInBox(row, col, (r, c) => {
			this.reAddCandidateIfValid(r, c, oldValue);
		});

		cell.setCandidates(new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]));

		this.forEachInRow(row, (r, c) => {
			const value = this.cells[r][c].value;
			if (value !== 0) cell.removeCandidate(value);
		});

		this.forEachInCol(col, (r, c) => {
			const value = this.cells[r][c].value;
			if (value !== 0) cell.removeCandidate(value);
		});

		this.forEachInBox(row, col, (r, c) => {
			const value = this.cells[r][c].value;
			if (value !== 0) cell.removeCandidate(value);
		});
	}

	getMostConstrainedCell(): Cell | null {
		let minCandidates = 10;
		let bestCell: Cell | null = null;

		for (let row = 0; row < this.cells.length; row++) {
			for (let col = 0; col < this.cells[row].length; col++) {
				const cell = this.getCell(row, col);

				if (!cell.isEmpty()) {
					continue;
				}

				const candidates = this.candidates[row][col];
				if (candidates.size < minCandidates) {
					minCandidates = candidates.size;
					bestCell = cell;

					if (minCandidates === 1) {
						return bestCell;
					}
				}
			}
		}

		return bestCell;
	}

	print(): void {
		for (let row = 0; row < this.cells.length; row++) {
			console.log(this.cells[row].map((cell) => cell.value).join(' '));
		}
	}

	clone(): Grid {
		const grid = new Grid();

		for (let row = 0; row < this.cells.length; row++) {
			for (let col = 0; col < this.cells[row].length; col++) {
				grid.setCell(row, col, this.cells[row][col].value);
			}
		}

		return grid;
	}

	private reAddCandidateIfValid(row: number, col: number, value: number) {
		const cell = this.cells[row][col];
		if (!cell.isEmpty()) return;

		if (this.isValueUsedInRow(row, value)) return;
		if (this.isValueUsedInCol(col, value)) return;
		if (this.isValueUsedInBox(row, col, value)) return;

		cell.addCandidate(value);
	}

	isValueUsedInRow(row: number, value: number): boolean {
		for (let col = 0; col < 9; col++) {
			if (this.cells[row][col].value === value) return true;
		}
		return false;
	}

	isValueUsedInCol(col: number, value: number): boolean {
		for (let row = 0; row < 9; row++) {
			if (this.cells[row][col].value === value) return true;
		}
		return false;
	}

	isValueUsedInBox(row: number, col: number, value: number): boolean {
		const boxRow = Math.floor(row / 3) * 3;
		const boxCol = Math.floor(col / 3) * 3;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this.cells[boxRow + i][boxCol + j].value === value) return true;
			}
		}
		return false;
	}

	private forEachInRow(row: number, fn: (r: number, c: number) => void) {
		for (let col = 0; col < 9; col++) {
			fn(row, col);
		}
	}

	private forEachInCol(col: number, fn: (r: number, c: number) => void) {
		for (let row = 0; row < 9; row++) {
			fn(row, col);
		}
	}

	private forEachInBox(row: number, col: number, fn: (r: number, c: number) => void) {
		const boxRow = Math.floor(row / 3) * 3;
		const boxCol = Math.floor(col / 3) * 3;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				fn(boxRow + i, boxCol + j);
			}
		}
	}

	private addToEmptyCells(cell: Cell): void {
		if (this.emptyCells.includes(cell)) {
			return;
		}

		this.emptyCells.push(cell);
	}

	private removeFromEmptyCells(cell: Cell): void {
		const index = this.emptyCells.indexOf(cell);
		if (index === -1) {
			return;
		}

		this.emptyCells.splice(index, 1);
	}

	serialize(): string {
		return this.cells.map((row) => row.map((cell) => cell.value).join('')).join('');
	}
}
