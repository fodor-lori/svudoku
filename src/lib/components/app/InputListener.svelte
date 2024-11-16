<script lang="ts">
	import { gameState } from '$lib/state.svelte';
	import { InputMode, type Grid } from '$lib/types';
	import { isSameBox } from '$lib/utils';

	function handleKeyboardInut(event: KeyboardEvent) {
		const key = event.key;

		if (key === 'Backspace' || key === 'Delete') {
			gameState.resetCurrentCell();
			return;
		}

		if (key === 'Shift') {
			gameState.toggleInputMode();
			return;
		}

		if (gameState.currentCell === null) return;

		const cell = gameState.currentCell;
		const grid = gameState.grid;

		if (key.match(/[1-9]/)) {
			if (cell.isClue) return;
			const parsedKey = parseInt(key);

			if (gameState.inputMode === InputMode.NOTE) {
				gameState.updateCurrentCellNotes(parsedKey);
				return;
			}

			if (gameState.updateCurrentCellValue(parsedKey)) {
				grid.cells.flat().forEach((c) => {
					if (c.row === cell.row || c.col === cell.col || isSameBox(c, cell)) {
						c.notes = c.notes.filter((note) => note !== parsedKey);
					}
				});
			}

			return;
		}

		if ((key === 'ArrowLeft' || key === 'a') && cell.col > 0) {
			gameState.setCurrentCell(grid.cells[cell.row][cell.col - 1]);
		}

		if ((key === 'ArrowRight' || key === 'd') && cell.col < 8) {
			gameState.setCurrentCell(grid.cells[cell.row][cell.col + 1]);
		}

		if ((key === 'ArrowUp' || key === 'w') && cell.row > 0) {
			gameState.setCurrentCell(grid.cells[cell.row - 1][cell.col]);
		}

		if ((key === 'ArrowDown' || key === 's') && cell.row < 8) {
			gameState.setCurrentCell(grid.cells[cell.row + 1][cell.col]);
		}
	}
</script>

<svelte:window onkeydown={handleKeyboardInut} />
