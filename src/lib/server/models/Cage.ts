import type { Cell } from './Cell';

export class Cage {
	public sum: number;
	public cells: Cell[];

	constructor(cells?: Cell[], sum?: number) {
		this.sum = sum ?? cells?.reduce((sum, cell) => sum + cell.value, 0) ?? 0;
		this.cells = cells ?? [];
	}

	public addCell(cell: Cell) {
		this.cells.push(cell);
		this.sum += cell.value;
	}

	public removeCell(cell: Cell) {
		this.cells = this.cells.filter((c) => c !== cell);
		this.sum -= cell.value;
	}
}
