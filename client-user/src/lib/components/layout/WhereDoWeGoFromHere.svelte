<script lang="ts">
	import { resolve } from '$app/paths';

	import Checkmark from '$lib/assets/icons/Checkmark.svelte';
</script>

<div>
	<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">
		Where do we go from here?
	</p>

	<h2 class="mt-3 font-heading text-5xl text-primary md:text-6xl">
		Your Vision Is the Destination
	</h2>

	<div class="mt-8 flex flex-col gap-6">
		<p class="max-w-2xl text-lg leading-8 text-muted">
			You've just completed the first phase of the Constructional Interview by defining what
			successful execution looks like for your restaurant.
		</p>

		<p class="max-w-2xl text-lg leading-8 text-muted">
			Most restaurants don't struggle because they lack goals. They struggle because success has
			never been clearly defined in a way that can be observed, coached, and measured.
		</p>

		<p class="max-w-2xl leading-8 text-muted">
			The next step is understanding how to move from your current operation to this vision.
		</p>
	</div>

	<div class="mt-10 rounded-vintage border border-border bg-surface p-6">
		<h3 class="font-heading text-2xl text-primary">The Full Constructional Interview</h3>

		<ul class="mt-6 space-y-4">
			<li class="flex items-center gap-3">
				<span class="text-green-600">
					<Checkmark class="size-4" />
				</span>
				<span class="text-primary">Identify what's already working well</span>
			</li>

			<li class="flex items-center gap-3">
				<span class="text-green-600">
					<Checkmark class="size-4" />
				</span>
				<span class="text-primary">Discover where execution begins to break down</span>
			</li>

			<li class="flex items-center gap-3">
				<span class="text-green-600">
					<Checkmark class="size-4" />
				</span>
				<span class="text-primary">Build from the strengths already present</span>
			</li>

			<li class="flex items-center gap-3">
				<span class="text-green-600">
					<Checkmark class="size-4" />
				</span>
				<span class="text-primary">
					Create a practical roadmap from today's operation to this vision
				</span>
			</li>
		</ul>

		<div class="mt-8 border-t border-border pt-6">
			<p class="text-lg font-semibold text-primary">Want help building the roadmap?</p>

			<p class="mt-3 max-w-2xl leading-7 text-muted">
				We work with restaurant operators to complete the Constructional Interview, develop
				practical roadmaps, and build coaching systems that make operational improvement
				sustainable.
			</p>

			<a
				href={resolve('/contact')}
				class="mt-6 inline-flex rounded-vintage bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
			>
				Let's Talk
			</a>
		</div>
	</div>
</div>
