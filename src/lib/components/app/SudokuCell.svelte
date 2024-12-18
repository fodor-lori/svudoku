<script lang="ts">
	import { useGameState } from '$lib/state.svelte';
	import type { Cell } from '$lib/types';
	import { cn, isSameBox } from '$lib/utils';

	const gameState = useGameState();
	const cages = gameState.grid.cages;

	type Props = {
		cell: Cell;
	};

	const { cell }: Props = $props();

	const cage = cages?.find((cage) => {
		if (cage.cells.some((c) => c.row === cell.row && c.col === cell.col)) {
			return cage;
		}
	});

	let isCorrect = $state(false);
	let background = $state('');

	$effect(() => {
		isCorrect = cell.value === cell.solution;

		if (!gameState.currentCell) {
			background = '';
			return;
		}

		if (cell.value && !isCorrect && !cell.notes.length) {
			background = 'dark:bg-red-950 bg-red-200';
		} else if (gameState.currentCell == cell) {
			background = 'dark:bg-gray-700 bg-gray-400';
		} else if (cell.value !== 0 && cell.value === gameState.currentCell?.value) {
			background = 'dark:bg-gray-800 bg-gray-300';
		} else if (
			cell.row === gameState.currentCell?.row ||
			cell.col === gameState.currentCell?.col ||
			isSameBox(cell, gameState.currentCell)
		) {
			background = 'dark:bg-gray-900 bg-gray-200';
		} else {
			background = '';
		}
	});
</script>

<!--
	svelte-ignore
	a11y_click_events_have_key_events,
	a11y_no_static_element_interactions,
	a11y_no_noninteractive_tabindex
-->
<div
	class={cn(
		'flex aspect-square select-none items-center justify-center rounded-sm border text-[36px]',
		cell.row % 3 == 0 && 'border-t-gray-400 dark:border-t-slate-600',
		cell.row % 3 == 2 && 'border-b-gray-400 dark:border-b-slate-600',
		cell.col % 3 == 0 && 'border-l-gray-400 dark:border-l-slate-600',
		cell.col % 3 == 2 && 'border-r-gray-400 dark:border-r-slate-600',
		!isCorrect && 'text-red-600',
		background
	)}
	onclick={() => gameState.setCurrentCell(cell)}
>
	{#if cell.notes.length > 0}
		<div class="grid grid-cols-3 grid-rows-3 gap-1.5 text-gray-600 dark:text-gray-400">
			{#each Array.from<number>({ length: 9 }) as _, index}
				<span
					class={cn(
						'aspect-square text-sm',
						index + 1 === gameState.currentCell?.value && 'font-bold text-black dark:text-white'
					)}
				>
					{cell.notes.includes(index + 1) ? index + 1 : ''}</span
				>
			{/each}
		</div>
	{:else}
		<div
			class={cn(
				'h-full w-full border-dashed border-white',
				cage && !cage.cells.some((c) => c.row == cell.row - 1 && c.col == cell.col) && 'border-t',
				cage && !cage.cells.some((c) => c.row == cell.row + 1 && c.col == cell.col) && 'border-b',
				cage && !cage.cells.some((c) => c.row == cell.row && c.col == cell.col - 1) && 'border-l',
				cage && !cage.cells.some((c) => c.row == cell.row && c.col == cell.col + 1) && 'border-r'
			)}
		>
			{cell.value || ''}
		</div>
	{/if}
</div>
