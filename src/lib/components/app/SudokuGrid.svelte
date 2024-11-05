<script lang="ts">
	import { Grid } from '$lib/Grid';
	import { getGameState, initGameState } from '$lib/state.svelte';
	import { cn } from '$lib/utils';
	import SudokuCell from './SudokuCell.svelte';

	type Props = {
		puzzle: Grid;
		solution: Grid;
	};

	const { puzzle, solution }: Props = $props();
	const gameState = getGameState();

	function handleKeyDown(event: KeyboardEvent) {
		if (gameState.selectedCell === null) return;

		const cell = gameState.selectedCell;
		const key = event.key;

		if (key.match(/[1-9]/)) {
			if (cell.isGiven) return;
			if (cell.value === parseInt(key)) {
				gameState.selectedCell.value = 0;
			} else {
				gameState.selectedCell.value = parseInt(key);
				if (gameState.selectedCell.value !== solution.cells[cell.row][cell.col].value) {
					gameState.mistakes++;

					if (gameState.mistakes === 3) {
						gameState.isGameOverDialogOpen = true;
					}
				}
			}
		}

		if (key === 'Backspace' && !cell.isGiven) {
			gameState.selectedCell.value = 0;
		}

		if (key === 'ArrowLeft' && cell.col > 0) {
			gameState.setSelectedCell(puzzle.cells[cell.row][cell.col - 1]);
		}

		if (key === 'ArrowRight' && cell.col < 8) {
			gameState.setSelectedCell(puzzle.cells[cell.row][cell.col + 1]);
		}

		if (key === 'ArrowUp' && cell.row > 0) {
			gameState.setSelectedCell(puzzle.cells[cell.row - 1][cell.col]);
		}

		if (key === 'ArrowDown' && cell.row < 8) {
			gameState.setSelectedCell(puzzle.cells[cell.row + 1][cell.col]);
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<table class="h-full w-full table-fixed border-collapse border-spacing-0 text-center outline-none">
	<tbody>
		{#each puzzle.cells as row, rowIndex}
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
						<SudokuCell {cell} solution={solution.cells[rowIndex][colIndex].value} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
