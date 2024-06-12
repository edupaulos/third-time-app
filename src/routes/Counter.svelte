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
					}
				}, 1000);
			}
		}
		isBreaking = !isBreaking;
	}

	// Cleanup on component destruction
	import { onDestroy } from 'svelte';
	import { formatTime } from '../utils/formatTime';
	import { isMuted } from '$lib/mute';
	import { timeDivision } from '$lib/timeDivision';
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
			breakTime = Math.trunc(currentTime / $timeDivision);
		}
	}
</script>

<div class="flex flex-col items-center">
	<!-- Timer display -->
	<div class="flex gap-3">
		<div class="flex flex-col gap-4">
			<div class="bg-300 w-[32rem] h-[14rem] rounded-3xl flex justify-center items-center">
				<span class="text-8xl text-900 font-bold">
					{#if $timer !== undefined}
						{formatTime($timer)}
					{/if}
				</span>
			</div>

			<!-- Start/Stop button -->
			<button
				class={`${isStopped ? 'bg-green-200' : 'bg-red-200'} py-3 px-10 rounded-3xl`}
				on:click={handleStartStop}
			>
				<div class="font-bold text-2xl">{isStopped ? 'Start' : 'Stop'}</div>
			</button>
		</div>

		<div class="flex flex-col item gap-4">
			<div
				class="bg-200 w-[17rem] h-[14rem] p-16 rounded-3xl flex flex-col justify-center items-center"
			>
				<p class="text-xl">Next Break</p>
				<span class="text-6xl text-900 font-bold">{formatTime(breakTime)}</span>
			</div>

			<!-- Start/Stop Break button -->
			<button
				class={`${isBreaking ? 'bg-red-200' : 'bg-green-200'} py-3 px-10 rounded-3xl disabled:bg-100`}
				on:click={handleBreak}
				disabled={breakTime <= 0}
			>
				<div class="font-bold text-2xl">{isBreaking ? 'Stop Break' : 'Start Break'}</div>
			</button>
		</div>
	</div>

	<!-- Audio alarm -->
	<audio
		src="https://assets.mixkit.co/active_storage/sfx/905/905-preview.mp3"
		bind:this={alarm}
		muted={$isMuted}
	/>
</div>
