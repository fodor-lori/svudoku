<script lang="ts">
	import { Cell } from '$lib/Cell';
	import { getGridState } from '$lib/state.svelte';
	import { cn } from '$lib/utils';

	type Props = {
		cell: Cell;
	};

	const { cell }: Props = $props();
	const gridState = getGridState();

	const numberColors: Record<number, string> = {
		1: 'text-blue-600',
		2: 'text-green-600',
		3: 'text-red-600',
		4: 'text-yellow-600',
		5: 'text-orange-600',
		6: 'text-teal-600',
		7: 'text-pink-600',
		8: 'text-indigo-600',
		9: 'text-amber-600'
	};
</script>

<button
	class={cn(
		'flex h-full w-full cursor-default items-center justify-center text-[36px] outline-none',
		gridState.selectedCell == cell ? 'bg-slate-700' : '',
		cell.value ? numberColors[cell.value] : ''
	)}
	onclick={() => gridState.setSelectedCell(cell)}
	tabindex={-1}
>
	{cell.value || ''}
</button>
