<script lang="ts">
	import events from '$lib/data.json';
	const eventKeys = Object.keys(events);

	const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	const startDate = new Date('2017-03-08');
	const endDate = new Date();
	const dates: Date[] = [];

	const {format} = new Intl.DateTimeFormat(undefined, {
		timeZone: 'UTC',
	});

	const pointer = startDate;
	while (pointer.valueOf() < endDate.valueOf()) {
		dates.push(new Date(pointer.getTime()));
		pointer.setDate(pointer.getDate() + 1);
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
	{#if date.getUTCDate() === 1 || i === 0}
	<h2 class="month" style="grid-column:1/{date.getUTCDay() === 0 ? 8 : (date.getUTCDay() + 1)}">
		{MONTHS[date.getUTCMonth()].slice(0, 3)}<br>{date.getUTCFullYear()}
	</h2>
	{/if}
	<div class="date {eventKeys.includes(date.toISOString().slice(0, 10)) ? 'event' : '' }" data-date="{format(date)}"></div>
{/each}

<footer>That's all for now!</footer>
</div>

<style>
#heatmap {
	overflow: visible auto;
	min-width: 20%;
	max-width: 24em;

	display: grid;
	grid: auto-flow / repeat(7, minmax(0, 1fr));
	gap: 0.33ch;
	padding: 2.5em
}

#heatmap > footer {
	grid-column: 1/8;
	text-align: center;
	padding: 1em;
}

.month {
	margin: 0;
	display: flex;
	align-items: center;
	line-height: 1;
	font-size: 1em;
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
