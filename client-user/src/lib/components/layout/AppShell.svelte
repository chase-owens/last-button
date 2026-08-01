<script lang="ts">
	import '../../../app.css';

	let { children } = $props();

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<div class="min-h-screen bg-background text-foreground">
	<header class="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
		<div class="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
			<a href="/" class="group">
				<p class="font-heading text-xl text-primary md:text-2xl">The Last Button</p>
				<p class="text-xs tracking-[0.22em] text-muted uppercase">Observe. Measure. Improve.</p>
			</a>

			<nav class="hidden items-center gap-6 text-sm font-medium md:flex">
				{#each navItems as item}
					<a href={item.href} class="text-foreground/75 transition hover:text-primary">
						{item.label}
					</a>
				{/each}
			</nav>

			<!-- <a href="/contact" class="btn-primary hidden px-4 py-3 text-sm md:inline-flex">
				Schedule an Assessment
			</a> -->
		</div>

		<nav class="border-t border-border px-4 py-3 md:hidden">
			<div class="mx-auto flex max-w-6xl gap-3 text-sm font-medium">
				{#each navItems as item}
					<a href={item.href} class="text-foreground/75 hover:text-primary">
						{item.label}
					</a>
				{/each}
			</div>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="border-t border-border bg-primary text-primary-foreground">
		<div class="mx-auto max-w-6xl px-4 py-10">
			<div class="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-start">
				<div>
					<h2 class="font-heading text-2xl text-white">The Last Button</h2>
					<p class="mt-3 max-w-xl text-sm leading-6 text-white/75">
						Helping restaurants find the details standing between good and exceptional.
					</p>
				</div>

				<nav class="flex flex-wrap gap-4 text-sm text-white/75 md:justify-end">
					{#each navItems as item}
						<a href={item.href} class="hover:text-white">{item.label}</a>
					{/each}
				</nav>
			</div>

			<div class="mt-8 border-t border-white/15 pt-5 text-sm text-white/60">
				© 2026 The Last Button. All rights reserved.
			</div>
		</div>
	</footer>
</div>
