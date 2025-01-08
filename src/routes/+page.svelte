<script lang="ts">
	import { onMount } from 'svelte';
	import ControlPanel from '$lib/components/app/control-panel/ControlPanel.svelte';
	import InputListener from '$lib/components/app/InputListener.svelte';
	import KillerSudokuGrid from '$lib/components/app/KillerSudokuGrid.svelte';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import { initGameState } from '$lib/state.svelte';
	import HowToPlayDialog from '$lib/components/app/dialogs/HowToPlayDialog.svelte';
	import ConfirmDialog from '$lib/components/app/dialogs/ConfirmDialog.svelte';

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

<HowToPlayDialog />

<ConfirmDialog
	isOpen={gameState.isNewGameDialogOpen || gameState.newPuzzleType !== null}
	title="Start a new game?"
	description="You will lose all your progress in the current game. Are you sure?"
	confirmText="New game"
	onConfirm={() => {
		if (gameState.newPuzzleType) {
			gameState.puzzleType = gameState.newPuzzleType;
			gameState.newPuzzleType = null;
		}
		gameState.reset();
		gameState.loadPuzzle();
		gameState.isNewGameDialogOpen = false;
	}}
	cancelText="Keep playing"
	onCancel={() => {
		gameState.newPuzzleType = null;
		gameState.isNewGameDialogOpen = false;
	}}
	onEscape={() => {
		gameState.newPuzzleType = null;
		gameState.isNewGameDialogOpen = false;
	}}
/>

<ConfirmDialog
	isOpen={gameState.isSuccessDialogOpen}
	title={['Yaay, you did it! 🎉', 'Good job! 👏🏼', 'Well done! 🥳'][Math.floor(Math.random() * 3)]}
	description="You solved the puzzle successfully. Would you like to start a new game?"
	confirmText="New game"
	onConfirm={() => {
		gameState.reset();
		gameState.loadPuzzle();
	}}
	cancelText="Stay here"
	onCancel={() => (gameState.isSuccessDialogOpen = false)}
	onEscape={() => (gameState.isSuccessDialogOpen = false)}
/>

<ConfirmDialog
	isOpen={gameState.newDifficulty !== null}
	title={'Start a new game?'}
	description="Changing difficulty will start a new game and you will lose all your progress in the current one. Are you sure you want to continue?"
	confirmText="New game"
	onConfirm={() => {
		if (!gameState.newDifficulty) {
			return;
		}

		gameState.difficulty = gameState.newDifficulty;
		gameState.newDifficulty = null;
		gameState.reset();
		gameState.loadPuzzle();
	}}
	cancelText="Keep playing"
	onCancel={() => (gameState.newDifficulty = null)}
	onEscape={() => (gameState.newDifficulty = null)}
/>
