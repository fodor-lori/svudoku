<script lang="ts">
	import ControlPanel from '$lib/components/app/ControlPanel.svelte';
	import GameOverDialog from '$lib/components/app/GameOverDialog.svelte';
	import SudokuGrid from '$lib/components/app/SudokuGrid.svelte';
	import SudokuHeader from '$lib/components/app/SudokuHeader.svelte';
	import { loadNewGrid } from '$lib/gameActions';
	import type { UIGrid } from '$lib/types';

	let grid: UIGrid = $state({ cells: [], size: 9, boxSize: 3 }) as UIGrid;

	async function generateNewGrid() {
		const result = await loadNewGrid();
		grid.cells = result.cells;
		grid.size = result.size;
		grid.boxSize = result.boxSize;
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
			<SudokuGrid {grid} />
		</div>
	{/await}

	<div class="col-start-3 row-start-2">
		<ControlPanel />
	</div>
</div>

<GameOverDialog />
