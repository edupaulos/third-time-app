import { writable } from 'svelte/store';

function createTimer() {
	const { subscribe, set, update } = writable(0);

	let worker: Worker | undefined;
	if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
		worker = new Worker(new URL('./timerWorker.ts', import.meta.url));
	}

	if (worker) {
		worker.onmessage = (e) => {
			if (e.data === 'tick') {
				update((n) => n + 1);
			} else if (e.data === 'reset') {
				set(0);
			}
		};
	}

	return {
		subscribe,
		start: () => {
			if (worker) {
				worker.postMessage({ action: 'start' });
			}
		},
		stop: () => {
			if (worker) {
				worker.postMessage({ action: 'stop' });
			}
		},
		reset: () => {
			if (worker) {
				worker.postMessage({ action: 'reset' });
			}
		}
	};
}

export const timer = createTimer();
