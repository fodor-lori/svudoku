import { Cell, Grid } from '../models';
import { ClassicSudokuSolver } from '../solvers/';
import FilledGridGenerator from './FilledGridGenerator';

export default class ClassicSudokuGenerator {
	private filledSudokuGenerator: FilledGridGenerator;
	private solver: ClassicSudokuSolver;
	private grid: Grid;
	private cellsToRemove: number;

	constructor(cellsToRemove: number) {
		this.filledSudokuGenerator = new FilledGridGenerator();
		this.solver = new ClassicSudokuSolver();
		this.grid = new Grid();

		this.cellsToRemove = cellsToRemove;
	}

	generate() {
		const solution = this.filledSudokuGenerator.generate();
		this.grid = solution.clone();

		let success = false;
		while (!success) {
			const cells = this.shuffleCells(this.grid.cells);
			success = this.removeSudokuCell(cells, this.grid);
		}

		return this.serialize(solution);
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
		copy.setCell(cell.row, cell.col, 0);

		if (this.solver.hasUniqueSolution(copy)) {
			if (this.removeSudokuCell(cells, copy, cellIndex + 1, cellsToRemove - 1)) {
				return true;
			}
		}

		grid.setCell(cell.row, cell.col, originalValue);
		return this.removeSudokuCell(cells, grid, cellIndex + 1, cellsToRemove);
	}

	private shuffleCells(cells: Cell[][]): Cell[] {
		return cells.flat().sort(() => Math.random() - 0.5);
	}

	private serialize(solution: Grid) {
		const cells = [];

		for (let row = 0; row < this.grid.cells.length; row++) {
			for (let col = 0; col < this.grid.cells[row].length; col++) {
				cells.push({
					row,
					col,
					value: this.grid.cells[row][col].value,
					solution: solution.cells[row][col].value,
					isClue: this.grid.cells[row][col].value !== 0
				});
			}
		}

		return { cells };
	}
}
