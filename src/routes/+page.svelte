<script lang="ts">
	import { Board } from '$lib/Board';
	import SudokuBoard from '$lib/components/app/SudokuBoard.svelte';
	import { onMount } from 'svelte';

	let board: Board | null = $state(null);

	onMount(async () => {
		const result = await fetch('/api/generate');
		const data = await result.json();
		board = data.board;
	});
</script>

<main>
	<h1>Sudoku</h1>
	{#if board}
		<SudokuBoard {board} />
	{/if}
</main>
