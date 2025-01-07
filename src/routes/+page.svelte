<script lang="ts">
	import NewGameDialog from '$lib/components/app/dialogs/NewGameDialog.svelte';
	import SuccessDialog from '$lib/components/app/dialogs/SuccessDialog.svelte';
	import GameControlPanel from '$lib/components/app/GameControlPanel.svelte';
	import GameSelectionPanel from '$lib/components/app/GameSelectionPanel.svelte';
	import InputListener from '$lib/components/app/InputListener.svelte';
	import KillerSudokuGrid from '$lib/components/app/KillerSudokuGrid.svelte';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import { initGameState } from '$lib/state.svelte';
	import { onMount } from 'svelte';

	const gameState = initGameState();

	onMount(() => {
		if (gameState.grid.cells.length === 0) {
			gameState.loadPuzzle();
		}
	});
</script>

<InputListener />

<div class="flex h-full w-full flex-col gap-8 px-2">
	<div class="flex flex-1 flex-col">
		<span class="py-4 text-center text-xl font-black font-bold">Svudoku</span>
		<GameSelectionPanel />
	</div>
	<SudokuGrid />
	<div class="flex h-full flex-col">
		<GameControlPanel />
	</div>
</div>

<!-- <div class="grid min-h-screen grid-cols-[.5fr_auto_1fr] gap-[1rem] p-[1rem]">
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
		<div class="flex h-full max-w-72 flex-col justify-between rounded-sm">
			<GameSelectionPanel />
			<GameControlPanel />
		</div>
	</div>
</div> -->

<NewGameDialog />
<SuccessDialog />
