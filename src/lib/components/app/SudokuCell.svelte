<script lang="ts">
	import { useGameState } from '$lib/state.svelte';
	import type { Cell } from '$lib/types';
	import { cn, isSameBox } from '$lib/utils';

	type Props = {
		cell: Cell;
	};

	const { cell }: Props = $props();

	const gameState = useGameState();
	const cage = $derived(
		gameState.grid.cages?.find((cage) => {
			if (cage.cells.some((c) => c.row === cell.row && c.col === cell.col)) {
				return cage;
			}
		})
	);

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

	const isTopLeftMostCell = $derived(() => {
		if (!cage) return false;
		const sortedCells = [...cage.cells].sort((a, b) => {
			if (a.row !== b.row) return a.row - b.row;
			return a.col - b.col;
		});

		const topLeftCell = sortedCells[0];
		return topLeftCell.row === cell.row && topLeftCell.col === cell.col;
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
		'flex aspect-square h-full w-full select-none rounded-sm border text-[36px]',
		cell.row % 3 == 0 && 'border-t-gray-400 dark:border-t-slate-600',
		cell.row % 3 == 2 && 'border-b-gray-400 dark:border-b-slate-600',
		cell.col % 3 == 0 && 'border-l-gray-400 dark:border-l-slate-600',
		cell.col % 3 == 2 && 'border-r-gray-400 dark:border-r-slate-600',
		!isCorrect && 'text-red-600',
		background
	)}
	onclick={() => gameState.setCurrentCell(cell)}
>
	<div
		class={cn(
			gameState.puzzleType == 'killer' &&
				'relative flex h-full w-full flex-1 items-center justify-center border-dashed border-white',
			cage && !cage.cells.some((c) => c.row == cell.row - 1 && c.col == cell.col) && 'border-t-2',
			cage && !cage.cells.some((c) => c.row == cell.row + 1 && c.col == cell.col) && 'border-b-2',
			cage && !cage.cells.some((c) => c.row == cell.row && c.col == cell.col - 1) && 'border-l-2',
			cage && !cage.cells.some((c) => c.row == cell.row && c.col == cell.col + 1) && 'border-r-2'
		)}
	>
		{#if gameState.puzzleType == 'killer' && isTopLeftMostCell()}
			<span class="absolute left-1 top-0 text-xs text-white">{cage?.sum}</span>
		{/if}
		{#if cell.notes.length > 0}
			<div class="gap-.5 grid grid-cols-3 grid-rows-3 text-gray-600 dark:text-gray-400">
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
			{cell.value || ''}
		{/if}
	</div>
</div>
