<script lang="ts">
	import {
		AdjustmentsHorizontalSolid,
		AngleRightOutline,
		ArrowsRepeatOutline,
		BellActiveSolid,
		ClockSolid,
		VolumeMuteSolid,
		VolumeUpSolid
	} from 'flowbite-svelte-icons';
	import { isMuted } from '$lib/mute';
	import { timeDivision } from '$lib/timeDivision';
	import { slide } from 'svelte/transition';

	let isOpenSettings = false;
	let activeSetting = '';

	const settingsItems = [
		{ name: 'Time division', icon: ClockSolid, setting: 'timeDivison' },
		{ name: 'Alarm', icon: BellActiveSolid, setting: 'alarm' },
		{ name: 'Auto start', icon: ArrowsRepeatOutline, setting: 'autoStart' }
	];

	const toggleSettings = () => {
		isOpenSettings = !isOpenSettings;
	};

	const toggleMute = () => {
		isMuted.update((muted) => !muted);
	};

	const changeTimeDivision = (divider: number) => {
		timeDivision.set(divider);
	};

	const showSetting = (setting: string) => {
		activeSetting = setting;
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
		<p class="text-xl text-gray-700">Customize</p>
	</button>

	<!-- Dropdown Menu -->
	<div
		class={`${isOpenSettings ? '' : 'hidden'} bg-200 p-3 absolute rounded-2xl mt-2 right-0 z-10 min-w-[16rem]`}
		transition:slide={{ axis: 'x' }}
	>
		{#if !activeSetting}
			<ul class="">
				{#each settingsItems as { name, icon: Icon, setting }}
					<li class="text-lg flex p-2 rounded-md transition-colors duration-200 hover:bg-300">
						<button
							class="flex items-center justify-between w-full"
							on:click={() => showSetting(setting)}
						>
							<span class="flex items-center gap-2">
								<Icon />
								<p>{name}</p>
							</span>
							<AngleRightOutline class="w-5 h-5" />
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<div>
				<button
					on:click={() => (activeSetting = '')}
					class="mb-2 flex items-center gap-2 text-gray-700"
				>
					<AngleRightOutline class="transform rotate-180 w-5 h-5" />
					<p>Back</p>
				</button>

				{#if activeSetting === 'timeDivison'}
					<div class="flex gap-2 mb-4">
						{#each [3, 4, 5] as divider}
							<button
								on:click={() => changeTimeDivision(divider)}
								class={`p-2 rounded transition-colors duration-200 ${$timeDivision === divider ? 'bg-300' : 'hover:bg-300'}`}
							>
								1/{divider}
							</button>
						{/each}
					</div>
				{:else if activeSetting === 'alarm'}
					<button on:click={toggleMute} aria-label="Toggle Mute" class="flex justify-center w-full">
						{#if $isMuted}
							<VolumeMuteSolid class="w-10 h-10 text-gray-700" />
						{:else}
							<VolumeUpSolid class="w-10 h-10 text-gray-700" />
						{/if}
					</button>
				{:else}
					<div>Coming soon!</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
