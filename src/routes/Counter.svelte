<script lang="ts">
	let initialTime = 0;
	let time = initialTime;
	let breakTime = 0;
	let isStopped = true;
	let isBreaking = false;

	let alarm: HTMLAudioElement;

	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${minutes}:${secs}`;
	}

	let timer: number | undefined;
	let breakTimer: number | undefined;

	function handleStartStop() {
		if (isStopped) {
			timer = setInterval(() => {
				time += 1;
				breakTime = Math.trunc(time / 3);
			}, 1000);
		} else {
			clearInterval(timer);
			timer = undefined;
		}
		isStopped = !isStopped;
	}

	function handleBreak() {
		if (isBreaking) {
			clearInterval(breakTimer);
			breakTimer = undefined;
		} else {
			if (breakTime > 0) {
				isStopped = true;
				clearInterval(timer);
				timer = undefined;
				time = initialTime;
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

	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (timer !== undefined) {
			clearInterval(timer);
		}
		if (breakTimer !== undefined) {
			clearInterval(breakTimer);
		}
	});
</script>

<div class="flex flex-col gap-5">
	<div class="flex gap-3">
		<div class="bg-300 px-36 py-14 rounded-3xl">
			<span class="text-8xl text-900 font-bold">{formatTime(time)}</span>
		</div>
		<div class="bg-200 px-14 py-14 rounded-3xl">
			<p>Next Break</p>
			<span class="text-6xl text-900 font-bold">{formatTime(breakTime)}</span>
		</div>
	</div>

	<button
		class={`${isStopped ? 'bg-green-200' : 'bg-red-200'} py-3 px-10 rounded-3xl`}
		on:click={handleStartStop}
	>
		<div class="font-bold text-2xl">{isStopped ? 'Start' : 'Stop'}</div>
	</button>

	<button
		class={`${isBreaking ? 'bg-red-200' : 'bg-green-200'} py-3 px-10 rounded-3xl disabled:bg-100`}
		on:click={handleBreak}
		disabled={breakTime <= 0}
	>
		<div class="font-bold text-2xl">{isBreaking ? 'Stop Break' : 'Start Break'}</div>
	</button>

	<audio src="https://assets.mixkit.co/active_storage/sfx/905/905-preview.mp3" bind:this={alarm} />
</div>

<style>
	.counter {
		display: flex;
		margin: 1rem 0;
	}
</style>
