<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { useGameState } from '$lib/state.svelte';
	import { InputMode, type PuzzleType } from '$lib/types';
	import Pencil2 from 'svelte-radix/Pencil2.svelte';
	import Reset from 'svelte-radix/Reset.svelte';
	import DifficultySelection from './DifficultySelection.svelte';
	import NumberPad from './NumberPad.svelte';
	import ModeToggle from './ThemeSwitcher.svelte';

	const gameState = useGameState();
</script>

<div class="flex h-full max-w-72 flex-col justify-between rounded-sm">
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-1">
				<ToggleGroup.Root
					type="single"
					controlledValue
					value={gameState.puzzleType}
					onValueChange={(type) => {
						// TODO: fix this, because it doesn't work as expected due to type inference (most likely)
						gameState.puzzleType = type as PuzzleType;
						gameState.isNewGameDialogOpen = true;
					}}
				>
					<ToggleGroup.Item value="classic" class="flex flex-1 border">Classic</ToggleGroup.Item>
					<ToggleGroup.Item value="killer" class="flex flex-1 border">Killer</ToggleGroup.Item>
				</ToggleGroup.Root>
			</div>
			<div class="flex flex-row gap-1">
				<DifficultySelection />
				<ModeToggle />
			</div>
			<Button
				class="flex flex-1"
				onclick={() => {
					gameState.isNewGameDialogOpen = true;
				}}
			>
				New Game
			</Button>
		</div>
	</div>
	<div class="flex flex-col gap-2">
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
		<NumberPad />
	</div>
</div>
