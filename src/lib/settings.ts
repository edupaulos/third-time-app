import { writable } from 'svelte/store';

function createSettingsStore() {
	const { subscribe, update } = writable({
		timeDivision: 3,
		isMute: false,
		isAutoStart: false
	});

	return {
		subscribe,
		// Method to update timeDivision
		updateTimeDivision: (value: number) => {
			update((settings) => ({ ...settings, timeDivision: value }));
		},
		// Method to update isMute
		toggleMute: () => {
			update((settings) => ({ ...settings, isMute: !settings.isMute }));
		},
		// Method to update isAutoStart
		toggleAutoStart: () => {
			update((settings) => ({ ...settings, isAutoStart: !settings.isAutoStart }));
		}
	};
}

export const settingsStore = createSettingsStore();
