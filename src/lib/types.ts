export type UICell = {
	row: number;
	col: number;
	value: number;
	solution: number;
	isClue: boolean;
	notes: number[];
};

export type UIGrid = {
	size: number;
	boxSize: number;
	cells: UICell[][];
};

export type SudokuData = {
	puzzle: string;
	solution: string;
};
