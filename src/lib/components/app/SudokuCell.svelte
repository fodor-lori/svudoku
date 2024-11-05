<script lang="ts">
	import { Cell } from '$lib/models';
	import { getGameState } from '$lib/state.svelte';
	import { cn, isSameBox, numberColors } from '$lib/utils';

	type Props = {
		cell: Cell;
		solution: number;
	};

	const { cell, solution }: Props = $props();
	const gameState = getGameState();

	let isCorrect = $state(false);
	let background = $state('');

	$effect(() => {
		isCorrect = cell.value === solution;
	});

	$effect(() => {
		if (!gameState.selectedCell) {
			return;
		}

		if (cell.value && !isCorrect) {
			background = 'bg-red-950';
		} else if (gameState.selectedCell == cell) {
			background = 'bg-slate-700';
		} else if (cell.value !== 0 && cell.value === gameState.selectedCell?.value) {
			background = 'bg-slate-800';
		} else if (
			cell.row === gameState.selectedCell?.row ||
			cell.col === gameState.selectedCell?.col ||
			isSameBox(cell, gameState.selectedCell)
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
	onclick={() => gameState.setSelectedCell(cell)}
	tabindex={-1}
>
	{cell.value || ''}
</button>
