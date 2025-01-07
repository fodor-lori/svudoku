<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { useGameState } from '$lib/state.svelte';
	import { type PuzzleType } from '$lib/types';
	import DifficultySelection from './control-panel/DifficultySelection.svelte';
	import ModeToggle from './control-panel/ThemeSwitcher.svelte';

	const gameState = useGameState();
</script>

<div class="flex flex-col gap-1">
	<Button
		onclick={() => {
			gameState.isNewGameDialogOpen = true;
		}}
	>
		New Game
	</Button>
	<ToggleGroup.Root
		type="single"
		controlledValue
		value={gameState.puzzleType}
		onValueChange={(type: string) => {
			if (!type || type === gameState.puzzleType) return;
			gameState.puzzleType = type as PuzzleType;
			gameState.isNewGameDialogOpen = true;
		}}
	>
		<ToggleGroup.Item value="classic" class="flex-1 border">Classic</ToggleGroup.Item>
		<ToggleGroup.Item value="killer" class="flex-1 border">Killer</ToggleGroup.Item>
	</ToggleGroup.Root>
	<div class="flex flex-row gap-1">
		<DifficultySelection />
		<ModeToggle />
	</div>
</div>
