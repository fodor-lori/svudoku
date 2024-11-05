<script lang="ts">
	import ControlPanel from '$lib/components/app/ControlPanel.svelte';
	import GameOverDialog from '$lib/components/app/GameOverDialog.svelte';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import SudokuHeader from '$lib/components/app/SudokuHeader.svelte';
	import { Grid } from '$lib/models';

	let sudoku = $state({
		solution: new Grid(),
		puzzle: new Grid()
	});

	async function generateNewGrid() {
		const result = await fetch('/api/generate');
		const { solution, puzzle } = await result.json();
		sudoku.solution = solution;
		sudoku.puzzle = puzzle;
	}
</script>

<div class="grid min-h-screen grid-cols-[.5fr_auto_1fr] grid-rows-[auto_1fr] gap-2 p-4">
	{#await generateNewGrid()}
		<p>Loading...</p>
	{:then}
		<div class="col-start-2 row-start-1">
			<SudokuHeader />
		</div>
		<div
			class="col-start-2 row-start-2 aspect-square max-h-[calc(100vh-8rem)] items-center justify-center"
		>
			<SudokuGrid puzzle={sudoku.puzzle} solution={sudoku.solution} />
		</div>
	{/await}

	<div class="col-start-3 row-start-2">
		<ControlPanel />
	</div>
</div>

<GameOverDialog />
