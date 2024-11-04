import { Grid } from './Grid';
import { Cell } from './Cell';
import { SudokuSolver } from './SudokuSolver';

export type Sudoku = {
	solution: Grid;
	puzzle: Grid;
};

export class SudokuGenerator {
	private solution: Grid;
	private puzzle: Grid;
	private solver: SudokuSolver;
	private candidates: Set<number>[][];

	constructor() {
		this.puzzle = new Grid();
		this.solution = new Grid();
		this.solver = new SudokuSolver();
		this.candidates = [];
	}

	public generate(): Sudoku {
		this.initializeEmptyGrid();
		this.generateFilledGrid();

		this.puzzle = this.solution.clone();
		this.generatePuzzle(56, this.shuffleCells());

		if (!this.solution || !this.puzzle) {
			throw new Error('Failed to generate Grid');
		}

		for (let row = 0; row < this.puzzle.size; row++) {
			for (let col = 0; col < this.puzzle.size; col++) {
				if (this.puzzle.getCell(row, col).value !== 0) {
					this.puzzle.getCell(row, col).isGiven = true;
				}
			}
		}

		return { solution: this.solution, puzzle: this.puzzle };
	}

	private initializeEmptyGrid() {
		this.solution = new Grid();
		this.candidates = Array.from({ length: 9 }, () =>
			Array.from({ length: 9 }, () => new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]))
		);
	}

	private generateFilledGrid(): boolean {
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
				this.solution.setCellValue(cell.row, cell.col, number);
				this.candidates[cell.row][cell.col].delete(number);

				if (this.generateFilledGrid()) {
					return true;
				}

				this.solution.setCellValue(cell.row, cell.col, 0);
				this.candidates[cell.row][cell.col].add(number);
			}
		}

		return false;
	}

	private generatePuzzle(
		cellsToRemove: number,
		cells: Cell[],
		cellIndex: number = 0,
		puzzle: Grid = this.puzzle
	): boolean {
		if (cellsToRemove === 0) {
			this.puzzle = puzzle;
			return true;
		}

		if (cellIndex >= cells.length) {
			return false;
		}

		const cell = cells[cellIndex];
		if (cell.value === 0) {
			return this.generatePuzzle(cellsToRemove, cells, cellIndex + 1, puzzle);
		}

		const puzzleCopy = puzzle.clone();

		puzzleCopy.setCellValue(cell.row, cell.col, 0);
		if (this.solver.hasUniqueSolution(puzzleCopy)) {
			if (this.generatePuzzle(cellsToRemove - 1, cells, cellIndex + 1, puzzleCopy)) {
				return true;
			}
		}

		return this.generatePuzzle(cellsToRemove, cells, cellIndex + 1, puzzle);
	}

	private findMostConstrainedCell(): Cell | null {
		let minOptions = 10;
		let bestCell: Cell | null = null;

		for (let row = 0; row < this.solution.size; row++) {
			for (let col = 0; col < this.solution.size; col++) {
				const cell = this.solution.getCell(row, col);

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
		for (let i = 0; i < this.solution.size; i++) {
			if (
				this.solution.getCell(cell.row, i).value === number ||
				this.solution.getCell(i, cell.col).value === number
			) {
				return false;
			}
		}

		const startRow = cell.row - (cell.row % this.solution.boxSize);
		const startCol = cell.col - (cell.col % this.solution.boxSize);

		for (let row = 0; row < this.solution.boxSize; row++) {
			for (let col = 0; col < this.solution.boxSize; col++) {
				if (this.solution.getCell(startRow + row, startCol + col).value === number) {
					return false;
				}
			}
		}

		return true;
	}

	private shuffleCells(): Cell[] {
		return this.solution.cells.flat().sort(() => Math.random() - 0.5);
	}
}
