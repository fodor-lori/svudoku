import { Cell } from './Cell';

export default class Grid {
	cells: Cell[][];
	size: number;
	boxSize: number;

	constructor(size: number = 9, sourceGrid?: Grid) {
		this.size = size;
		this.boxSize = Math.sqrt(this.size);

		if (sourceGrid) {
			this.cells = sourceGrid.cells.map((row) =>
				row.map((cell) => new Cell(cell.row, cell.col, cell.value, cell.isGiven))
			);
		} else {
			this.cells = Array.from({ length: this.size }, (_, row) =>
				Array.from({ length: this.size }, (_, col) => new Cell(row, col))
			);
		}
	}

	public getCell(row: number, col: number): Cell {
		return this.cells[row][col];
	}

	public setCellValue(row: number, col: number, value: number): void {
		const cell = this.getCell(row, col);
		cell.value = value;
	}

	public clone(): Grid {
		return new Grid(this.size, this);
	}
}
