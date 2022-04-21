<script>
	import {TaskStore} from './store.js'
  import { fade, scale } from 'svelte/transition'
  import TaskItem from './TaskItem.svelte'

  import trackUpdateCount from './store.js';
  const count = trackUpdateCount();
</script>


<ol>
  <h2>Task List Component Rendered: {$count}</h2>
  {#each $TaskStore as Task (Task.id) }

  <div in:scale out:fade="{{ duration: 500 }}">
    <TaskItem item={Task} />
  </div>

  {/each}

</ol>


<style>
	ol {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 0;

    background-color: beige;
    border-radius: 5%;
    width: 100%;
  }
</style>