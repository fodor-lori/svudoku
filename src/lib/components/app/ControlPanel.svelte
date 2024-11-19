<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { gameState } from '$lib/state.svelte';
	import { InputMode } from '$lib/types';
	import Pencil2 from 'svelte-radix/Pencil2.svelte';
	import Reset from 'svelte-radix/Reset.svelte';

	let handleNumberClick = (number: number) => {
		gameState.updateCurrentCellValue(number);
	};
</script>

<div class="flex w-full flex-col items-start gap-2">
	<Card.Root>
		<Card.Content class="flex w-full flex-col gap-4">
			<GameControls />
			<NumberPad />
		</Card.Content>
	</Card.Root>
</div>

{#snippet GameControls()}
	<div class="flex gap-1">
		<Button onclick={() => gameState.undoLastChange()} class="flex flex-1">
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
{/snippet}

{#snippet NumberPad()}
	{@const numberPad = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	]}
	<div class="flex h-full w-full flex-1 flex-col gap-1">
		{#each numberPad as row}
			<div class="flex gap-1">
				{#each row as number}
					<Button
						variant="secondary"
						onclick={() => handleNumberClick(number)}
						class="flex aspect-square h-auto flex-1"
					>
						{number}
					</Button>
				{/each}
			</div>
		{/each}
	</div>
{/snippet}
