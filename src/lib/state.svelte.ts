import { getContext, setContext } from 'svelte';
import { Cell } from './Cell';

export class GameState {
	selectedCell: Cell | null = $state(null);

	mistakes: number = $state(0);
	isGameOverDialogOpen: boolean = $state(false);

	setSelectedCell(cell: Cell) {
		if (cell !== this.selectedCell) {
			this.selectedCell = cell;
		} else {
			this.selectedCell = null;
		}
	}

	reset() {
		this.mistakes = 0;
		this.selectedCell = null;
		this.isGameOverDialogOpen = false;
	}
}

const GRID_STATE_CTX = Symbol('GRID_STATE_CTX');

export function initGameState() {
	return setContext(GRID_STATE_CTX, new GameState());
}

export function getGameState() {
	return getContext<ReturnType<typeof initGameState>>(GRID_STATE_CTX);
}
