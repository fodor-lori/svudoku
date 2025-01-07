<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { useGameState } from '$lib/state.svelte';

	const gameState = useGameState();
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div class="grid grid-cols-5 gap-1">
	{#each numbers as number}
		<Button
			class="aspect-square h-full"
			variant="secondary"
			onclick={() => gameState.updateCurrentCellValue(number)}
		>
			{number}
		</Button>
	{/each}
	<Button
		class="aspect-square h-full"
		variant="secondary"
		onclick={() => gameState.updateCurrentCellValue(0)}
	>
		<div class="flex flex-col">
			<span class="text-xs">Clear</span>
			<span class="hidden text-xs text-muted-foreground md:block"
				>(Press <kbd class="ml-.5 text-xs font-bold">Backspace</kbd>/<kbd class="text-xs font-bold"
					>Delete</kbd
				>)</span
			>
		</div>
	</Button>
</div>

<!-- <div class="grid grid-cols-3 gap-1.5">
	{#each numbers as number}
		<Button
			variant="secondary"
			onclick={() => gameState.updateCurrentCellValue(number)}
			class="flex aspect-square h-auto text-xl"
		>
			{number}
		</Button>
	{/each}
	<Button
		variant="secondary"
		onclick={() => gameState.updateCurrentCellValue(0)}
		class="text-md col-span-3 h-12"
	>
		<div class="flex flex-col">
			<span class="text-xs">Clear</span>
			<span class="text-xs text-muted-foreground"
				>(Press <kbd class="ml-.5 text-xs font-bold">Backspace</kbd>/<kbd class="text-xs font-bold"
					>Delete</kbd
				>)</span
			>
		</div>
	</Button>
</div> -->
