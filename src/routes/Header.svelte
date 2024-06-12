<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.svg';
	import Settings from '../components/Settings.svelte';
</script>

<header class="flex p-5 justify-between">
	<div class="flex items-center gap-6">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
		<p class="text-900 text-4xl">3rd Time</p>
	</div>
	<Settings />
</header>

<style>
	a:hover {
		color: var(--color-theme-1);
	}
</style>
