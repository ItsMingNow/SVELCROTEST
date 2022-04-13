import { current_component } from 'svelte/internal';
import { writable } from 'svelte/store';

const nodes = new Map();

const root = { children: [] };

// root components created with `new Component(...)` won't have 
// a parent, so we'll put them in the root node's children
nodes.set(undefined, root);

const tree = writable(root);

// notify the store that its value has changed, even 
// if it's only a mutation of the same object
const notify = () => {
	tree.set(root);
};

document.addEventListener('SvelteRegisterComponent', e => {
	// current_component is the component being initialized; at the time 
	// our event is called, it has already been reverted from the component 
	// that triggered the event to its parent component
	const parentComponent = current_component;
	
	// inspect the event's detail to see what more 
	// fun you could squizze out of it
	const { component, tagName } = e.detail;

	let node = nodes.get(component);
	if (!node) {
		node = { children: [] };
		nodes.set(component, node);
	}
	Object.assign(node, e.detail);

	// children creation is completed before their parent component creation
	// is completed (necessarilly, since the parent needs to create all its
	// children to complete itself); that means that the dev event we're using
	// is fired first for children... and so we may have to add a node for the
	// parent from the (first created) child
	let parent = nodes.get(parentComponent);
	if (!parent) {
		parent = { children: [] };
		nodes.set(parentComponent, parent);
	}
	parent.children.push(node);

	// we're done mutating our tree, let the world know
	notify();

	// abusing a little bit more of Svelte private API...
	component.$$.on_destroy.push(() => {
		const index = parent.children.indexOf(node);
		if (index >= 0) {
			parent.children.splice(index, 1);
			notify();
		}
	});
});

// export the tree as a read only store
export default { subscribe: tree.subscribe }