<script lang="ts">
	import Heatmap from '$lib/Heatmap.svelte';
	import Stats from '$lib/Stats.svelte';
</script>

<Heatmap />

<div id="text">
	<h1>Arcaea Update History</h1>
	<p>(In heatmap form.)</p>
	<p>Some text goes here</p>

	<fieldset>
		<legend>WARNING</legend>
		<p>This is very work in progress. Functionality is missing, design isn't final, etc.</p>
	</fieldset>

	<Stats/>

	<p>Data sourced from <a href="https://arcaea.fandom.com/wiki/Update_History">the Arcaea Wiki</a>.</p>
	<p>This project is neither affiliated with or endorsed by lowiro.</p>
	<p>The source code for this website is available <a href="https://github.com/12beesinatrenchcoat/arcaea-updates">here</a>.</p>
</div>

<style>
	#text {
		max-height: 50vh;
		overflow-y: auto
	}
</style>
