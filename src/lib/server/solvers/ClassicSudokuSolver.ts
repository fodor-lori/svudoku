import { Cell, Grid } from '../models';

export default class ClassicSudokuSolver {
	private grid: Grid = new Grid();

	private rows: Set<number>[] = [];
	private cols: Set<number>[] = [];
	private boxes: Set<number>[] = [];

	private emptyCells: Cell[] = [];
	private solutionCount: number = 0;

	public hasUniqueSolution(grid: Grid): boolean {
		this.grid = grid;
		this.solutionCount = 0;

		this.initializeSolver();
		this.solve();

		return this.solutionCount === 1;
	}

	private initializeSolver() {
		this.rows = Array.from({ length: 9 }, () => new Set<number>());
		this.cols = Array.from({ length: 9 }, () => new Set<number>());
		this.boxes = Array.from({ length: 9 }, () => new Set<number>());

		this.emptyCells = [];

		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				const value = this.grid.getCell(row, col).value;
				if (value !== 0) {
					this.rows[row].add(value);
					this.cols[col].add(value);
					this.boxes[this.getBoxIndex(row, col)].add(value);
				} else {
					this.emptyCells.push(this.grid.getCell(row, col));
				}
			}
		}
	}

	private solve(): boolean {
		if (this.emptyCells.length === 0) {
			this.solutionCount++;
			if (this.solutionCount > 1) {
				return true;
			}
			return false;
		}

		const cell = this.getCellWithLeastCandidates();
		if (!cell) {
			return false;
		}

		const index = this.emptyCells.indexOf(cell);
		if (index !== -1) {
			this.emptyCells.splice(index, 1);
		}

		const candidates = this.getCandidates(cell);
		for (const num of candidates) {
			this.setCell(cell, num);

			if (this.hasDeadEnd()) {
				this.clearCell(cell);
				continue;
			}

			if (this.solve()) {
				return true;
			}

			this.clearCell(cell);
		}

		this.emptyCells.push(cell);
		return false;
	}

	private getCellWithLeastCandidates(): Cell | null {
		let minOptions = 10;
		let targetCell: Cell | null = null;

		for (const cell of this.emptyCells) {
			const numOptions = this.getCandidates(cell).size;
			if (numOptions < minOptions) {
				minOptions = numOptions;
				targetCell = cell;

				if (minOptions === 1) {
					break;
				}
			}
		}

		return targetCell;
	}

	private getCandidates(cell: Cell): Set<number> {
		const rowUsed = this.rows[cell.row];
		const colUsed = this.cols[cell.col];
		const boxUsed = this.boxes[this.getBoxIndex(cell.row, cell.col)];

		const candidates = new Set<number>();
		for (let num = 1; num <= 9; num++) {
			if (!rowUsed.has(num) && !colUsed.has(num) && !boxUsed.has(num)) {
				candidates.add(num);
			}
		}
		return candidates;
	}

	private setCell(cell: Cell, value: number) {
		cell.value = value;
		this.rows[cell.row].add(value);
		this.cols[cell.col].add(value);
		this.boxes[this.getBoxIndex(cell.row, cell.col)].add(value);
	}

	private clearCell(cell: Cell) {
		const value = cell.value;
		cell.value = 0;
		this.rows[cell.row].delete(value);
		this.cols[cell.col].delete(value);
		this.boxes[this.getBoxIndex(cell.row, cell.col)].delete(value);
	}

	private hasDeadEnd(): boolean {
		for (const cell of this.emptyCells) {
			const candidates = this.getCandidates(cell);
			if (candidates.size === 0) {
				return true;
			}
		}
		return false;
	}

	private getBoxIndex(row: number, col: number): number {
		return Math.floor(row / 3) * 3 + Math.floor(col / 3);
	}
}
