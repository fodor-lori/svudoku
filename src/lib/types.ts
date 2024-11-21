export type SudokuData = {
	puzzle: string;
	solution: string;
};

export type Cell = {
	row: number;
	col: number;
	value: number;
	notes: number[];
	solution: number;
	isClue: boolean;
};

export type Grid = {
	size: number;
	boxSize: number;
	cells: Cell[][];
};

export type StateChange = {
	target: Cell;
	type: InputMode;
	affectedCells?: Cell[];
};

export enum InputMode {
	NOTE = 'note',
	VALUE = 'value'
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
