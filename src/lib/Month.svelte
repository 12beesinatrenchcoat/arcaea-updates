<script lang="ts">
	export let date: Date;
	const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
</script>

	<h2 class="month">
		{MONTHS[date.getUTCMonth()].slice(0, 3)}<br>{date.getUTCFullYear()}
	</h2>

<style>
:global(.month) {
	margin: 0;
	display: flex;
	align-items: center;
	line-height: 1;
	font-size: 1em;
	grid-column-start: 1;
}
</style>
