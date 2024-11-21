<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { gameState } from '$lib/state.svelte';
	import { InputMode } from '$lib/types';
	import Pencil2 from 'svelte-radix/Pencil2.svelte';
	import Reset from 'svelte-radix/Reset.svelte';
</script>

<div class="flex h-full max-w-72 flex-col justify-between rounded-sm">
	<GameControls />
	<NumberPad />
</div>

{#snippet GameControls()}
	<div class="flex flex-col gap-4">
		<Button class="flex h-6 flex-1" onclick={() => (gameState.isNewGameDialogOpen = true)}>
			New Game
		</Button>
		<div class="flex gap-1">
			<Button variant="outline" onclick={() => gameState.undoLastChange()} class="flex flex-1">
				<Reset class="mr-2" />
				Undo
			</Button>
			<Button
				variant={gameState.inputMode === InputMode.NOTE ? 'secondary' : 'outline'}
				onclick={() => gameState.toggleInputMode()}
				class="flex flex-1"
			>
				<Pencil2 class="mr-2" />
				Notes
			</Button>
		</div>
	</div>
{/snippet}

{#snippet NumberPad()}
	{@const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9]}
	<div class="grid grid-cols-3 gap-1.5">
		{#each numberPad as number}
			<Button
				variant="secondary"
				onclick={() => gameState.updateCurrentCellValue(number)}
				class="flex aspect-square h-auto text-xl"
			>
				{number}
			</Button>
		{/each}
	</div>
{/snippet}
