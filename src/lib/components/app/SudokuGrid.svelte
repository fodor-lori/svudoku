<script lang="ts">
	import { gameState } from '$lib/state.svelte';
	import { cn } from '$lib/utils';
	import SudokuCell from './SudokuCell.svelte';

	$inspect(gameState.history);
</script>

<table class="h-full w-full table-fixed border-collapse border-spacing-0 text-center outline-none">
	<tbody>
		{#each gameState.grid.cells as row, rowIndex}
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
