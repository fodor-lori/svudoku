import { SudokuGenerator } from '$lib/server';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const generator = new SudokuGenerator();

	const { solution, puzzle } = generator.generate();

	if (!solution || !puzzle) {
		return json({ error: 'Failed to generate Grid' }, { status: 500 });
	}

	return json({ puzzle, solution });
};
