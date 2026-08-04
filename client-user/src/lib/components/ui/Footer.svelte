<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<section class="bg-primary">
	<div class="mx-auto max-w-6xl px-4 py-12 text-center">
		<h2 class="font-heading text-4xl text-white md:text-5xl">Ready to Button it Up?</h2>
		<p class="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/75">
			Every great operation starts with a clear picture of success.
		</p>

		<p class="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/75">Let's define yours.</p>

		<a
			href={resolve('/vision')}
			class="mt-8 inline-flex rounded-vintage bg-accent px-6 py-4 font-semibold text-primary"
		>
			Create Your Vision
		</a>
	</div>
</section>
