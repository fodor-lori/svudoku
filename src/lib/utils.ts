import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { UICell } from './types';

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

export function isSameBox(cellA: UICell, cellB: UICell) {
	return (
		Math.floor(cellA.row / 3) === Math.floor(cellB.row / 3) &&
		Math.floor(cellA.col / 3) === Math.floor(cellB.col / 3)
	);
}
