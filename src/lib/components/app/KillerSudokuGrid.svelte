<script lang="ts">
	import { useGameState } from '$lib/state.svelte';
	import SudokuCell from './SudokuCell.svelte';

	const gameState = useGameState();
</script>

<div class="gap-.5 grid grid-cols-9 grid-rows-9">
	{#each gameState.grid.cells as row}
		{#each row as cell}
			<SudokuCell {cell} />
		{/each}
	{/each}
</div>
