<script lang="ts">
	import { Cell } from '$lib/Cell';
	import { getGridState } from '$lib/state.svelte';
	import { cn, isSameBox, numberColors } from '$lib/utils';

	type Props = {
		cell: Cell;
		solution: number;
	};

	const { cell, solution }: Props = $props();
	const gridState = getGridState();

	let isCorrect = $state(false);
	let background = $state('');

	$effect(() => {
		isCorrect = cell.value === solution;
	});

	$effect(() => {
		if (!gridState.selectedCell) {
			return;
		}

		if (cell.value && !isCorrect) {
			background = 'bg-red-950';
		} else if (gridState.selectedCell == cell) {
			background = 'bg-slate-700';
		} else if (cell.value !== 0 && cell.value === gridState.selectedCell?.value) {
			background = 'bg-slate-800';
		} else if (
			cell.row === gridState.selectedCell?.row ||
			cell.col === gridState.selectedCell?.col ||
			isSameBox(cell, gridState.selectedCell)
		) {
			background = 'bg-slate-900';
		} else {
			background = '';
		}
	});
</script>

<button
	class={cn(
		'flex h-full w-full cursor-default items-center justify-center text-[36px] outline-none',
		cell.value && numberColors[cell.value],
		!isCorrect && 'text-red-600',
		background || ''
	)}
	onclick={() => gridState.setSelectedCell(cell)}
	tabindex={-1}
>
	{cell.value || ''}
</button>
