import { getContext, setContext } from 'svelte';
import { Cell } from './Cell';

type SetGridState = {
	selectedCell: Cell | null;
};

export class GridState {
	selectedCell: Cell | null = $state(null);

	constructor(init: SetGridState) {
		this.selectedCell = init.selectedCell;
	}

	setSelectedCell(cell: Cell) {
		if (cell !== this.selectedCell) {
			this.selectedCell = cell;
		} else {
			this.selectedCell = null;
		}
	}
}

const GRID_STATE_CTX = Symbol('GRID_STATE_CTX');

export function setGridState(init: SetGridState) {
	return setContext(GRID_STATE_CTX, new GridState(init));
}

export function getGridState() {
	return getContext<ReturnType<typeof setGridState>>(GRID_STATE_CTX);
}
