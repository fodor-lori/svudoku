import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Cage, Cell, Difficulty } from './types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function fetchClassicPuzzle(difficulty: Difficulty) {
	const response = await fetch(`/api/classic/generate?difficulty=${difficulty}`);
	const { cells } = await response.json();

	const serialized = Array.from({ length: 9 }, (_, row) =>
		Array.from({ length: 9 }, (_, col) => {
			const cell = cells.find((cell: Cell) => cell.row === row && cell.col === col);
			return {
				...cell,
				notes: []
			};
		})
	) as Cell[][];

	return { size: 9, boxSize: 3, cells: serialized };
}

export async function fetchKillerPuzzle(difficulty: Difficulty) {
	const response = await fetch(`/api/killer/generate?difficulty=${difficulty}`);
	const { cages }: { cages: Cage[] } = await response.json();

	const allCells = cages.flatMap((cage) => cage.cells);
	const cells = Array.from({ length: 9 }, (_, row) =>
		Array.from({ length: 9 }, (_, col) => {
			const cell = allCells.find((cell) => cell.row === row && cell.col === col);
			return {
				...cell,
				notes: []
			};
		})
	) as Cell[][];

	const cagesSerialized = cages.map((cage) => ({
		...cage,
		cells: cage.cells.map((cell) => ({
			row: cell.row,
			col: cell.col
		}))
	}));

	return { size: 9, boxSize: 3, cells, cages: cagesSerialized };
}

export function isSameBox(cellA: Cell, cellB: Cell) {
	return (
		Math.floor(cellA.row / 3) === Math.floor(cellB.row / 3) &&
		Math.floor(cellA.col / 3) === Math.floor(cellB.col / 3)
	);
}
