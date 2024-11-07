import { SudokuGenerator } from '$lib/server/SudokuGenerator';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const sudokuGenerator = new SudokuGenerator(56);
	const result = sudokuGenerator.generate();
	return json(result);
};
