import { Cage, Grid } from '../models';
import KillerSudokuSolver from '../solvers/KillerSudokuSolver';
import FilledGridGenerator from './FilledGridGenerator';

export default class KillerSudokuGenerator {
	private filledGridGenerator: FilledGridGenerator;
	private solver: KillerSudokuSolver;

	private cages: Cage[];
	private grid: Grid;

	constructor() {
		this.cages = [];
		this.grid = new Grid();
		this.solver = new KillerSudokuSolver();
		this.filledGridGenerator = new FilledGridGenerator();
	}

	generate() {
		this.grid = this.filledGridGenerator.generate();
		this.cages = [];

		this.generateCages();
		return this.serialize(this.grid);
	}

	private generateCages() {
		const cells = this.grid.cells.flat().sort(() => Math.random() - 0.5);
		this.cages = cells.map((cell) => new Cage([cell], cell.value));
		this.backtrack();
	}

	// Possizle optimizations for nicer looking puzzles:
	// - When nr of cages is approaching the expected max, start prioritizing neighboring 1-cell cages first
	// - Cap how many 6, 5 and 1 cell cages can there be
	// - Keep merging or revert backtracking when there are too crowded places (nr. of cages is too high)
	private backtrack(): boolean {
		if (this.cages.length <= 30) {
			return true;
		}

		for (let i = 0; i < this.cages.length; i++) {
			const cage = this.cages[i];
			const neighbors = this.findValidNeighborCages(cage).sort(() => Math.random() - 0.5);

			for (const neighbor of neighbors) {
				const mergedCage = this.mergeCages(cage, neighbor);

				if (mergedCage.cells.length >= 6) {
					this.unmergeCages(mergedCage, cage, neighbor);
					continue;
				}

				const puzzleHasUniqueSolution = this.solver.solve(this.cages);

				if (puzzleHasUniqueSolution) {
					if (this.backtrack()) {
						return true;
					}
				}

				this.unmergeCages(mergedCage, cage, neighbor);
			}
		}

		return false;
	}

	private findValidNeighborCages(cage: Cage): Cage[] {
		const neighbors = new Set<Cage>();
		const directions = [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0]
		];

		for (const cell of cage.cells) {
			for (const [dx, dy] of directions) {
				const newRow = cell.row + dx;
				const newCol = cell.col + dy;

				if (newRow < 0 || newRow >= 9 || newCol < 0 || newCol >= 9) continue;

				const neighborCell = this.grid.cells[newRow][newCol];
				const neighborCage = this.cages.find((c) => c.cells.includes(neighborCell));
				if (neighborCage && !cage.cells.includes(neighborCell)) {
					neighbors.add(neighborCage);
				}
			}
		}

		return [...neighbors];
	}

	private mergeCages(cage1: Cage, cage2: Cage) {
		const mergedCage = new Cage([...cage1.cells, ...cage2.cells], cage1.sum + cage2.sum);
		this.cages = this.cages.filter((c) => c !== cage1 && c !== cage2);
		this.cages.push(mergedCage);
		return mergedCage;
	}

	private unmergeCages(merged: Cage, cage1: Cage, cage2: Cage): void {
		this.cages = this.cages.filter((c) => c !== merged);

		this.cages.push(cage1);
		this.cages.push(cage2);
	}

	private serialize(solution: Grid) {
		const cages: {
			sum: number;
			cells: { row: number; col: number; value: number; solution: number; isClue: boolean }[];
		}[] = [];

		for (const cage of this.cages) {
			cages.push({
				sum: cage.sum,
				cells: cage.cells.map((cell) => ({
					row: cell.row,
					col: cell.col,
					value: 0,
					solution: solution.cells[cell.row][cell.col].value,
					isClue: false
				}))
			});
		}

		return { cages };
	}
}
