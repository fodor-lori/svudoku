<script lang="ts">
	import { Board } from '$lib/Board';
	import SudokuBoard from '$lib/components/app/SudokuBoard.svelte';
	import type { Sudoku } from '$lib/SudokuGenerator';
	import { onMount } from 'svelte';

	let sudoku: Sudoku = $state({
		solution: new Board(),
		puzzle: new Board()
	});

	onMount(async () => {
		const result = await fetch('/api/generate');
		const { solution, puzzle } = await result.json();
		sudoku.solution = solution;
		sudoku.puzzle = puzzle;
	});
</script>

<main>
	<h1>Sudoku</h1>
	<div class="flex flex-row gap-4">
		{#if sudoku}
			<SudokuBoard board={sudoku.puzzle} />
			<SudokuBoard board={sudoku.solution} />
		{/if}
	</div>
</main>
