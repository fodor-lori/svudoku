<script lang="ts">
	import { useGameState } from '$lib/state.svelte';
	import SudokuCell from './SudokuCell.svelte';

	const gameState = useGameState();
</script>

<div class="grid grid-rows-3 gap-1">
	{#each [0, 1, 2] as rowBlock}
		<div class="grid grid-cols-3 gap-1">
			{#each [0, 1, 2] as colBlock}
				<div class="grid grid-cols-3 grid-rows-3 gap-0">
					{#each [0, 1, 2] as r}
						{#each [0, 1, 2] as c}
							<SudokuCell cell={gameState.grid.cells[rowBlock * 3 + r][colBlock * 3 + c]} />
						{/each}
					{/each}
				</div>
			{/each}
		</div>
	{/each}
</div>
