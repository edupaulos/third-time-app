<script>
	import '../app.css';
	import Header from './Header.svelte';
	import './styles.css';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex flex-col flex-1 min-h-svh bg-50">
	<Header />
	<main class="flex flex-1 flex-col m-auto">
		<slot />
	</main>
</div>

<!-- <style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style> -->
