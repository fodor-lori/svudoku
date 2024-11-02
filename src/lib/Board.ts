import { Cell } from './Cell';

export class Board {
	public cells: Cell[][] = [];
	public solution: Cell[][] = [];
	public size: number = 9;
	public boxSize: number = 3;

	public print() {
		for (const row of this.cells) {
			console.log(row.map((cell) => cell.value).join('  '));
		}
		console.log('\n');
	}
}
