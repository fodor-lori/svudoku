import { InputMode, type Cell, type Grid } from './types';

class GameState {
	grid: Grid = $state({ cells: [], size: 9, boxSize: 3 });
	currentCell: Cell | null = $state(null);

	mistakeCount: number = $state(0);
	inputMode: InputMode = $state(InputMode.VALUE);
	isGameOverDialogOpen: boolean = $state(false);

	setCurrentCell(cell: Cell) {
		if (cell !== this.currentCell) {
			this.currentCell = cell;
		} else {
			this.currentCell = null;
		}
	}

	resetCurrentCell() {
		if (this.currentCell && !this.currentCell.isClue) {
			this.currentCell.value = 0;
			this.currentCell.notes = [];
		}
	}

	updateCurrentCellValue(value: number) {
		if (!this.currentCell) {
			return;
		}

		this.currentCell.notes = [];

		if (this.currentCell.value === value) {
			this.currentCell.value = 0;
			return 0;
		}

		this.currentCell.value = value;

		if (this.currentCell.value !== this.currentCell.solution) {
			this.mistakeCount++;

			if (this.mistakeCount === 3) {
				this.isGameOverDialogOpen = true;
			}
		}

		return value;
	}

	updateCurrentCellNotes(note: number) {
		if (!this.currentCell) {
			return;
		}

		if (this.currentCell.notes.includes(note)) {
			this.currentCell.notes = this.currentCell.notes.filter((n) => n !== note);
			return;
		}

		this.currentCell.notes.push(note);
	}

	toggleInputMode() {
		this.inputMode = this.inputMode === InputMode.NOTE ? InputMode.VALUE : InputMode.NOTE;
	}

	reset() {
		this.mistakeCount = 0;
		this.currentCell = null;
		this.inputMode = InputMode.VALUE;
		this.isGameOverDialogOpen = false;
	}
}

export const gameState = new GameState();
