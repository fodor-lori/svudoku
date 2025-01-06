<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { useGameState } from '$lib/state.svelte';

	const titles = ['Yaay, you did it! 🎉', 'Good job! 👏🏼', 'Well done! 🥳'];
	const gameState = useGameState();
	let title: string = $state(getRandomTitle());

	function getRandomTitle() {
		return titles[Math.floor(Math.random() * titles.length)];
	}

	function startNewGame() {
		gameState.reset();
		gameState.loadPuzzle();
		title = getRandomTitle();
	}

	function notYet() {
		gameState.isSuccessDialogOpen = false;
		title = getRandomTitle();
	}
</script>

<Dialog.Root
	controlledOpen
	open={gameState.isSuccessDialogOpen}
	onOpenChange={(open) => (gameState.isSuccessDialogOpen = open)}
>
	<Dialog.Content onEscapeKeydown={notYet}>
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<p>You solved the puzzle successfully. Would you like to start a new game?</p>
		</Dialog.Description>
		<Dialog.Footer>
			<Button variant="outline" onclick={notYet}>Not yet</Button>
			<Button onclick={startNewGame}>New Game</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
