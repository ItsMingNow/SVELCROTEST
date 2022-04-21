<script>
  // IMPORT SVELRCO
  //   import Svelcro from "./svelcro.svelte";
  import { get } from "svelte/store";
  import TaskList from "./TaskList.svelte";
  import { TaskStore } from "./store.js";
  // Track UPDATE
  import trackUpdateCount from "./store";
  const count = trackUpdateCount();

  let text = "";
  let taskStoreLength = get(TaskStore).length;

  // Updates Store when submti button clicked
  const handleSubmit = () => {
    const newTask = {
      id: ++taskStoreLength,
      text,
    };
    TaskStore.update((currentTasks) => {
      return [newTask, ...currentTasks];
    });
    text = "";
  };
</script>

<!-- <Svelcro> -->
<main>
  <h1>Svelcro Test Ground</h1>
  <h2>App Component Rendered:{$count}</h2>
  <form on:submit|preventDefault={handleSubmit} id="add-item">
    <input type="text" placeholder="Add task" bind:value={text} />
    <button type="submit">Add Task</button>
  </form>

  <TaskList />
</main>

<!-- </Svelcro> -->
<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    background-color: rgb(201, 201, 197);
    border-radius: 5%;
    width: 85%;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  #add-item {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
