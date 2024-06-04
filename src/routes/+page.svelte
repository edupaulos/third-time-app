<script lang="ts">
	import { timer } from '$lib/timer';
	import Counter from './Counter.svelte';
	import '@fontsource/lilita-one';

	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${minutes}:${secs}`;
	}

	// Reactive store subscription
	let formattedTime: string;

	$: formattedTime = formatTime($timer);
</script>

<svelte:head>
	<title>{formattedTime}</title>
	<meta name="description" content="Third Time app" />
</svelte:head>

<section>
	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
