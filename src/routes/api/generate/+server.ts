import { SudokuGenerator } from '$lib/SudokuGenerator';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const generator = new SudokuGenerator();

	const { solution, puzzle } = generator.generate();

	if (!solution || !puzzle) {
		return json({ error: 'Failed to generate board' }, { status: 500 });
	}

	return json({ solution, puzzle });
};
