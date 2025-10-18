<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';
	import "$lib/i18n/main";
	import { theme } from '$lib/stores/theme';

	onMount(async () => {
		await waitLocale();

		theme.subscribe((value) => {
			document.body.classList.toggle('dark', value === 'dark');
		});
	});
</script>

<slot></slot>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

    :global(body) {
        font-family: 'Geist', sans-serif;
        margin: 0;
        padding: 0;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    :global(.dark) {
        background-color: #1a1a1a;
        color: #ffffff;
    }
</style>
