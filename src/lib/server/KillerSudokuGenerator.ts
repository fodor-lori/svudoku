import { FilledSudokuGenerator } from './FilledGridGenerator';
import { Cage } from './models/Cage';
import { Cell } from './models/Cell';
import { Grid } from './models/Grid';

export class KillerSudokuGenerator {
	private filledSudokuGenerator: FilledSudokuGenerator;
	private cages: Cage[];

	constructor() {
		this.filledSudokuGenerator = new FilledSudokuGenerator();
		this.cages = [];
	}

	private stringToGrid(solutionString: string): Grid {
		const grid: Grid = new Grid();
		for (let row = 0; row < 9; row++) {
			grid.cells[row] = [];
			for (let col = 0; col < 9; col++) {
				const index = row * 9 + col;
				const cell = new Cell(row, col, parseInt(solutionString[index]));
				grid.cells[row][col] = cell;
			}
		}
		return grid;
	}

	testGenerate() {
		const solutionString =
			'984672531257831649613549827378415962429763185561928374832157496196284753745396218';
		const solutionGrid = this.stringToGrid(solutionString);

		this.cages.push(new Cage([new Cell(0, 0), new Cell(0, 1), new Cell(0, 2)], 21));
		this.cages.push(new Cage([new Cell(1, 0), new Cell(1, 1), new Cell(2, 0)], 13));
		this.cages.push(new Cage([new Cell(2, 1)], 1));
		this.cages.push(new Cage([new Cell(0, 3), new Cell(1, 3), new Cell(1, 2)], 21));
		this.cages.push(new Cage([new Cell(0, 4), new Cell(1, 4)], 10));
		this.cages.push(new Cage([new Cell(0, 5), new Cell(1, 5)], 3));
		this.cages.push(new Cage([new Cell(0, 6), new Cell(1, 6)], 11));
		this.cages.push(new Cage([new Cell(0, 7), new Cell(0, 8)], 4));
		this.cages.push(
			new Cage(
				[
					new Cell(2, 2),
					new Cell(2, 3),
					new Cell(3, 2),
					new Cell(3, 3),
					new Cell(3, 4),
					new Cell(4, 3),
					new Cell(5, 3)
				],
				37
			)
		);
		this.cages.push(new Cage([new Cell(2, 4), new Cell(2, 5), new Cell(2, 6), new Cell(3, 5)], 26));
		this.cages.push(new Cage([new Cell(1, 7), new Cell(1, 8), new Cell(2, 7), new Cell(2, 8)], 22));
		this.cages.push(new Cage([new Cell(3, 0), new Cell(3, 1)], 10));
		this.cages.push(new Cage([new Cell(3, 6), new Cell(3, 7), new Cell(4, 7)], 23));
		this.cages.push(new Cage([new Cell(3, 8), new Cell(4, 8)], 7));
		this.cages.push(new Cage([new Cell(4, 0), new Cell(5, 0)], 9));
		this.cages.push(new Cage([new Cell(4, 1)], 2));
		this.cages.push(new Cage([new Cell(4, 2), new Cell(5, 2)], 10));
		this.cages.push(new Cage([new Cell(4, 4), new Cell(4, 5), new Cell(4, 6)], 10));
		this.cages.push(new Cage([new Cell(5, 4), new Cell(5, 5)], 10));
		this.cages.push(new Cage([new Cell(5, 6), new Cell(5, 7), new Cell(6, 6)], 14));
		this.cages.push(new Cage([new Cell(5, 8), new Cell(6, 7), new Cell(6, 8)], 19));
		this.cages.push(new Cage([new Cell(5, 1), new Cell(6, 1), new Cell(6, 2)], 11));
		this.cages.push(new Cage([new Cell(6, 3), new Cell(6, 4)], 6));
		this.cages.push(new Cage([new Cell(6, 5), new Cell(7, 5)], 11));
		this.cages.push(new Cage([new Cell(6, 0), new Cell(7, 0)], 9));
		this.cages.push(new Cage([new Cell(8, 0), new Cell(8, 1)], 11));
		this.cages.push(new Cage([new Cell(7, 1), new Cell(7, 2), new Cell(8, 2)], 20));
		this.cages.push(new Cage([new Cell(7, 3), new Cell(7, 4), new Cell(8, 3), new Cell(8, 4)], 22));
		this.cages.push(new Cage([new Cell(8, 5), new Cell(8, 6)], 8));
		this.cages.push(new Cage([new Cell(8, 7), new Cell(8, 8)], 9));
		this.cages.push(new Cage([new Cell(7, 6), new Cell(7, 7)], 12));
		this.cages.push(new Cage([new Cell(7, 8)], 3));

		return this.serialize(solutionGrid);
	}

	generate() {
		const solution = this.filledSudokuGenerator.generate();
		return this.serialize(solution);
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
