<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Toggle } from '$lib/components/ui/toggle';
	import { gameState } from '$lib/state.svelte';
	import { InputMode } from '$lib/types';
	import Pencil2 from 'svelte-radix/Pencil2.svelte';
	import Reset from 'svelte-radix/Reset.svelte';
</script>

<div class="flex flex-col items-start gap-2">
	<Card.Root>
		<Card.Content class="flex flex-col gap-2">
			<div>
				<Button>
					<Reset class="mr-2" />
					Undo
				</Button>
				<Button
					variant={gameState.inputMode === InputMode.NOTE ? 'secondary' : 'outline'}
					onclick={() => gameState.toggleInputMode()}
				>
					<Pencil2 class="mr-2" />
					Notes
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
</div>
