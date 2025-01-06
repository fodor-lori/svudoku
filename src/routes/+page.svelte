<script lang="ts">
	import { onMount } from 'svelte';
	import ControlPanel from '$lib/components/app/control-panel/ControlPanel.svelte';
	import SuccessDialog from '$lib/components/app/dialogs/SuccessDialog.svelte';
	import NewGameDialog from '$lib/components/app/dialogs/NewGameDialog.svelte';
	import InputListener from '$lib/components/app/InputListener.svelte';
	import KillerSudokuGrid from '$lib/components/app/KillerSudokuGrid.svelte';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import { initGameState } from '$lib/state.svelte';

	const gameState = initGameState();

	onMount(() => {
		if (gameState.grid.cells.length === 0) {
			gameState.loadPuzzle();
		}
	});
</script>

<InputListener />

<div class="grid min-h-screen grid-cols-[.5fr_auto_1fr] gap-[1rem] p-[1rem]">
	<div class="col-start-2 aspect-square h-[calc(100vh-2rem)] text-center">
		{#if gameState.isBoardLoading}
			<p class="relative top-1/4 text-black dark:text-white">Creating new board...</p>
		{:else if gameState.puzzleType === 'killer'}
			<KillerSudokuGrid />
		{:else}
			<SudokuGrid />
		{/if}
	</div>
	<div class="col-start-3 h-[calc(100vh-2rem)]">
		<ControlPanel />
	</div>
</div>

<NewGameDialog />
<SuccessDialog />
