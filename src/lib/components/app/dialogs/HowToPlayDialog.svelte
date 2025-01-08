<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { useGameState } from '$lib/state.svelte';

	const gameState = useGameState();
</script>

<Dialog.Root
	controlledOpen
	open={gameState.isHowToPlayDialogOpen}
	onOpenChange={(open) => (gameState.isHowToPlayDialogOpen = open)}
>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>How to Play?</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<div class="flex flex-col gap-1">
				<span class="text-lg font-bold text-primary">Classic Sudoku</span>
				<span
					>Your goal is to fill the 9×9 grid with digits 1-9 so that each row, column and 3x3 box
					contains all of the digits <b>exactly once</b>.</span
				>
				<span class="text-md font-bold text-primary">Tips:</span>
				<ul class="list-disc pl-6">
					<li>The digits in each row, column and 3x3 box add up to 45.</li>
					<li>
						Use the 'Note' toggle to keep track of possible digits in a cell, if you're not sure.
					</li>
					<li>Press 'Undo' if you make a mistake and need to roll back a move.</li>
				</ul>

				<span class="mt-4 text-lg font-bold text-primary">Killer Sudoku</span>
				<span
					>All the Classic Sudoku rules (and tips) apply for Killer puzzles, but you begin with an
					empty grid where only <b>cages</b> and their <b>target sums</b> are given (shown in their top-left
					corner). Each cage’s digits must add up to its target sum and no two digits can repeat within
					the same cage.</span
				>
				<span class="text-md font-bold text-primary">Tips:</span>
				<ul class="list-disc pl-6">
					<li>
						The 45-sum rule (every row, column, and 3×3 box totals 45) is especially powerful when
						combined with cage sums.
					</li>
					<li>
						For example, a two-cell cage summing to 4 must be (1, 3) or (3, 1). Taking notes can be
						especially helpful in this mode.
					</li>
				</ul>
			</div>
		</Dialog.Description>
		<Dialog.Footer>
			<Button onclick={() => (gameState.isHowToPlayDialogOpen = false)}>Got it!</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
