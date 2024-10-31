<script lang="ts">
	import { Cell } from '$lib/Cell';
	import { cn } from '$lib/utils';

	type Props = {
		cell: Cell;
		borderClass?: string;
	};

	const { cell, borderClass = '' }: Props = $props();

	const numberColors: Record<number, string> = {
		1: 'text-blue-600',
		2: 'text-green-600',
		3: 'text-red-600',
		4: 'text-yellow-600',
		5: 'text-orange-600',
		6: 'text-teal-600',
		7: 'text-pink-600',
		8: 'text-indigo-600',
		9: 'text-amber-600'
	};
</script>

<div
	class={cn(
		'flex h-full w-full items-center justify-center text-[36px]',
		cell.value ? numberColors[cell.value] : '',
		borderClass
	)}
>
	{cell.value}
</div>
