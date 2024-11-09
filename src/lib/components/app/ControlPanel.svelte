<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { getGameState } from '$lib/state.svelte';

	let gameState = getGameState();
</script>

<div class="flex flex-col items-start gap-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Difficulty</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-2">
			<div>
				<Button>Easy</Button>
				<Button>Medium</Button>
				<Button>Hard</Button>
				<Button>Extreme</Button>
			</div>
			<div>
				<Button onclick={() => (gameState.isNotesActive = !gameState.isNotesActive)}
					>Toggle Notes</Button
				>
			</div>
		</Card.Content>
	</Card.Root>
</div>
