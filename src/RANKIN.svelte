<script>
	//use export to pass down props 
	export let name;
	let count = 0;
	//$ is a reactive declaration
	//this means that it will re-run this code wheneber any of the referenced code is changed/updated
	//reactivity is triggered on assignment
	$: doubled = count*2;
	function incrementCount() {
		count++;
	}
	$: {
		if (count > 10) {
			alert('count is dangerously high!')
			count = 9;
		}
	}
	let numbers = [1,2,3,4];
	function addNumber() {
		numbers = [...numbers, numbers.length+1];
	}
	$: sum = numbers.reduce((t,n) => t + n, 0);

	import Info from './Info.svelte';
	const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
	import Cats from './cats.svelte';
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
	import Thing from './Thing.svelte';

	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' },
	];

	function handleClick() {
		things = things.slice(1);
	}

	async function getRandomNumber() {
		const res = await fetch(`/tutorial/random-number`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	let promise = getRandomNumber();

	function handleClick_promise() {
		promise = getRandomNumber();
	}

	let m = {x: 0, y: 0};

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

</script>

<main>

	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<button on:click={incrementCount}>
		Clicked {count} {count === 1 ? 'time' : 'times'}
	</button>
	<p>{count} doubled is {doubled}</p>
	<p>{numbers.join(' + ')} = {sum}</p>
	<button on:click={addNumber}>Add a number</button>
	<Info {...pkg}/>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}

<Cats {cats}></Cats>
</main>

You can add text just like this


<!-- <Info {...pkg}/>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}

<Cats {cats}></Cats> -->

<!-- once is a modifer so that the handleclick only happens on first click -->
<!-- there are lots of other modifiers -->
<button on:click|once={handleClick}>
	Remove first thing
</button>

{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}

<!-- Working with promises -->
<button on:click={handleClick_promise}>
	generate random number
</button>

<!-- replace this element -->

{#await promise then value}
<p>{value}</p>
{/await}

<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} X {m.y}
</div>
 



<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	div { width: 100%; height: 100%; }

</style>