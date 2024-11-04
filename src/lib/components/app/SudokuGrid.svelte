<script lang="ts">
	import { Grid } from '$lib/Grid';
	import { setGridState } from '$lib/state.svelte';
	import { cn } from '$lib/utils';
	import SudokuCell from './SudokuCell.svelte';

	type Props = {
		puzzle: Grid;
		solution: Grid;
	};

	const { puzzle, solution }: Props = $props();

	const gridState = setGridState({ selectedCell: null });

	function handleKeyDown(event: KeyboardEvent) {
		if (gridState.selectedCell === null) return;

		const cell = gridState.selectedCell;
		const key = event.key;

		if (key.match(/[1-9]/)) {
			if (cell.isGiven) return;
			if (cell.value === parseInt(key)) {
				gridState.selectedCell.value = 0;
			} else {
				gridState.selectedCell.value = parseInt(key);
			}
		}

		if (key === 'Backspace' && !cell.isGiven) {
			gridState.selectedCell.value = 0;
		}

		if (key === 'ArrowLeft' && cell.col > 0) {
			gridState.setSelectedCell(puzzle.cells[cell.row][cell.col - 1]);
		}

		if (key === 'ArrowRight' && cell.col < 8) {
			gridState.setSelectedCell(puzzle.cells[cell.row][cell.col + 1]);
		}

		if (key === 'ArrowUp' && cell.row > 0) {
			gridState.setSelectedCell(puzzle.cells[cell.row - 1][cell.col]);
		}

		if (key === 'ArrowDown' && cell.row < 8) {
			gridState.setSelectedCell(puzzle.cells[cell.row + 1][cell.col]);
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<table class="border-collapse border-spacing-0 outline-none">
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
							'h-20 w-20 p-0 outline-none',
							'border-2 border-gray-800',
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
