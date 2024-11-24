<script lang="ts">
	import ControlPanel from '$lib/components/app/control-panel/ControlPanel.svelte';
	import GameOverDialog from '$lib/components/app/dialogs/GameOverDialog.svelte';
	import NewGameDialog from '$lib/components/app/dialogs/NewGameDialog.svelte';
	import InputListener from '$lib/components/app/InputListener.svelte';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import { initGameState } from '$lib/state.svelte';

	const gameState = initGameState();
</script>

<InputListener />

<div class="grid min-h-screen grid-cols-[.5fr_auto_1fr] gap-[1rem] p-[1rem]">
	<div class="col-start-2 aspect-square h-[calc(100vh-2rem)] text-center">
		{#if gameState.grid.cells.length === 0}
			{#await gameState.loadNewPuzzle()}
				<p class="relative top-1/4">Creating new board...</p>
			{:then}
				<SudokuGrid />
			{/await}
		{:else}
			<SudokuGrid />
		{/if}
	</div>

	<div class="col-start-3 h-[calc(100vh-2rem)]">
		<ControlPanel />
	</div>
</div>

<NewGameDialog />
<GameOverDialog />
