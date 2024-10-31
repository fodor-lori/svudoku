import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const result = await fetch('/api/generate');
	const data = await result.json();
	return data;
};
