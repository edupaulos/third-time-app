<script lang="ts">
	import { timer } from '$lib/timer';

	let breakTime = 0;
	let isStopped = true;
	let isBreaking = false;
	let alarm: HTMLAudioElement;
	let breakTimer: number | undefined;

	// Start/Stop button click handler
	function handleStartStop() {
		if (isStopped) {
			timer.start();
		} else {
			timer.stop();
		}
		isStopped = !isStopped;
	}

	// Start/Stop Break button click handler
	function handleBreak() {
		if (isBreaking) {
			clearInterval(breakTimer);
			breakTimer = undefined;
		} else {
			if (breakTime > 0) {
				isStopped = true;
				timer.stop();
				timer.reset();
				breakTimer = setInterval(() => {
					breakTime -= 1;
					if (breakTime <= 0) {
						alarm.play();
						clearInterval(breakTimer);
						breakTimer = undefined;
						isBreaking = false;

						if ($settingsStore.isAutoStart) {
							timer.start();
							isStopped = false;
						}
					}
				}, 1000);
			}
		}
		isBreaking = !isBreaking;
	}

	// Cleanup on component destruction
	import { onDestroy } from 'svelte';
	import { formatTime } from '../utils/formatTime';
	import { settingsStore } from '$lib/settings';
	import { ChevronDoubleRightOutline } from 'flowbite-svelte-icons';
	onDestroy(() => {
		timer.stop();
		if (breakTimer !== undefined) {
			clearInterval(breakTimer);
		}
	});

	// Subscribe to the timer store to update breakTime based on the current time
	$: {
		const currentTime = $timer;
		if (currentTime !== 0 && !isStopped) {
			breakTime = Math.trunc(currentTime / $settingsStore.timeDivision);
		}
	}
</script>

<div class="flex flex-col items-center">
	<!-- Timer display -->
	<div class="flex gap-3">
		<div class="flex flex-col gap-4">
			<div class="bg-300 w-[32rem] h-[14rem] rounded-3xl flex justify-center items-center">
				<h1 class="text-8xl text-900 font-bold">
					{#if $timer !== undefined}
						{formatTime($timer)}
					{/if}
				</h1>
			</div>

			<!-- Start/Stop button -->
			<button
				class={`${isStopped ? 'bg-green-200' : 'bg-red-200'} py-3 px-10 rounded-3xl disabled:bg-100`}
				disabled={isBreaking}
				on:click={handleStartStop}
			>
				<h2 class="font-bold grayscale-0 text-xl tracking-wider">{isStopped ? 'Start' : 'Stop'}</h2>
			</button>
		</div>

		<div class="flex flex-col gap-4">
			<div
				class="bg-200 w-[17rem] h-[14rem] p-16 rounded-3xl flex flex-col justify-center items-center"
			>
				<h2 class="text-xl font-black tracking-wider text-600">Next Break</h2>
				<h1 class="text-6xl text-900 font-bold">{formatTime(breakTime)}</h1>
			</div>

			<!-- Start/Stop Break button -->
			<button
				class={`${isBreaking ? 'bg-red-200' : 'bg-green-200'} py-3 px-10 rounded-3xl disabled:bg-100`}
				on:click={handleBreak}
				disabled={breakTime <= 0}
			>
				<h2 class="relative text-xl tracking-wide font-bold">
					{isBreaking ? 'Stop Break' : 'Start Break'}
				</h2>
			</button>
		</div>

		<div class="relative w-32 h-16 mt-4">
			<button
				class="flex gap-2 items-center justify-center bg-300 w-full h-full rounded-3xl absolute top-0 left-0"
			>
				<h2 class="text-xl tracking-wide font-bold">Skip</h2>
				<ChevronDoubleRightOutline class="size-7" />
			</button>
		</div>
	</div>

	<!-- Audio alarm -->
	<audio
		src="https://assets.mixkit.co/active_storage/sfx/905/905-preview.mp3"
		volume={100}
		bind:this={alarm}
		muted={$settingsStore.isMute}
	/>
</div>
