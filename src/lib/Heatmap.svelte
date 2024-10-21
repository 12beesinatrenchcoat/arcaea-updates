<script lang="ts">
	import events from '$lib/data.json';
    import Month from './Month.svelte';
	const eventKeys = Object.keys(events);

	const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const startDate = new Date('2017-03-08');
	const endDate = new Date();
	const dates: Date[] = [];

	const {format} = new Intl.DateTimeFormat(undefined, {
		timeZone: 'UTC',
	});

	const pointer = startDate;
	while (pointer.valueOf() < endDate.valueOf()) {
		dates.push(new Date(pointer.getTime()));
		pointer.setDate(pointer.getUTCDate() + 1);
		pointer.setHours(0, 0, 0); // Prevents skipping of days.
	}
	console.log(dates);
</script>

<div id="heatmap">
	<!-- Days of the week -->
{#each DAYS as day}
	<p class="day">{day.charAt(0)}</p>
{/each}

	<!-- Each little square -->
{#each dates as date, i}
	{#if (date.getUTCDay() === 0 && date.getUTCDate() === 1)	|| i === 0 }
	<Month date={date}/>
	{:else if (date.getUTCDay() === 0) && (new Date(date.valueOf() + 518_400_000).getUTCMonth() !== date.getUTCMonth())}
	<Month date={new Date(date.valueOf() + 518_400_000)}/>
	{/if}
	<div
		class="date {eventKeys.includes(date.toISOString().slice(0, 10)) ? 'event' : '' } {date.getUTCDay() === 0 ? 'sunday' : ''}"
		data-date="{date.toISOString().slice(0, 10)}">
	</div>
	<!-- Otherwise, wait until the next sunday before displaying the next month -->
{/each}

<footer>That's all for now!</footer>
</div>

<style>
#heatmap {
	overflow: visible auto;
	min-width: 20%;
	max-width: 24em;

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
	/* /* height: 1em; */
	background: #0002;
	position: relative;
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

.event {
	background: gold;
}
</style>
