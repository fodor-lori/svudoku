import { Cage, Grid } from '../models';

export default class KillerSudokuSolver {
	private grid: Grid = new Grid();
	private cages: Cage[] = [];
	private solutionCount = 0;

	solve(cages: Cage[]): boolean {
		this.cages = [...cages];
		this.initSolver();
		this.fillSingleCellCages();

		this.solveCage(0);
		return this.solutionCount === 1;
	}

	private initSolver(): void {
		this.solutionCount = 0;
		this.grid = new Grid();

		this.cages.forEach((cage) => {
			cage.cells.forEach(
				(cell) => (cell.candidates = this.grid.cells[cell.row][cell.col].candidates)
			);
		});

		this.cages.sort((a, b) => {
			if (a.cells.length === b.cells.length) {
				return a.sum - b.sum;
			}

			return a.cells.length - b.cells.length;
		});
	}

	private solveCage(cageIndex: number): boolean {
		if (cageIndex >= this.cages.length) {
			this.solutionCount++;
			return this.solutionCount < 2;
		}

		if (this.solutionCount > 1) {
			return false;
		}

		const cage = this.cages[cageIndex];
		const combinations = this.fillCageCombinations(cage);

		for (const combo of combinations) {
			if (this.placeCombination(cage, combo)) {
				const canContinue = this.solveCage(cageIndex + 1);
				this.revertCage(cage);

				if (!canContinue) {
					return false;
				}
			}
		}

		return this.solutionCount < 2;
	}

	private fillCageCombinations(cage: Cage): number[][] {
		const solutions: number[][] = [];

		function backtrack(
			index: number,
			chosenValues: number[],
			usedValues: Set<number>,
			currentSum: number
		) {
			if (index === cage.cells.length) {
				if (currentSum === cage.sum) {
					solutions.push([...chosenValues]);
				}
				return;
			}

			for (const candidate of cage.cells[index].candidates) {
				if (usedValues.has(candidate)) continue;
				if (currentSum + candidate > cage.sum) continue;

				usedValues.add(candidate);
				chosenValues.push(candidate);

				backtrack(index + 1, chosenValues, usedValues, currentSum + candidate);

				chosenValues.pop();
				usedValues.delete(candidate);
			}
		}

		backtrack(0, [], new Set(), 0);
		return solutions;
	}

	private placeCombination(cage: Cage, combo: number[]): boolean {
		for (let i = 0; i < cage.cells.length; i++) {
			const cell = cage.cells[i];
			const row = cell.row;
			const col = cell.col;
			const value = combo[i];

			if (!this.isPlacementValid(row, col, value)) {
				return false;
			}
		}

		for (let i = 0; i < cage.cells.length; i++) {
			const cell = cage.cells[i];
			const row = cell.row;
			const col = cell.col;
			const value = combo[i];
			this.grid.setCell(row, col, value);
		}

		return true;
	}

	private revertCage(cage: Cage): void {
		for (let i = 0; i < cage.cells.length; i++) {
			const cell = cage.cells[i];
			this.grid.clearCell(cell.row, cell.col);
		}
	}

	private isPlacementValid(row: number, col: number, value: number): boolean {
		if (this.grid.isValueUsedInRow(row, value)) {
			return false;
		}
		if (this.grid.isValueUsedInCol(col, value)) {
			return false;
		}
		if (this.grid.isValueUsedInBox(row, col, value)) {
			return false;
		}

		return true;
	}

	private fillSingleCellCages(): void {
		const singleCellCages = this.cages.filter((cage) => cage.cells.length === 1);

		for (const cage of singleCellCages) {
			this.grid.setCell(cage.cells[0].row, cage.cells[0].col, cage.sum);
		}

		this.cages = this.cages.filter((cage) => !singleCellCages.includes(cage));
	}
}
