export default class Cell {
	row: number;
	col: number;
	value: number;
	notes: Set<number>;
	isGiven: boolean;

	constructor(row: number, col: number, value: number = 0, isGiven: boolean = false) {
		this.row = row;
		this.col = col;
		this.value = value;
		this.isGiven = isGiven;
		this.notes = new Set<number>();
	}
}
