<script lang="ts">
	import events from '$lib/Events';
	import Month from '$lib/Month.svelte';
	import type {Event} from './data/data';

	console.debug(events);

	const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const startDate = new Date('2017-03-08');
	const endDate = new Date().setDate(new Date().getUTCDate());
	const dates: Date[] = []; // Every single Date square

	const pointer = startDate;
	while (pointer.valueOf() < endDate.valueOf()) {
		dates.push(new Date(pointer.getTime()));
		pointer.setDate(pointer.getUTCDate() + 1);
		pointer.setHours(0, 0, 0); // Prevents skipping of days.
	}

	const shortISO = (date: Date) => date.toISOString().slice(0, 10);

	const types = ['tweet', 'patch', 'minor', 'major', 'release'];
	const checkForEvent = (date: Date) => {
		const isoDate = shortISO(date);
		let highestType = '';
		let highestEvent: Event | undefined;
		let array;
		if (isoDate in events) {
			array = events[isoDate];
			for (const event of array) {
				if (types.indexOf(event.type) > types.indexOf(highestType)) {
					highestType = event.type;
					highestEvent = event;
				}
			}
		}

		return {highestType, highestEvent, array};
	};
</script>

<div id="heatmap">
	<!-- Days of the week -->
{#each DAYS as day}
	<p class="day">{day.charAt(0)}</p>
{/each}

	<!-- Each little square -->
{#each dates as date, i}
	<!-- Do we display a month on the side? -->
	{#if (date.getUTCDay() === 0 && date.getUTCDate() === 1) || i === 0 }
	<Month date={date}/>
	{:else if (date.getUTCDay() === 0) && (new Date(date.valueOf() + 518_400_000).getUTCMonth() !== date.getUTCMonth())}
	<Month date={new Date(date.valueOf() + 518_400_000)}/>
	{/if}

	<!-- The date block itself -->
	{@const events = checkForEvent(date)}
	<a
		class={'date '
		+ (date.getUTCDay() === 0 ? 'sunday ' : '')
		+ events.highestType
		}
		data-date="{shortISO(date)}"
		href="#{shortISO(date)}"
	>
		{events.highestEvent?.short || ''}
	</a>
{/each}

<footer>That's all for now!</footer>
</div>

<style>
:root {
	--blue: #6be;
	--green: #6c4;
	--purple: #B470C9;
	--red: #f44;
}
#heatmap {
	overflow: visible auto;
	max-width: 100vw;

	display: grid;
	grid: 1fr repeat(7, minmax(0, 1fr)) / auto-flow;
	grid-auto-flow: column;
	gap: 0.33ch;
	padding: 2em;
}

#heatmap > footer {
	display: flex;
	align-items: center;
	grid-row: 1/10;
	text-align: center;
	width: 12ch;
	padding: 2em;
}

.day {
	position: sticky;
	display: flex;
	align-items: center;
	justify-content: center;
	left: 0;
	margin: 0 0.5ch;
	width: 100%;
	text-align: center;
	font-weight: 800;
	background: #fffc;
	z-index: 2;
}

.day:nth-child(1), .date.sunday {
	grid-row-start: 2;
}

.date[data-date="2017-03-08"] {
	grid-row-start: 5;
}

.date {
	aspect-ratio: 1;
	min-width: 2.25em;
	background: #0001;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.date::after {
	display: none;
}

.date:hover::after {
	display: block;
	position: absolute;
	z-index: 3;
	content: attr(data-date);
	bottom: 110%;
	left: 50%; transform: translate(-50%, 0);

	pointer-events:none;

	background: white;
	padding: 0.5ch;
}

.date.major, .date.main {
	background: linear-gradient(var(--blue), var(--purple)) !important;
	box-shadow: 0 0 0.5ch var(--blue);
}

.date.minor, .date.side, .date.collab {
	background: var(--purple) !important;
}

.date.songs {
	background: var(--green) !important;
}

.date.patch {
	background: white;
}

</style>
