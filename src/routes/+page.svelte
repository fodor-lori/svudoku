<script lang="ts">
	import ControlPanel from '$lib/components/app/ControlPanel.svelte';
	import GameOverDialog from '$lib/components/app/GameOverDialog.svelte';
	import InputListener from '$lib/components/app/InputListener.svelte';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import SudokuHeader from '$lib/components/app/SudokuHeader.svelte';
	import { loadGrid } from '$lib/gameActions';
	import { gameState } from '$lib/state.svelte';
	import type { Grid } from '$lib/types';

	async function generateGrid() {
		const result = await loadGrid();
		gameState.grid = result;
	}
</script>

<InputListener />

<div class="grid min-h-screen grid-cols-[.5fr_auto_1fr] grid-rows-[auto_1fr] gap-2 p-4">
	{#await generateGrid()}
		<p>Loading...</p>
	{:then}
		<div class="col-start-2 row-start-1">
			<SudokuHeader />
		</div>
		<div
			class="col-start-2 row-start-2 aspect-square max-h-[calc(100vh-8rem)] items-center justify-center"
		>
			<SudokuGrid />
		</div>
	{/await}

	<div class="col-start-3 row-start-2">
		<ControlPanel />
	</div>
</div>

<GameOverDialog />
