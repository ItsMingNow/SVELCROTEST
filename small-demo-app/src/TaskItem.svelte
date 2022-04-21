<script>
  import {TaskStore} from './store.js'
  import trackUpdateCount from './store.js';
  const count = trackUpdateCount();

  export let item;

  const handleDelete = (itemId) => {
    TaskStore.update((currentTask) => {
      return currentTask.filter(item => item.id != itemId)
    })
  }

</script>

<li>
  <div class="list-content">
    
    <p class="text-display">
      {item.text} [Item Rendered:{$count}]
    </p>
    <button class="close" on:click={() => handleDelete(item.id)}>X</button>
  </div>
  
</li>

<style>

  .list-content{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  p{
    min-width: 300px;
    
  }

  li {
    background-color: antiquewhite;
    margin: 5px;
    border-radius: 5%;
    list-style: none;
    width: 100%;
  }
</style>