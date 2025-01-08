<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { useGameState } from '$lib/state.svelte';
	import type { Difficulty } from '$lib/types';

	const gameState = useGameState();

	const difficulties = [
		{
			value: 'easy',
			label: 'Easy'
		},
		{
			value: 'medium',
			label: 'Medium'
		},
		{
			value: 'hard',
			label: 'Hard'
		},
		{
			value: 'expert',
			label: 'Expert'
		}
	];

	const triggerContent = $derived(
		difficulties.find((d) => d.value === gameState.difficulty)?.label ?? 'Select difficulty'
	);
</script>

<Select.Root
	type="single"
	name="difficulty"
	onValueChange={(value) => {
		gameState.newDifficulty = value as Difficulty;
	}}
>
	<Select.Trigger class="w-full">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		{#each difficulties as difficulty}
			<Select.Item value={difficulty.value}>{difficulty.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
