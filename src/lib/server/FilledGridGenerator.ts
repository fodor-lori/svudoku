import { Cell } from './models/Cell';
import { BOX_SIZE, Grid, GRID_SIZE } from './models/Grid';

export class FilledSudokuGenerator {
	private grid: Grid;

	constructor() {
		this.grid = new Grid();
	}

	generate(): Grid {
		let success = false;

		while (!success) {
			success = this.fillGrid();
		}

		return this.grid;
	}

	private fillGrid(): boolean {
		const cell = this.findMostConstrainedCell();

		if (!cell) {
			return true;
		}

		if (cell.candidates.size === 0) {
			return false;
		}

		const candidates = Array.from(cell.candidates).sort(() => Math.random() - 0.5);

		for (const candidate of candidates) {
			if (this.isValid(cell, candidate)) {
				this.grid.setCellValue(cell.row, cell.col, candidate);

				if (this.fillGrid()) {
					return true;
				}

				this.grid.setCellValue(cell.row, cell.col, 0);
				this.grid.getCell(cell.row, cell.col).candidates.add(candidate);
			}
		}

		return false;
	}

	private findMostConstrainedCell(): Cell | null {
		let minCandidates = 10;
		let bestCell: Cell | null = null;

		for (let row = 0; row < GRID_SIZE; row++) {
			for (let col = 0; col < GRID_SIZE; col++) {
				const cell = this.grid.getCell(row, col);

				if (!cell.isEmpty()) {
					continue;
				}

				const optionCount = cell.candidates.size;

				if (optionCount < minCandidates) {
					minCandidates = optionCount;
					bestCell = cell;

					if (minCandidates === 1) {
						return bestCell;
					}
				}
			}
		}

		return bestCell;
	}

	private isValid(cell: Cell, number: number): boolean {
		for (let i = 0; i < GRID_SIZE; i++) {
			if (
				this.grid.getCell(cell.row, i).value === number ||
				this.grid.getCell(i, cell.col).value === number
			) {
				return false;
			}
		}

		const startRow = cell.row - (cell.row % BOX_SIZE);
		const startCol = cell.col - (cell.col % BOX_SIZE);

		for (let row = 0; row < BOX_SIZE; row++) {
			for (let col = 0; col < BOX_SIZE; col++) {
				if (this.grid.getCell(startRow + row, startCol + col).value === number) {
					return false;
				}
			}
		}

		return true;
	}
}
