export class Cell {
	row: number;
	col: number;
	value: number;

	constructor(row: number, col: number, value: number = 0) {
		this.row = row;
		this.col = col;
		this.value = value;
	}
}
