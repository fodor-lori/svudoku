<script lang="ts">
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	let { children } = $props();
</script>

<svelte:head>
	<title>Svudoku</title>
</svelte:head>

<ModeWatcher defaultMode="dark" />
{@render children()}
