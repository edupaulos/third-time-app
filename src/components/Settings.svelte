<script lang="ts">
	import {
		AdjustmentsHorizontalSolid,
		ArrowsRepeatOutline,
		BellActiveSolid,
		ClockSolid
	} from 'flowbite-svelte-icons';
	import DropdownSettings from './DropdownSettings.svelte';

	let isOpenSettings = false;

	const settingsItems = [
		{ name: 'Time division', icon: ClockSolid, setting: 'timeDivison' },
		{ name: 'Alarm', icon: BellActiveSolid, setting: 'alarm' },
		{ name: 'Auto start', icon: ArrowsRepeatOutline, setting: 'autoStart' }
	];

	const toggleSettings = () => {
		isOpenSettings = !isOpenSettings;
	};
</script>

<div class="relative inline-block text-left">
	<button
		class="flex items-center justify-center hover:bg-200 rounded-2xl active:bg-300 p-2 gap-1"
		on:click={toggleSettings}
		aria-haspopup="true"
		aria-expanded={isOpenSettings ? 'true' : 'false'}
	>
		<AdjustmentsHorizontalSolid class="w-6 h-6 text-600" />
		<p class="text-xl text-gray-700 font-bold">Customize</p>
	</button>

	<!-- Dropdown Menu -->
	<DropdownSettings {isOpenSettings} {settingsItems} />
</div>
