<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-start gap-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Difficulty</Card.Title>
		</Card.Header>
		<Card.Content>
			<Button>Easy</Button>
			<Button>Medium</Button>
			<Button>Hard</Button>
			<Button>Extreme</Button>
		</Card.Content>
	</Card.Root>
</div>
