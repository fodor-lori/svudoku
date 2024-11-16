<script lang="ts">
	import { gameState } from '$lib/state.svelte';
</script>

<div class="flex w-full items-center justify-between">
	<span>Timer: 00:00</span>
	<span>Mistakes: {gameState.mistakeCount}/3</span>
</div>
