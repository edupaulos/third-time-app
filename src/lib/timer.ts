import { writable } from 'svelte/store';

function createTimer() {
	const { subscribe, set, update } = writable(0);

	let interval: number | undefined;

	return {
		subscribe,
		start: () => {
			interval = setInterval(() => {
				update((n) => n + 1);
			}, 1000);
		},
		stop: () => {
			clearInterval(interval);
			interval = undefined;
		},
		reset: () => {
			clearInterval(interval);
			interval = undefined;
			set(0);
		}
	};
}

export const timer = createTimer();
