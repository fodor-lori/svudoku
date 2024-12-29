import { Cage, Grid } from '../models';
import KillerSudokuSolver from '../solvers/KillerSudokuSolver';
import FilledGridGenerator from './FilledGridGenerator';

export default class KillerSudokuGenerator {
	private filledGridGenerator = new FilledGridGenerator();
	private solver = new KillerSudokuSolver();

	private cages: Cage[] = [];
	private grid: Grid = new Grid();

	generate() {
		this.grid = this.filledGridGenerator.generate();
		this.generateCages();
		return this.serialize(this.grid);
	}

	generateCages() {}

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
					value: solution.cells[cell.row][cell.col].value,
					solution: solution.cells[cell.row][cell.col].value,
					isClue: false
				}))
			});
		}

		return { cages };
	}
}
