<script context="module">

// APPROACH 2
import { derived } from 'svelte/store'
import tree from './svelcroStore.js'

let infoToDom = '';

const asciiTree = derived(tree, $tree => {

  const lines = []
  let depth = 0
  
  const traverse = node => {
    for (const child of node.children) {
      
      // HIDE SVELCRO FROM TREE
      if(child.tagName !== "Svelcro"){
        lines.push(`${"  ".repeat(depth)}${child.tagName} ${JSON.stringify(child.options.props || {})}`)
        depth++ 
      }

      traverse(child)
      depth--
    }
  }
  
  traverse($tree)

  // PASS TREE TEXT TO DOM FOR CONTENT SCRIPT TO GRAB
  // console.log('lines: ', JSON.stringify(lines));
  infoToDom = JSON.stringify(lines);
  let DOMStorage = document.getElementById('tree-info');
  window.addEventListener("DOMContentLoaded", function() {
    document.getElementById('tree-info').innerHTML = infoToDom;
  }, false);
  if(DOMStorage){
    document.getElementById('tree-info').innerHTML = infoToDom;
  }

  return lines.join('\n')

})

</script>

<pre hidden>{$asciiTree}</pre>
<div id="svelco">
  <input hidden id='tree' bind:value={infoToDom}/>
  <h1 hidden id="tree-info">{infoToDom}</h1>
  <slot></slot>
</div>

<style>
  /* pre {
		float: right;
		min-width: 25%;
		background: #f6f6f6;
		padding: .5rem;
	} */
</style>
