<script>
	import logo from '$lib/images/logo.svg';
	import Settings from '../components/Settings.svelte';
	import '@fontsource/lilita-one';
</script>

<header class="flex p-5 justify-between">
	<div class="flex items-center gap-6">
		<img src={logo} alt="3rd Time Logo" class="size-12" />
		<h1 class="text-900 text-4x font-semibold">3rd Time</h1>
	</div>
	<Settings />
</header>
