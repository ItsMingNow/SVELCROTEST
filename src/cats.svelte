<script>
    export let cats;
	import Testing from './testing.svelte';
	import Fam from './FAM.svelte'
</script>

<main>
	<h1>The Famous Cats of YouTube</h1>
	<Testing></Testing>
	<Fam></Fam>
</main>

<ul>
	<!-- open each block -->
	{#each cats as cat}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
			{cat.name}
		</a></li>
	{/each}
	<!-- close each block -->
</ul>

<!-- can also do it this way:
{#each cats as cat, i}
	<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
		{i + 1}: {cat.name}
	</a></li>
{/each} -->