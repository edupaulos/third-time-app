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
	@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
