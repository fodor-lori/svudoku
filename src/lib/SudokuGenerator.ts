import { Board } from './Board';
import { Cell } from './Cell';
import { SudokuSolver } from './SudokuSolver';

export type Sudoku = {
	solution: Board;
	puzzle: Board;
};

export class SudokuGenerator {
	private solution: Board;
	private puzzle: Board;
	private solver: SudokuSolver;
	private candidates: Set<number>[][];

	constructor() {
		this.solution = new Board();
		this.puzzle = new Board();
		this.solver = new SudokuSolver();
		this.candidates = [];
	}

	public generate(): Sudoku {
		this.initializeEmptyBoard();
		this.generateFilledBoard();

		for (const row of this.solution.cells) {
			this.puzzle.cells.push([]);
			for (const cell of row) {
				this.puzzle.cells[cell.row].push(new Cell(cell.row, cell.col, cell.value));
			}
		}

		this.generatePuzzle(56, this.shuffleCells());

		if (!this.solution || !this.puzzle) {
			throw new Error('Failed to generate board');
		}

		return { solution: this.solution, puzzle: this.puzzle };
	}

	private initializeEmptyBoard() {
		this.solution = new Board();

		this.solution.cells = Array.from({ length: this.solution.size }, (_, row) =>
			Array.from({ length: this.solution.size }, (_, col) => new Cell(row, col))
		);

		this.candidates = Array.from({ length: 9 }, () =>
			Array.from({ length: 9 }, () => new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]))
		);
	}

	private generateFilledBoard(): boolean {
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
				this.solution.cells[cell.row][cell.col].value = number;
				this.candidates[cell.row][cell.col].delete(number);

				if (this.generateFilledBoard()) {
					return true;
				}

				this.solution.cells[cell.row][cell.col].value = 0;
				this.candidates[cell.row][cell.col].add(number);
			}
		}

		return false;
	}

	private generatePuzzle(
		cellsToRemove: number,
		cells: Cell[],
		cellIndex: number = 0,
		puzzle: Board = this.puzzle
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

		const puzzleCopy = new Board();
		for (const row of puzzle.cells) {
			puzzleCopy.cells.push([]);
			for (const cell of row) {
				puzzleCopy.cells[cell.row].push(new Cell(cell.row, cell.col, cell.value));
			}
		}

		puzzleCopy.cells[cell.row][cell.col].value = 0;
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
				const cell = this.solution.cells[row][col];

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
				this.solution.cells[cell.row][i].value === number ||
				this.solution.cells[i][cell.col].value === number
			) {
				return false;
			}
		}

		const startRow = cell.row - (cell.row % this.solution.boxSize);
		const startCol = cell.col - (cell.col % this.solution.boxSize);

		for (let row = 0; row < this.solution.boxSize; row++) {
			for (let col = 0; col < this.solution.boxSize; col++) {
				if (this.solution.cells[startRow + row][startCol + col].value === number) {
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
