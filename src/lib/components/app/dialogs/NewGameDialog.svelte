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
		gameState.isNewGameDialogOpen = false;
	}
</script>

<Dialog.Root
	controlledOpen
	open={gameState.isNewGameDialogOpen}
	onOpenChange={(open) => (gameState.isNewGameDialogOpen = open)}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Start a new game?</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<p>You will lose all your progress in the current game. Are you sure?</p>
		</Dialog.Description>
		<Dialog.Footer>
			<Button variant="outline" onclick={startNewGame}>Yes, I'm sure</Button>
			<Button onclick={keepPlaying}>Keep Playing</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
