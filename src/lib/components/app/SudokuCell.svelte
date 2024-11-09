<script lang="ts">
	import { getGameState } from '$lib/state.svelte';
	import type { UICell } from '$lib/types';
	import { cn, isSameBox, numberColors } from '$lib/utils';

	type Props = {
		cell: UICell;
	};

	const { cell }: Props = $props();
	const gameState = getGameState();

	let isCorrect = $state(false);
	let background = $state('');

	$effect(() => {
		isCorrect = cell.value === cell.solution;

		if (!gameState.selectedCell) {
			return;
		}

		if (cell.value && !isCorrect && !cell.notes.length) {
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

<!--
	svelte-ignore
	a11y_click_events_have_key_events,
	a11y_no_static_element_interactions,
	a11y_no_noninteractive_tabindex
-->
<div
	class={cn(
		'flex h-full w-full items-center justify-center text-[36px] outline-none',
		!isCorrect && 'text-red-600',
		background || ''
	)}
	onclick={() => gameState.setSelectedCell(cell)}
>
	{#if cell.notes.length > 0}
		<div class="grid h-full w-full grid-cols-3 grid-rows-3 text-gray-500">
			{#each Array.from<number>({ length: 9 }) as _, index}
				<span class="text-sm">{cell.notes.includes(index + 1) ? index + 1 : ''}</span>
			{/each}
		</div>
	{:else}
		{cell.value || ''}
	{/if}
</div>
