<script lang="ts">
	import Checkmark from '$lib/assets/icons/Checkmark.svelte';
</script>

<div class="md:hidden">
	<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">
		Create your operational vision
	</p>

	<h1 class="mt-3 font-heading text-5xl text-primary">Start with a conversation</h1>

	<div class="mt-8 flex flex-col gap-6">
		<p class="max-w-2xl text-lg leading-8 text-muted">
			Great execution begins with a clear picture of success.
		</p>

		<p class="max-w-2xl text-lg leading-8 text-muted">
			In about five minutes, we'll guide you through a structured conversation that defines what
			exceptional execution looks like in your restaurant.
		</p>

		<p class="max-w-2xl leading-8 text-muted">
			Before discussing solutions, we'll first define success.
		</p>
	</div>
</div>

<div class="hidden md:block">
	<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">
		Create your operational vision
	</p>

	<h1 class="mt-3 font-heading text-5xl text-primary md:text-6xl">Start with a conversation</h1>

	<div class="mt-8 flex flex-col gap-6">
		<p class="max-w-2xl text-lg leading-8 text-muted">
			Great execution begins with a clear picture of success.
		</p>

		<p class="max-w-2xl text-lg leading-8 text-muted">
			In about five minutes, we'll guide you through a structured conversation that defines what
			exceptional execution looks like in your restaurant. Together, we'll create a shared
			operational vision that can be observed, coached, measured, and consistently delivered.
		</p>

		<p class="max-w-2xl leading-8 text-muted">
			Before discussing solutions, we'll first define what success actually looks like.This isn't a
			survey or a checklist. It's a focused interview designed to uncover the standards that will
			guide every future improvement.
		</p>
	</div>

	<div class="mt-10 rounded-vintage border border-border bg-surface p-6">
		<h2 class="font-heading text-2xl text-primary">What you'll take away today</h2>

		<ul class="mt-6 space-y-4">
			<li class="flex items-center gap-3">
				<span class="text-green-600">
					<Checkmark class="size-4" />
				</span>
				<span class="text-primary">A clear operational vision</span>
			</li>

			<li class="flex items-center gap-3">
				<span class="text-green-600">
					<Checkmark class="size-4" />
				</span>
				<span class="text-primary">Observable execution standards</span>
			</li>

			<li class="flex items-center gap-3">
				<span class="text-green-600">
					<Checkmark class="size-4" />
				</span>
				<span class="text-primary">A shared definition of success</span>
			</li>

			<li class="flex items-center gap-3">
				<span class="text-green-600">
					<Checkmark class="size-4" />
				</span>
				<span class="text-primary">A foundation for coaching and improvement</span>
			</li>
		</ul>
	</div>
</div>
