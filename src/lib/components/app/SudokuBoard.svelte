<script lang="ts">
	import { Board } from '$lib/Board';
	import { cn } from '$lib/utils';
	import SudokuCell from './SudokuCell.svelte';

	type Props = {
		board: Board;
	};

	const { board }: Props = $props();
</script>

<table class="border-collapse border-spacing-0">
	<tbody>
		{#each board.cells as row, rowIndex}
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
							'h-20 w-20 p-0',
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
