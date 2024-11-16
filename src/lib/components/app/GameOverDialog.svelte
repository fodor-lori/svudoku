<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { gameState } from '$lib/state.svelte';

	function startNewGame() {
		gameState.isGameOverDialogOpen = false;
		gameState.mistakeCount = 0;
	}

	function keepPlaying() {
		gameState.isGameOverDialogOpen = false;
		gameState.mistakeCount = 0;
	}
</script>

<Dialog.Root
	controlledOpen
	open={gameState.isGameOverDialogOpen}
	onOpenChange={(open) => (gameState.isGameOverDialogOpen = open)}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>You ran out of mistakes to made!</Dialog.Title>
		</Dialog.Header>
		<Dialog.Footer>
			<Button class="btn btn-primary" onclick={startNewGame}>New Game</Button>
			<Button class="btn btn-secondary" onclick={keepPlaying}>Keep Playing</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
