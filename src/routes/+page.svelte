<script lang="ts">
	import ControlPanel from '$lib/components/app/ControlPanel.svelte';
	import GameOverDialog from '$lib/components/app/GameOverDialog.svelte';
	import InputListener from '$lib/components/app/InputListener.svelte';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import { gameState } from '$lib/state.svelte';
	import { loadGrid } from '$lib/utils';

	async function generateGrid() {
		const result = await loadGrid();
		gameState.grid = result;
	}
</script>

<InputListener />

<div class="grid min-h-screen grid-cols-[.5fr_auto_1fr] gap-[1rem] p-[1rem]">
	<div class="col-start-2 aspect-square h-[calc(100vh-2rem)] text-center">
		{#await generateGrid()}
			<p class="relative top-1/4">Creating new board...</p>
		{:then}
			<SudokuGrid />
		{/await}
	</div>

	<div class="col-start-3 h-[calc(100vh-2rem)]">
		<ControlPanel />
	</div>
</div>

<GameOverDialog />
