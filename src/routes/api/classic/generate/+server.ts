import { ClassicSudokuGenerator } from '$lib/server/generators/';
import type { Difficulty } from '$lib/types';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const difficulty = url.searchParams.get('difficulty') as Difficulty;
	const sudokuGenerator = new ClassicSudokuGenerator(difficulty);
	const result = sudokuGenerator.generate();
	return json(result);
};
