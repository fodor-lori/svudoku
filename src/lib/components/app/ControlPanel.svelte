<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Toggle } from '$lib/components/ui/toggle';
	import { getGameState } from '$lib/state.svelte';
	import Pencil2 from 'svelte-radix/Pencil2.svelte';

	let gameState = getGameState();
</script>

<div class="flex flex-col items-start gap-2">
	<Card.Root>
		<Card.Content class="flex flex-col gap-2">
			<div>
				<Toggle
					aria-label="Toggle notes"
					pressed={gameState.isNotesActive}
					onclick={() => (gameState.isNotesActive = !gameState.isNotesActive)}
				>
					<Pencil2 class="mr-2 size-4" />
					Notes
				</Toggle>
			</div>
		</Card.Content>
	</Card.Root>
</div>
