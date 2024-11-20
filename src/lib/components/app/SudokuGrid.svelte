<script lang="ts">
	import { gameState } from '$lib/state.svelte';
	import { cn } from '$lib/utils';
	import SudokuCell from './SudokuCell.svelte';
</script>

<div class="grid grid-cols-9 grid-rows-9 gap-1">
	{#each gameState.grid.cells as row}
		{#each row as cell}
			<SudokuCell {cell} />
		{/each}
	{/each}
</div>
