<script lang="ts">
	import { initGameState } from '$lib/state.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
	initGameState();
</script>

<svelte:head>
	<title>Svudoku</title>
</svelte:head>

<ModeWatcher defaultMode="dark" />
{@render children()}
