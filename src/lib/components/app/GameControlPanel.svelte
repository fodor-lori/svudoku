<script lang="ts">
	import { useGameState } from '$lib/state.svelte';
	import { InputMode } from '$lib/types';
	import { Button } from '$lib/components/ui/button';
	import Reset from 'svelte-radix/Reset.svelte';
	import Pencil2 from 'svelte-radix/Pencil2.svelte';
	import NumberPad from './control-panel/NumberPad.svelte';

	const gameState = useGameState();
</script>

<div class="flex flex-col gap-2">
	<NumberPad />
	<div class="flex gap-1">
		<Button variant="outline" onclick={() => gameState.undoLastChange()} class="flex flex-1 py-6">
			<div class="flex flex-col items-center">
				<div class="flex flex-row">
					<Reset class="mr-2" />
					Undo
				</div>
				<span class="text-xs text-muted-foreground">
					(Press <kbd class="ml-.5 text-xs font-bold">Z</kbd>)
				</span>
			</div>
		</Button>
		<Button
			variant={gameState.inputMode === InputMode.NOTE ? 'secondary' : 'outline'}
			onclick={() => gameState.toggleInputMode()}
			class="flex flex-1 py-6"
		>
			<div class="flex flex-col items-center">
				<div class="flex flex-row">
					<Pencil2 class="mr-2" />
					Notes
				</div>
				<span class="text-xs text-muted-foreground">
					(Press <kbd class="ml-.5 text-xs font-bold">Shift</kbd>)
				</span>
			</div>
		</Button>
	</div>
</div>
