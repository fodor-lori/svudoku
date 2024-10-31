import { json, type RequestHandler } from '@sveltejs/kit';
import { Board } from '$lib/Board';

export const GET: RequestHandler = () => {
	const size = 9;
	const board = new Board();
	board.generate();
	return json({ size, board });
};
