<script lang="ts">
	import Heatmap from "$lib/Heatmap.svelte";
	import Stats from "$lib/Stats.svelte";
	import {selectedDate} from "$lib/shared.svelte";
	import events from "$lib/Events";

	const currentEvents = $derived(events[selectedDate.date]);
</script>

<main>
	<div id="left">
		<h1>Arcaea Update History</h1>
		<p>(In heatmap form.)</p>
		<p>Some text goes here</p>

		<fieldset>
			<legend>WARNING</legend>
			<p>
				This is very work in progress. Functionality is missing, design
				isn't final, etc.
			</p>
		</fieldset>

		<Stats />

		<p>
			Data sourced from <a
				href="https://arcaea.fandom.com/wiki/Update_History"
				>the Arcaea Wiki</a
			>.
		</p>
		<p>This project is neither affiliated with or endorsed by lowiro.</p>
		<p>
			The source code for this website is available <a
				href="https://github.com/12beesinatrenchcoat/arcaea-updates"
				>here</a
			>.
		</p>
	</div>
	<div id="contents">
		{#if selectedDate.date in events}
			<h1>{selectedDate.date + (currentEvents[0].name ? " - " + currentEvents[0].name : "")}</h1>
			{#each currentEvents as event}
				{#each event.content as item}
				<p>{item}</p>
				{/each}
			{/each}
		{:else if selectedDate.date}
			<h1>{selectedDate.date}</h1>
			<p>Nothing happened on this day.</p>
		{:else}
			<h1>Select a date!</h1>
		{/if}
	</div>
</main>

<Heatmap />

<style>
	main {
		margin: 0 4em;
		overflow-y: auto;
		flex-grow: 1;

		display: flex;
		flex-direction: row;
	}

	#contents {
		border-left: 1px dashed black;
		margin-left: 4ch;
		padding-left: 4ch;
		overflow-y: auto;
		flex: 0 0 66%;
	}
</style>
