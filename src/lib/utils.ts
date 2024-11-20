import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Cell } from './types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const numberColors: Record<number, string> = {
	1: 'text-blue-600',
	2: 'text-green-600',
	3: 'text-purple-600',
	4: 'text-orange-500',
	5: 'text-teal-700',
	6: 'text-lime-500',
	7: 'text-cyan-700',
	8: 'text-fuchsia-500',
	9: 'text-yellow-600'
};

export async function loadGrid() {
	const response = await fetch('/api/generate');
	const { puzzle, solution } = await response.json();

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

export function isSameBox(cellA: Cell, cellB: Cell) {
	return (
		Math.floor(cellA.row / 3) === Math.floor(cellB.row / 3) &&
		Math.floor(cellA.col / 3) === Math.floor(cellB.col / 3)
	);
}
