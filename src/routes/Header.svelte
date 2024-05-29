<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.svg';
</script>

<header>
	<div class="flex items-center p-5 gap-6">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
		<p class="text-900 text-4xl">3rd Time</p>
	</div>

	<nav></nav>
</header>

<style>
	a:hover {
		color: var(--color-theme-1);
	}
</style>
