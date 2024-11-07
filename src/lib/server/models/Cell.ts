export class Cell {
	row: number;
	col: number;
	value: number;
	candidates: Set<number>;

	constructor(row: number, col: number, value: number = 0) {
		this.row = row;
		this.col = col;
		this.value = value;

		this.candidates = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		this.candidates.delete(value);
	}

	public isEmpty(): boolean {
		return this.value === 0;
	}
}
