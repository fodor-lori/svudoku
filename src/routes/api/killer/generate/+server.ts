import { KillerSudokuGenerator } from '$lib/server/generators';
import type { Difficulty } from '$lib/types';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const difficulty = url.searchParams.get('difficulty') as Difficulty;
	const killerGenerator = new KillerSudokuGenerator(difficulty);
	const result = killerGenerator.generate();
	return json(result);
};
