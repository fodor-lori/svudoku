<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { useGameState } from '$lib/state.svelte';

	const gameState = useGameState();
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div class="grid grid-cols-3 gap-1.5">
	{#each numbers as number}
		<Button
			variant="secondary"
			onclick={() => gameState.updateCurrentCellValue(number)}
			class="flex aspect-square h-auto text-xl"
		>
			{number}
		</Button>
	{/each}
</div>
