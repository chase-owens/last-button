<script lang="ts">
	import '../app.css';

	import AppShell from '$lib/components/layout/AppShell.svelte';

	let { children } = $props();
</script>

<AppShell>
	{@render children()}
</AppShell>
