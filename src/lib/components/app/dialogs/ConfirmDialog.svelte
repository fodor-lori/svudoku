<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	type Props = {
		title: string;
		isOpen: boolean;
		description: string;
		confirmText: string;
		cancelText?: string;
		onConfirm: () => void;
		onCancel?: () => void;
		onEscape?: () => void;
	};

	let props: Props = $props();
</script>

<Dialog.Root controlledOpen open={props.isOpen} onOpenChange={(open) => (props.isOpen = open)}>
	<Dialog.Content onEscapeKeydown={() => props.onEscape?.()}>
		<Dialog.Header>
			<Dialog.Title>{props.title}</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<p>{props.description}</p>
		</Dialog.Description>
		<Dialog.Footer>
			<Button variant="outline" onclick={props.onCancel}>{props.cancelText}</Button>
			<Button onclick={props.onConfirm}>{props.confirmText}</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
