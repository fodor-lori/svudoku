import { KillerSudokuGenerator } from '$lib/server/KillerSudokuGenerator';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const killerGenerator = new KillerSudokuGenerator();
	const result = killerGenerator.testGenerate();
	return json(result);
};
