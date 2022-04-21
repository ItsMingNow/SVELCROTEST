import {writable} from 'svelte/store';
import {afterUpdate} from 'svelte';

export const TaskStore = writable(
  [
    {
      id: 1,
      text: 'testing' 
    },
    {
      id: 2,
      text: 'testing 2' 
    }
  ]
)

export default function trackUpdateCount() {
  const count = writable(0);

  afterUpdate(() => {
    count.update(c => c + 1);
  });

  return count;
}