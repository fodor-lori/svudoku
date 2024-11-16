import type { Grid, Cell } from './types';

export async function loadGrid() {
	const response = await fetch('/api/generate');
	const { puzzle, solution } = await response.json();

	return deserialize(puzzle, solution);
}

export function deserialize(puzzle: string, solution: string): Grid {
	const cells: Cell[][] = [];

	for (let row = 0; row < 9; row++) {
		cells[row] = [];
		for (let col = 0; col < 9; col++) {
			const index = row * 9 + col;
			const puzzleValue = parseInt(puzzle[index]);
			const solutionValue = parseInt(solution[index]);

			cells[row].push({
				row,
				col,
				value: puzzleValue,
				solution: solutionValue,
				isClue: puzzleValue !== 0,
				notes: []
			});
		}
	}

	return { size: 9, boxSize: 3, cells };
}
