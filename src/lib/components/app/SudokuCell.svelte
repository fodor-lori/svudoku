<script lang="ts">
	import { gameState } from '$lib/state.svelte';
	import type { Cell } from '$lib/types';
	import { cn, isSameBox } from '$lib/utils';

	type Props = {
		cell: Cell;
	};

	const { cell }: Props = $props();

	let isCorrect = $state(false);
	let background = $state('');

	$effect(() => {
		isCorrect = cell.value === cell.solution;

		if (!gameState.currentCell) {
			return;
		}

		if (cell.value && !isCorrect && !cell.notes.length) {
			background = 'bg-red-950';
		} else if (gameState.currentCell == cell) {
			background = 'bg-slate-700';
		} else if (cell.value !== 0 && cell.value === gameState.currentCell?.value) {
			background = 'bg-slate-800';
		} else if (
			cell.row === gameState.currentCell?.row ||
			cell.col === gameState.currentCell?.col ||
			isSameBox(cell, gameState.currentCell)
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
	onclick={() => gameState.setCurrentCell(cell)}
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
