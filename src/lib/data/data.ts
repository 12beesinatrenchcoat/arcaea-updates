// Typing the .json files here.
import untypedUpdates from "$lib/data/updates.json";

export type Update = {
	version: string,
	date: string,
	type: string | "major" | "minor" | "patch",
	name?: string,
	short?: string,
	content: string[]
};

// Type Tweet = {
// 	date: string,
// 	type: 'tweet',
// 	content: string,
// 	image?: string
// };

export type Event = Update;

export const updates: Update[] = untypedUpdates;
