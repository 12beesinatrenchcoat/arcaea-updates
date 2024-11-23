import {type Event, updates} from '$lib/data/data';

const events: {
	[date: string]: Event[]
} = {};

for (const update of updates) {
	events[update.date] ||= [];

	events[update.date].push({
		version: update.version,
		date: update.version,
		type: update.type ?? 'patch',
		...(update.name) && {name: update.name},
		...(update.short) && {short: update.short},
		content: update.content,
	});
}

export default events;
