import { InputMode, type Cell, type Grid, type StateChange } from './types';
import { isSameBox, loadGrid } from './utils';

class GameState {
	grid: Grid = $state({ cells: [], size: 9, boxSize: 3 });
	currentCell: Cell | null = $state(null);
	history: StateChange[] = $state([]);

	mistakeCount: number = $state(0);
	inputMode: InputMode = $state(InputMode.VALUE);
	isGameOverDialogOpen: boolean = $state(false);
	isNewGameDialogOpen: boolean = $state(false);

	setCurrentCell(cell: Cell) {
		if (cell !== this.currentCell) {
			this.currentCell = cell;
		} else {
			this.currentCell = null;
		}
	}

	updateCurrentCellValue(value: number) {
		if (this.currentCell === null) {
			return;
		}

		const historyEntry = {
			target: {
				...this.currentCell,
				notes: [...this.currentCell.notes]
			},
			type: InputMode.VALUE,
			affectedCells: [] as Cell[]
		};

		this.currentCell.notes = [];

		if (this.currentCell.value === value) {
			this.currentCell.value = 0;
			this.history.push(historyEntry);
			return;
		}

		this.currentCell.value = value;
		const cell = this.currentCell;

		this.grid.cells.flat().forEach((c) => {
			if (
				(c.row === cell.row || c.col === cell.col || isSameBox(c, cell)) &&
				c.notes.includes(value)
			) {
				historyEntry.affectedCells.push({
					...c,
					notes: [...c.notes]
				});
				c.notes = c.notes.filter((note) => note !== value);
			}
		});

		this.history.push(historyEntry);

		if (cell.value !== cell.solution) {
			this.mistakeCount++;

			if (this.mistakeCount === 3) {
				this.isGameOverDialogOpen = true;
			}
		}
	}

	updateCurrentCellNotes(note: number) {
		if (!this.currentCell) {
			return;
		}

		this.history.push({
			target: {
				...this.currentCell,
				notes: [...this.currentCell.notes]
			},
			type: InputMode.NOTE
		});

		if (this.currentCell.notes.includes(note)) {
			this.currentCell.notes = this.currentCell.notes.filter((n) => n !== note);
		} else {
			this.currentCell.notes.push(note);
		}
	}

	resetCurrentCell() {
		if (this.currentCell && !this.currentCell.isClue) {
			this.currentCell.value = 0;
			this.currentCell.notes = [];
		}
	}

	undoLastChange() {
		const change = this.history.pop();

		if (!change) {
			return;
		}

		if (change.type === InputMode.NOTE) {
			this.grid.cells[change.target.row][change.target.col].notes = [...change.target.notes];
			return;
		}

		this.grid.cells[change.target.row][change.target.col].value = change.target.value;

		if (change.affectedCells) {
			change.affectedCells.forEach((cell) => {
				this.grid.cells[cell.row][cell.col].notes = [...cell.notes];
			});
		}
	}

	toggleInputMode() {
		this.inputMode = this.inputMode === InputMode.NOTE ? InputMode.VALUE : InputMode.NOTE;
	}

	reset() {
		this.history = [];
		this.grid.cells = [];
		this.mistakeCount = 0;
		this.currentCell = null;
		this.inputMode = InputMode.VALUE;
		this.isGameOverDialogOpen = false;
		this.isNewGameDialogOpen = false;
	}

	async loadNewGrid() {
		const result = await loadGrid();
		this.grid = result;
	}
}

export const gameState = new GameState();
