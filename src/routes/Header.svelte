<script>
	import logo from '$lib/images/logo.svg';
	import Settings from '../components/Settings.svelte';
</script>

<header class="flex p-5 justify-between">
	<div class="flex items-center gap-6">
		<img src={logo} alt="3rd Time Logo" class="size-12" />
		<p class="text-900 text-4xl">3rd Time</p>
	</div>
	<Settings />
</header>
