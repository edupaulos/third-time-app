<script lang="ts">
	import { DotsVerticalOutline, VolumeMuteSolid, VolumeUpSolid } from 'flowbite-svelte-icons';
	import { isMuted } from '$lib/mute';
	import { timeDivision } from '$lib/timeDivision';

	let isOpenSettings = false;

	const toggleSettings = () => {
		isOpenSettings = !isOpenSettings;
	};

	const toggleMute = () => {
		isMuted.update((muted) => !muted);
	};

	const changeTimeDivision = (divider: number) => {
		timeDivision.update(() => divider);
	};
</script>

<div class="relative inline-block text-left">
	<button
		class="flex items-center justify-center bg-200 rounded-full w-14 h-14 active:bg-400 relative"
		on:click={toggleSettings}
		aria-haspopup="true"
		aria-expanded={isOpenSettings ? 'true' : 'false'}
	>
		<DotsVerticalOutline color="#645DCE" class="size-10" />
	</button>

	<!-- Dropdown Menu -->
	<div
		class={`${isOpenSettings ? '' : 'hidden'} bg-200 p-4 absolute rounded-2xl mt-2 right-0 z-10 min-w-40`}
	>
		<p>Time division</p>
		<div class="flex gap-5 mb-4">
			{#each [3, 4, 5] as divider}
				<button
					on:click={() => changeTimeDivision(divider)}
					class={`p-2 rounded transition-colors duration-200 ${$timeDivision === divider ? 'bg-300' : 'hover:bg-300'}`}
				>
					1/{divider}
				</button>
			{/each}
		</div>
		<button on:click={toggleMute} aria-label="Toggle Mute">
			{#if $isMuted}
				<VolumeMuteSolid class="size-10" />
			{:else}
				<VolumeUpSolid class="size-10" />
			{/if}
		</button>
	</div>
</div>
