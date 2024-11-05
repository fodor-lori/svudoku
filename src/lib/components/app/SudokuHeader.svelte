<script lang="ts">
	import { getGameState } from '$lib/state.svelte';

	const gameState = getGameState();
</script>

<div class="flex w-full items-center justify-between">
	<span>Timer: 00:00</span>
	<span>Mistakes: {gameState.mistakes}/3</span>
</div>
