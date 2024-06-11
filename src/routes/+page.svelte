<script lang="ts">
	import { timer } from '$lib/timer';
	import { formatTime } from '../utils/formatTime';
	import Counter from './Counter.svelte';
	import '@fontsource/lilita-one';

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
