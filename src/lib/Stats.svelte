<script lang="ts">
	import events from '$lib/data.json';
	const eventDates = Object.keys(events).map((key: string) => new Date(key));
</script>

<p>Stats go here.</p>
