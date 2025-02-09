<script lang="ts">
	import { settingsStore } from '$lib/settings';

	import { AngleRightOutline, VolumeMuteSolid, VolumeUpSolid } from 'flowbite-svelte-icons';
	import { Switch } from 'bits-ui';

	export let isOpenSettings;
	export let settingsItems: Array<{ name: string; icon: any; setting: string }>;

	let activeSetting = '';

	const showSetting = (setting: string) => {
		activeSetting = setting;
	};

	const changeTimeDivision = (divider: number) => {
		settingsStore.updateTimeDivision(divider);
	};

	const toggleMute = () => {
		settingsStore.toggleMute();
	};
</script>

<div
	class={`${isOpenSettings ? '' : 'hidden'} bg-200 p-3 absolute rounded-2xl mt-2 right-0 z-10 min-w-[16rem]`}
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
							<p class="font-bold">{name}</p>
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
				<p class="font-bold">Back</p>
			</button>

			{#if activeSetting === 'timeDivison'}
				<div class="flex gap-3 mx-6 justify-between">
					{#each [3, 4, 5] as divider}
						<button
							on:click={() => changeTimeDivision(divider)}
							class={`p-2 rounded-sm transition-colors duration-200 ${$settingsStore.timeDivision === divider ? 'bg-300' : 'hover:bg-300'}`}
						>
							<span>
								1/{divider}
							</span>
						</button>
					{/each}
				</div>
			{:else if activeSetting === 'alarm'}
				<button on:click={toggleMute} aria-label="Toggle Mute" class="flex justify-center w-full">
					{#if $settingsStore.isMute}
						<VolumeMuteSolid class="w-10 h-10 text-gray-700" />
					{:else}
						<VolumeUpSolid class="w-10 h-10 text-gray-700" />
					{/if}
				</button>
			{:else}
				<div class="flex gap-3 items-center">
					<Switch.Root
						id="AutoStart"
						checked={$settingsStore.isAutoStart}
						onCheckedChange={settingsStore.toggleAutoStart}
						class="peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-600 focus-visible:ring-offset-2 focus-visible:ring-offset-600 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-400 data-[state=unchecked]:bg-100 data-[state=unchecked]:shadow-mini-inset"
					>
						<Switch.Thumb
							class="pointer-events-none block size-[30px] shrink-0 rounded-full bg-600 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:shadow-mini "
						/>
					</Switch.Root>
					<span>Auto Start is {$settingsStore.isAutoStart ? 'enable' : 'disable'}</span>
				</div>
			{/if}
		</div>
	{/if}
</div>
