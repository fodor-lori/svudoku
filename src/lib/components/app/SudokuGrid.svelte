<script lang="ts">
	import { getGameState } from '$lib/state.svelte';
	import type { UIGrid } from '$lib/types';
	import { cn, isSameBox } from '$lib/utils';
	import SudokuCell from './SudokuCell.svelte';

	type Props = {
		grid: UIGrid;
	};

	const { grid }: Props = $props();
	const gameState = getGameState();

	function handleKeyboardInut(event: KeyboardEvent) {
		if (gameState.selectedCell === null) return;

		const cell = gameState.selectedCell;
		const key = event.key;

		if (key.match(/[1-9]/)) {
			if (cell.isClue) return;

			if (gameState.isNotesActive) {
				if (gameState.selectedCell.notes.includes(parseInt(key))) {
					gameState.selectedCell.notes = gameState.selectedCell.notes.filter(
						(note) => note !== parseInt(key)
					);
				} else {
					gameState.selectedCell.notes.push(parseInt(key));
				}
				return;
			}

			gameState.selectedCell.notes = [];

			if (cell.value === parseInt(key)) {
				gameState.selectedCell.value = 0;
			} else {
				gameState.selectedCell.value = parseInt(key);

				grid.cells.flat().forEach((cell) => {
					if (
						cell.row === gameState.selectedCell!.row ||
						cell.col === gameState.selectedCell!.col ||
						isSameBox(cell, gameState.selectedCell!)
					) {
						cell.notes = cell.notes.filter((note) => note !== parseInt(key));
					}
				});

				if (gameState.selectedCell.value !== gameState.selectedCell.solution) {
					gameState.mistakes++;

					if (gameState.mistakes === 3) {
						gameState.isGameOverDialogOpen = true;
					}
				}
			}
		}

		if (key === 'Backspace' && !cell.isClue) {
			gameState.selectedCell.value = 0;
			gameState.selectedCell.notes = [];
		}

		if (key === 'ArrowLeft' && cell.col > 0) {
			gameState.setSelectedCell(grid.cells[cell.row][cell.col - 1]);
		}

		if (key === 'ArrowRight' && cell.col < 8) {
			gameState.setSelectedCell(grid.cells[cell.row][cell.col + 1]);
		}

		if (key === 'ArrowUp' && cell.row > 0) {
			gameState.setSelectedCell(grid.cells[cell.row - 1][cell.col]);
		}

		if (key === 'ArrowDown' && cell.row < 8) {
			gameState.setSelectedCell(grid.cells[cell.row + 1][cell.col]);
		}
	}
</script>

<svelte:window onkeydown={handleKeyboardInut} />

<table class="h-full w-full table-fixed border-collapse border-spacing-0 text-center outline-none">
	<tbody>
		{#each grid.cells as row, rowIndex}
			{@const isBottomBox = rowIndex % 3 === 2}
			{@const isFirstRow = rowIndex === 0}
			{@const isLastRow = rowIndex === 8}

			<tr>
				{#each row as cell, colIndex}
					{@const isRightBox = colIndex % 3 === 2}
					{@const isFirstCol = colIndex === 0}
					{@const isLastCol = colIndex === 8}

					<td
						class={cn(
							'border-2 border-gray-800 p-0 outline-none',
							isRightBox && !isLastCol && 'border-r-gray-500',
							isBottomBox && !isLastRow && 'border-b-gray-500',
							isFirstRow && 'border-t-gray-500',
							isLastRow && 'border-b-gray-500',
							isFirstCol && 'border-l-gray-500',
							isLastCol && 'border-r-gray-500'
						)}
					>
						<SudokuCell {cell} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
