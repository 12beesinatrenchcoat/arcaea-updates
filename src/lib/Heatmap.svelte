<script lang="ts">
	const startDate = new Date('2017-08-03');
	const endDate = new Date();
	const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dates: Date[] = [];

	const pointer = startDate;
	while (pointer.valueOf() < endDate.valueOf()) {
		dates.push(new Date(pointer.getTime()));
		pointer.setDate(pointer.getDate() + 1);
	}
	console.log(dates);
</script>

<div id="heatmap">
{#each DAYS as day}
	<p class="day">{day.charAt(0)}</p>
{/each}

{#each dates as date}
	<div class="date" data-date="{date.toUTCString()}" ></div>
{/each}

<footer>That's all for now!</footer>
</div>

<style>
#heatmap {
	overflow: visible auto;
	min-width: 25%;

	display: grid;
	grid: auto-flow / repeat(7, 1fr);
	gap: 0.5ch;
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
}

.date {
	aspect-ratio: 1;
	/* /* height: 1em; */
	border: 2px solid black;
	position: relative;
}

.date::after {
	display: none;
}

.date:hover::after {
	display: block;
	position: absolute;
	z-index: 2;
	content: attr(data-date);
	bottom: 110%;
	left: 50%; transform: translate(-50%, 0);

	pointer-events:none;

	background: white;
	padding: 0.5ch;
}

/* Release date was a Thursday. */
.date:nth-child(8) {
	background: yellow;
	grid-column-start: 5;
}
</style>

<!--
<table>
	<tbody>
		<tr>
			<td>

			</td>
		</tr>
	</tbody>
</table>
-->
