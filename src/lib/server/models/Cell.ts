export default class Cell {
	value: number;
	row: number;
	col: number;
	candidates: Set<number>;

	constructor(row: number, col: number, value?: number) {
		this.row = row;
		this.col = col;
		this.value = value ?? 0;

		this.candidates = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
		this.candidates.delete(this.value);
	}

	isEmpty(): boolean {
		return this.value === 0;
	}

	setValue(value: number): void {
		this.value = value;
	}

	getValue(): number {
		return this.value;
	}

	setCandidates(candidates: Set<number>): void {
		this.candidates = candidates;
	}

	addCandidate(candidate: number): void {
		this.candidates.add(candidate);
	}

	removeCandidate(candidate: number): void {
		this.candidates.delete(candidate);
	}
}
