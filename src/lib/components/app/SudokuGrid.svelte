<script lang="ts">
	import { useGameState } from '$lib/state.svelte';
	import SudokuCell from './SudokuCell.svelte';

	const gameState = useGameState();
</script>

<div class="grid aspect-square grid-cols-9 grid-rows-9">
	{#each gameState.grid.cells as row}
		{#each row as cell}
			<SudokuCell {cell} />
		{/each}
	{/each}
</div>

<!-- <div class="grid h-full w-full flex-1 grid-cols-9 grid-rows-9">
	{#each gameState.grid.cells as row}
		{#each row as cell}
			<SudokuCell {cell} />
		{/each}
	{/each}
</div> -->
