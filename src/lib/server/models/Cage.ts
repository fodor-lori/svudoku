import { Cell } from './';

export default class Cage {
	sum: number;
	cells: Cell[];

	constructor(cells?: Cell[], sum?: number) {
		this.sum = sum ?? 0;
		this.cells = cells ?? [];
	}

	addCell(cell: Cell): void {
		this.cells.push(cell);
		this.sum += cell.value;
	}

	removeCell(cell: Cell): void {
		this.cells = this.cells.filter((c) => c !== cell);
		this.sum -= cell.value;
	}
}
