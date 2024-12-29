import { Grid } from '../models';

export default class FilledGridGenerator {
	generate(): Grid {
		const grid = new Grid();

		let success = false;
		while (!success) {
			success = this.fillGrid(grid);
		}

		return grid;
	}

	mockGenerate(): Grid {
		const grid = new Grid();
		grid.setCell(0, 0, 1);
		grid.setCell(0, 1, 3);
		grid.setCell(0, 2, 2);

		let success = false;
		while (!success) {
			success = this.fillGrid(grid);
		}

		return grid;
	}

	private fillGrid(grid: Grid): boolean {
		const cell = grid.getMostConstrainedCell();

		if (!cell) {
			return true;
		}

		if (cell.candidates.size === 0) {
			return false;
		}

		const candidates = Array.from(cell.candidates).sort(() => Math.random() - 0.5);

		for (const candidate of candidates) {
			grid.setCell(cell.row, cell.col, candidate);

			if (this.fillGrid(grid)) {
				return true;
			}

			grid.clearCell(cell.row, cell.col);
		}

		return false;
	}
}
