import { ClassicSudokuGenerator } from '$lib/server/generators/';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const sudokuGenerator = new ClassicSudokuGenerator(56);
	const result = sudokuGenerator.generate();
	return json(result);
};
