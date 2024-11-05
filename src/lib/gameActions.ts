export async function loadNewGrid() {
	const response = await fetch('/api/generate');
	const { puzzle, solution } = await response.json();

	return { puzzle, solution };
}
