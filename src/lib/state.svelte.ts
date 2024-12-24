import { browser } from '$app/environment';
import { getContext, setContext } from 'svelte';
import {
	InputMode,
	type Cell,
	type Difficulty,
	type Grid,
	type PuzzleType,
	type StateChange
} from './types';
import { fetchKillerPuzzle, fetchSudokuPuzzle, isSameBox } from './utils';

class GameState {
	grid: Grid = $state({ cells: [], size: 9, boxSize: 3, cages: [] });
	currentCell: Cell | null = $state(null);
	history: StateChange[] = $state([]);

	mistakeCount: number = $state(0);
	difficulty: Difficulty = $state('easy');
	inputMode: InputMode = $state(InputMode.VALUE);
	puzzleType: PuzzleType = $state('classic');

	isGameOverDialogOpen: boolean = $state(false);
	isNewGameDialogOpen: boolean = $state(false);

	constructor() {
		// if (browser) {
		// 	const savedState = localStorage.getItem('game-state');
		// 	if (savedState) {
		// 		const parsedState = JSON.parse(savedState);
		// 		this.grid = parsedState.grid;
		// 		this.history = parsedState.history;
		// 		this.mistakeCount = parsedState.mistakeCount;
		// 		this.puzzleType = parsedState.puzzleType;
		// 	}
		// }
		// $effect(() => {
		// 	if (browser) {
		// 		localStorage.setItem(
		// 			'game-state',
		// 			JSON.stringify({
		// 				grid: this.grid,
		// 				history: this.history,
		// 				mistakeCount: this.mistakeCount,
		// 				puzzleType: this.puzzleType
		// 			})
		// 		);
		// 	}
		// });
	}

	setCurrentCell(cell: Cell) {
		if (cell !== this.currentCell) {
			this.currentCell = cell;
		} else {
			this.currentCell = null;
		}
	}

	updateCurrentCellValue(value: number) {
		if (this.currentCell === null || this.currentCell.isClue) {
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
			this.history.push({
				target: {
					...this.currentCell,
					notes: [...this.currentCell.notes]
				},
				type: this.inputMode,
				affectedCells: [] as Cell[]
			});

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
		this.grid.cages = [];
		this.mistakeCount = 0;
		this.currentCell = null;
		this.inputMode = InputMode.VALUE;
		this.isGameOverDialogOpen = false;
		this.isNewGameDialogOpen = false;
	}

	async loadPuzzle() {
		if (this.puzzleType === 'killer') {
			await this.loadKillerPuzzle();
		} else {
			await this.loadSudokuPuzzle();
		}
	}

	private async loadSudokuPuzzle() {
		const result = await fetchSudokuPuzzle();
		this.grid = result;
	}

	private async loadKillerPuzzle() {
		const result = await fetchKillerPuzzle();
		this.grid = result;
	}
}

const GAME_STATE_CTX = Symbol('GAME_STATE_CTX');

export function initGameState() {
	return setContext(GAME_STATE_CTX, new GameState());
}

export function useGameState() {
	return getContext<ReturnType<typeof initGameState>>(GAME_STATE_CTX);
}
