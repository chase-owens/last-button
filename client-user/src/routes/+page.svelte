<script lang="ts">
	import { resolve } from '$app/paths';
	import Footer from '$lib/components/ui/Footer.svelte';
	import HowItWorks from '$lib/components/ui/HowItWorks.svelte';
	import PhilosophySection from '$lib/components/ui/PhilosophySection.svelte';
	import Pillars from '$lib/components/ui/Pillars.svelte';
</script>

<svelte:head>
	<title>The Last Button | Restaurant Operations Consulting</title>

	<meta
		name="description"
		content="The Last Button helps independent restaurants improve consistency, guest experience, and operational execution with a constructional approach to restaurant excellence."
	/>

	<meta name="robots" content="index,follow" />

	<link rel="canonical" href="https://thatlastbutton.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="The Last Button" />
	<meta property="og:description" content="Helping restaurants operations match the vision" />
	<meta property="og:url" content="https://thatlastbutton.com/" />
</svelte:head>

<section class="bg-surface">
	<div
		class="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:pb-20"
	>
		<div>
			<p class="mb-4 text-sm font-semibold tracking-[0.24em] text-accent uppercase">
				DEFINE YOUR STANDARD OF EXCELLENCE
			</p>

			<h1 class="font-heading text-5xl leading-tight text-primary">
				Your restaurant doesn't need more ideas. It needs better execution.
			</h1>

			<p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
				Define what exceptional execution actually looks like for your restaurant. In just a few
				minutes, you'll create a clear operational vision that can be measured, coached, and
				consistently delivered.
			</p>

			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
				<a href={resolve('/vision')} class="btn-primary px-6 py-4 text-center">
					Create Your Vision
				</a>
			</div>
		</div>

		<div class="overflow-hidden rounded-vintage border border-border bg-background shadow-soft">
			<img
				src="/images/bar_hero.png"
				alt="A warmly lit restaurant bar prepared for evening service"
				class="aspect-4/5 h-full w-full object-cover md:aspect-3/4"
			/>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-20">
	<div class="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
		<div>
			<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">The Problem</p>
			<h2 class="mt-3 font-heading text-4xl text-primary md:text-5xl">
				Most improvement starts in the wrong place
			</h2>
			<p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
				When the kitchen crashes or the front of house feels chaotic during a busy service, it's
				natural to focus on the problems you want to eliminate.
			</p>
		</div>

		<div class="rounded-vintage bg-surface p-6 shadow-soft">
			<p class="text-lg leading-8 text-muted">But problems rarely tell you what to build.</p>

			<p class="mt-5 border-l-4 border-accent pl-5 font-heading text-2xl leading-9 text-foreground">
				They only tell you what you don't want.
			</p>
		</div>
	</div>
</section>

<PhilosophySection />
<Pillars />
<!-- <HowItWorks /> -->
<img
	class="lg:mx-20"
	src="/images/ci_cd.png"
	alt="how it work. a cycle of continuous improvement and continuous delivery."
/>
<Footer />
