<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { gameState } from '$lib/state.svelte';
	import { InputMode } from '$lib/types';
	import Pencil2 from 'svelte-radix/Pencil2.svelte';
	import Reset from 'svelte-radix/Reset.svelte';
	import DifficultySelection from './DifficultySelection.svelte';
	import NumberPad from './NumberPad.svelte';
	import ModeToggle from './ThemeSwitcher.svelte';
</script>

<div class="flex h-full max-w-72 flex-col justify-between rounded-sm">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-1">
			<Button class="flex flex-1" onclick={() => (gameState.isNewGameDialogOpen = true)}>
				New Game
			</Button>
			<DifficultySelection />
		</div>
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
			<ModeToggle />
		</div>
	</div>

	<div class="flex flex-col items-center gap-1">
		<p>Mistakes: {gameState.mistakeCount}/3</p>
	</div>
	<NumberPad />
</div>
