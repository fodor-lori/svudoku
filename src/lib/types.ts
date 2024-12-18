export type SudokuData = {
	puzzle: string;
	solution: string;
};

export type KillerSudokuData = {
	solution: string;
	cages: string;
};

type CellBase = {
	row: number;
	col: number;
};

export type Cell = CellBase & {
	value: number;
	notes: number[];
	solution: number;
	isClue: boolean;
};

export type Cage = {
	sum: number;
	cells: Cell[];
};

export type Grid = {
	size: number;
	boxSize: number;
	cells: Cell[][];
	cages?: Cage[];
};

export type StateChange = {
	target: Cell;
	type: InputMode;
	affectedCells?: Cell[];
};

export type PuzzleType = 'classic' | 'killer';

export enum InputMode {
	NOTE = 'note',
	VALUE = 'value'
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
