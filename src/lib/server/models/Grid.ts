import { Cell } from './Cell';

export const GRID_SIZE = 9;
export const BOX_SIZE = Math.sqrt(GRID_SIZE);

export class Grid {
	cells: Cell[][];

	constructor(sourceGrid?: Grid) {
		if (sourceGrid) {
			this.cells = sourceGrid.cells.map((row) =>
				row.map((cell) => new Cell(cell.row, cell.col, cell.value))
			);

			return;
		}

		this.cells = Array.from({ length: GRID_SIZE }, (_, row) =>
			Array.from({ length: GRID_SIZE }, (_, col) => new Cell(row, col))
		);
	}

	getCell(row: number, col: number): Cell {
		return this.cells[row][col];
	}

	setCellValue(row: number, col: number, value: number) {
		this.cells[row][col].value = value;
		this.cells[row][col].candidates.delete(value);
	}

	clone(): Grid {
		return new Grid(this);
	}

	serialize(): string {
		return this.cells.map((row) => row.map((cell) => cell.value).join('')).join('');
	}
}
