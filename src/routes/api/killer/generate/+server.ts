import { KillerSudokuGenerator } from '$lib/server/generators';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const killerGenerator = new KillerSudokuGenerator();
	const result = killerGenerator.generate();
	return json(result);
};
