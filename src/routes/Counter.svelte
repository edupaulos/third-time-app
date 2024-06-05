<script lang="ts">
	import { timer } from '$lib/timer';

	let breakTime = 0;
	let isStopped = true;
	let isBreaking = false;
	let alarm: HTMLAudioElement;
	let breakTimer: number | undefined;

	// Format time function
	export function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${minutes}:${secs}`;
	}

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
			breakTime = Math.trunc(currentTime / 3);
		}
	}
</script>

<div class="flex flex-col gap-5">
	<!-- Timer display -->
	<div class="flex gap-3">
		<div class="bg-300 px-36 py-14 rounded-3xl">
			<span class="text-8xl text-900 font-bold">
				{#if $timer !== undefined}
					{formatTime($timer)}
				{/if}
			</span>
		</div>
		<div class="bg-200 px-14 py-14 rounded-3xl">
			<p>Next Break</p>
			<span class="text-6xl text-900 font-bold">{formatTime(breakTime)}</span>
		</div>
	</div>

	<!-- Start/Stop button -->
	<button
		class={`${isStopped ? 'bg-green-200' : 'bg-red-200'} py-3 px-10 rounded-3xl`}
		on:click={handleStartStop}
	>
		<div class="font-bold text-2xl">{isStopped ? 'Start' : 'Stop'}</div>
	</button>

	<!-- Start/Stop Break button -->
	<button
		class={`${isBreaking ? 'bg-red-200' : 'bg-green-200'} py-3 px-10 rounded-3xl disabled:bg-100`}
		on:click={handleBreak}
	>
		<div class="font-bold text-2xl">{isBreaking ? 'Stop Break' : 'Start Break'}</div>
	</button>

	<!-- Audio alarm -->
	<audio src="https://assets.mixkit.co/active_storage/sfx/905/905-preview.mp3" bind:this={alarm} />
</div>
