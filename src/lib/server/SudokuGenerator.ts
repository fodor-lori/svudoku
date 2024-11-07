import type { SudokuData } from '$lib/types';
import { FilledSudokuGenerator } from './FilledGridGenerator';
import { Cell } from './models/Cell';
import { Grid } from './models/Grid';
import SudokuSolver from './SudokuSolver';

export class SudokuGenerator {
	private filledGridGenerator: FilledSudokuGenerator;
	private solver: SudokuSolver;
	private grid: Grid;
	private cellsToRemove: number;

	constructor(cellsToRemove: number) {
		this.filledGridGenerator = new FilledSudokuGenerator();
		this.solver = new SudokuSolver();
		this.grid = new Grid();

		this.cellsToRemove = cellsToRemove;
	}

	generate(): SudokuData {
		const solution = this.filledGridGenerator.generate();
		this.grid = solution.clone();

		let success = false;
		while (!success) {
			const cells = this.shuffleCells(this.grid.cells);
			success = this.removeSudokuCell(cells, this.grid);
		}

		return {
			puzzle: this.grid.serialize(),
			solution: solution.serialize()
		};
	}

	private removeSudokuCell(
		cells: Cell[],
		grid: Grid = this.grid,
		cellIndex: number = 0,
		cellsToRemove: number = this.cellsToRemove
	): boolean {
		if (cellsToRemove === 0) {
			this.grid = grid;
			return true;
		}

		if (cellIndex >= cells.length) {
			return false;
		}

		const cell = cells[cellIndex];

		if (cell.isEmpty()) {
			return this.removeSudokuCell(cells, grid, cellIndex + 1, cellsToRemove);
		}

		const copy = grid.clone();

		const originalValue = cell.value;
		copy.setCellValue(cell.row, cell.col, 0);

		if (this.solver.hasUniqueSolution(copy)) {
			if (this.removeSudokuCell(cells, copy, cellIndex + 1, cellsToRemove - 1)) {
				return true;
			}
		}

		grid.setCellValue(cell.row, cell.col, originalValue);
		return this.removeSudokuCell(cells, grid, cellIndex + 1, cellsToRemove);
	}

	private shuffleCells(cells: Cell[][]): Cell[] {
		return cells.flat().sort(() => Math.random() - 0.5);
	}
}
