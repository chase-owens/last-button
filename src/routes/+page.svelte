<script lang="ts">
	import Footer from '$lib/components/ui/Footer.svelte';
	import HowItWorks from '$lib/components/ui/HowItWorks.svelte';
	import PhilosophySection from '$lib/components/ui/PhilosophySection.svelte';
	import Pillars from '$lib/components/ui/Pillars.svelte';
</script>

<svelte:head>
	<title>The Last Button | Restaurant Standards & Guest Experience</title>
</svelte:head>

<section class="bg-surface">
	<div
		class="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-28"
	>
		<div>
			<p class="mb-4 text-sm font-semibold tracking-[0.24em] text-accent uppercase">
				Restaurant Standards & Guest Experience
			</p>

			<h1 class="font-heading text-5xl leading-tight text-primary md:text-6xl">
				Great Restaurants Aren't Missing a Foundation
			</h1>

			<p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
				Most restaurants already have what they need to succeed. We help operators define standards,
				measure performance, and close the gap between intention and execution.
			</p>

			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<a href="/contact" class="btn-primary px-6 py-4 text-center">Schedule an Assessment</a>
			</div>
		</div>

		<div class="rounded-vintage border border-border bg-background p-6 shadow-soft">
			<div class="space-y-4">
				<div class="flex items-center justify-between border-b border-border pb-3">
					<span class="font-medium">Great Food</span>
					<span class="text-accent">✓</span>
				</div>
				<div class="flex items-center justify-between border-b border-border pb-3">
					<span class="font-medium">Great People</span>
					<span class="text-accent">✓</span>
				</div>
				<div class="flex items-center justify-between border-b border-border pb-3">
					<span class="font-medium">Great Concept</span>
					<span class="text-accent">✓</span>
				</div>
				<div class="flex items-center justify-between">
					<span class="font-heading text-2xl text-primary">The Last Button</span>
					<span class="rounded-full bg-highlight px-3 py-1 text-sm font-semibold text-white">?</span
					>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-20">
	<div class="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
		<div>
			<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">The Problem</p>
			<h2 class="mt-3 font-heading text-4xl text-primary md:text-5xl">
				Consistency Doesn't Happen by Accident.
			</h2>
			<h3 class="mt-3 font-heading text-4xl text-primary md:text-5xl">
				It's Built Through Standards.
			</h3>
		</div>

		<div class="rounded-vintage bg-surface p-6 shadow-soft">
			<p class="text-lg leading-8 text-muted">
				Before blaming people, priorities, or processes, ask:
			</p>

			<p class="mt-5 border-l-4 border-accent pl-5 font-heading text-2xl leading-9 text-foreground">
				Are the standards that define success being executed consistently?
			</p>
		</div>
	</div>
</section>

<PhilosophySection />
<Pillars />
<section class="bg-surface">
	<div class="mx-auto max-w-6xl px-4 py-20">
		<div class="max-w-3xl">
			<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">The Outcome</p>

			<h2 class="mt-3 font-heading text-4xl text-primary md:text-5xl">
				Control the Standards. Influence the Results that Matter.
			</h2>

			<p class="mt-6 text-lg leading-8 text-muted">
				Repeat customers. Guest satisfaction. Food waste. Labor efficiency. Online reviews.
				Profitability. These outcomes often feel outside a restaurant's control. In reality, many
				are influenced by standards that can be defined, measured, and improved.
			</p>
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-3">
			<article class="rounded-vintage border border-border bg-white p-8 shadow-soft">
				<div class="text-sm font-semibold tracking-[0.18em] text-accent uppercase">01</div>

				<h3 class="mt-4 font-heading text-3xl text-primary">Identify what Drives Results</h3>

				<p class="mt-4 leading-7 text-muted">
					Understand which standards have the greatest influence on guest experience, operational
					performance, and business outcomes.
				</p>
			</article>

			<article class="rounded-vintage border border-border bg-white p-8 shadow-soft">
				<div class="text-sm font-semibold tracking-[0.18em] text-accent uppercase">02</div>

				<h3 class="mt-4 font-heading text-3xl text-primary">Improve What You Can Control</h3>

				<p class="mt-4 leading-7 text-muted">
					Remove barriers, align priorities, and create systems that make successful execution
					easier every day.
				</p>
			</article>

			<article class="rounded-vintage border border-border bg-white p-8 shadow-soft">
				<div class="text-sm font-semibold tracking-[0.18em] text-accent uppercase">03</div>

				<h3 class="mt-4 font-heading text-3xl text-primary">Expand Control Over Outcomes</h3>

				<p class="mt-4 leading-7 text-muted">
					As execution becomes more consistent, guest experience, labor efficiency, waste reduction,
					repeat business, and profitability become easier to influence and improve.
				</p>
			</article>
		</div>

		<div class="mt-12 rounded-vintage border border-border bg-white p-8">
			<p class="font-heading text-2xl text-primary md:text-3xl">
				When improvement is measurable, confidence replaces guesswork.
			</p>

			<p class="mt-4 max-w-4xl leading-7 text-muted">
				The objective isn't perfection. It's knowing what success looks like, understanding where
				you stand today, and having a practical path for getting where you want to go.
			</p>
		</div>
	</div>
</section>
<HowItWorks />
<Footer />
