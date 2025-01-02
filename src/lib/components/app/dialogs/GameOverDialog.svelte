<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { useGameState } from '$lib/state.svelte';

	const gameState = useGameState();

	function startNewGame() {
		gameState.reset();
		gameState.loadPuzzle();
	}

	function keepPlaying() {
		gameState.isGameOverDialogOpen = false;
		// gameState.mistakeCount = 0;
	}
</script>

<Dialog.Root
	controlledOpen
	open={gameState.isGameOverDialogOpen}
	onOpenChange={(open) => (gameState.isGameOverDialogOpen = open)}
>
	<Dialog.Content onEscapeKeydown={() => keepPlaying()}>
		<Dialog.Header>
			<Dialog.Title>Ran out of mistakes!</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<p>
				You've used up all your mistakes. Would you like to start fresh with a new game, or have
				another chance with this puzzle?
			</p>
		</Dialog.Description>
		<Dialog.Footer>
			<Button variant="outline" onclick={startNewGame}>New Game</Button>
			<Button onclick={keepPlaying}>Keep Playing</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
