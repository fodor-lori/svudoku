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
		<div class="flex flex-col gap-1.5">
			<div class="flex flex-col items-center">
				<span class="text-center text-2xl font-black">Svudoku</span>
			</div>
			<Button
				class="mt-2 flex flex-1"
				onclick={() => {
					gameState.isNewGameDialogOpen = true;
				}}
			>
				New Game
			</Button>
			<ToggleGroup.Root
				type="single"
				value={gameState.puzzleType}
				onValueChange={(type: string) => {
					if (!type || type === gameState.puzzleType) return;
					gameState.newPuzzleType = type as PuzzleType;
				}}
			>
				<ToggleGroup.Item value="classic" class="flex flex-1 border">Classic</ToggleGroup.Item>
				<ToggleGroup.Item value="killer" class="flex flex-1 border">Killer</ToggleGroup.Item>
			</ToggleGroup.Root>
			<div class="flex flex-row gap-1">
				<DifficultySelection />
				<ModeToggle />
			</div>
			<Button variant="outline" onclick={() => (gameState.isHowToPlayDialogOpen = true)}>
				How to Play?
			</Button>
		</div>
	</div>
	<div class="flex flex-col gap-2">
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
		<NumberPad />
	</div>
</div>
