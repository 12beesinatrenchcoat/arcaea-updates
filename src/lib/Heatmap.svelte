<script lang="ts">
	import untypedEvents from '$lib/data.json';
	const events: {[key: string]: {
		version: string,
		type?: string,
		short?: string,
		contents?: string[]
	}} = untypedEvents;

    import Month from './Month.svelte';

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
</script>

<div id="heatmap">
	<!-- Days of the week -->
{#each DAYS as day}
	<p class="day">{day.charAt(0)}</p>
{/each}

	<!-- Each little square -->
{#each dates as date, i}
	<!-- Do we display a month on the side? -->
	{#if (date.getUTCDay() === 0 && date.getUTCDate() === 1)	|| i === 0 }
	<Month date={date}/>
	{:else if (date.getUTCDay() === 0) && (new Date(date.valueOf() + 518_400_000).getUTCMonth() !== date.getUTCMonth())}
	<Month date={new Date(date.valueOf() + 518_400_000)}/>
	{/if}

	<!-- The date block itself -->
	<div
		class="date {events[shortISO(date)]?.type} {date.getUTCDay() === 0 ? 'sunday' : ''}"
		data-date="{shortISO(date)}">
		{events[shortISO(date)]?.short}
	</div>
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
	min-width: 20%;
	max-width: 48em;

	display: grid;
	grid: auto-flow / 1fr repeat(7, minmax(0, 1fr));
	gap: 0.33ch;
	padding: 2.5em
}

#heatmap > footer {
	grid-column: 1/8;
	text-align: center;
	padding: 1em;
}

.day {
	position: sticky;
	top: 0;
	margin: 0;
	width: 100%;
	text-align: center;
	font-weight: 800;
	background: #fffc;
	z-index: 2;
}

.day:nth-child(1), .date.sunday {
	grid-column-start: 2;
}

.date[data-date="2017-03-08"] {
	grid-column-start: 5;
}

.date {
	aspect-ratio: 1;
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
