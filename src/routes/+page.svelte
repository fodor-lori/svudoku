<script lang="ts">
	import { Grid } from '$lib/Grid';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import type { Sudoku } from '$lib/SudokuGenerator';

	let sudoku: Sudoku = $state({
		solution: new Grid(),
		puzzle: new Grid()
	});

	async function getGrid() {
		const result = await fetch('/api/generate');
		const { solution, puzzle } = await result.json();
		sudoku.solution = solution;
		sudoku.puzzle = puzzle;
	}
</script>

<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
	{#await getGrid()}
		<p>Loading...</p>
	{:then}
		<SudokuGrid puzzle={sudoku.puzzle} solution={sudoku.solution} />
	{/await}
</div>
