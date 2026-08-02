<script lang="ts">
	import { resolve } from '$app/paths';
	import Footer from '$lib/components/ui/Footer.svelte';
	import HowItWorks from '$lib/components/ui/HowItWorks.svelte';
	import PhilosophySection from '$lib/components/ui/PhilosophySection.svelte';
	import Pillars from '$lib/components/ui/Pillars.svelte';

	//     if (result.status === "continue") {
	//   messages.push({
	//     role: "coach",
	//     content: result.coachMessage
	//   });
	// }

	// if (result.status === "complete") {
	//   vision = result.vision;
	// }
</script>

<svelte:head>
	<title>The Last Button | Restaurant Operations Consulting</title>

	<meta
		name="description"
		content="The Last Button helps independent restaurants improve consistency, guest experience, and operational execution with a constructional approach to restaurant excellence."
	/>

	<meta
		name="keywords"
		content="restaurant consulting, restaurant operations, guest experience, hospitality consulting, restaurant standards, restaurant audits, restaurant assessments, server, server training"
	/>

	<meta name="robots" content="index,follow" />

	<link rel="canonical" href="https://thatlastbutton.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="The Last Button" />
	<meta
		property="og:description"
		content="Helping restaurants identify operational gaps and build accountability systems that drive consistent execution."
	/>
	<meta property="og:url" content="https://thatlastbutton.com/" />
	<meta property="og:image" content="https://thatlastbutton.com/images/ls_logo.png" />
</svelte:head>

<section class="bg-surface">
	<div
		class="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28"
	>
		<div>
			<p class="mb-4 text-sm font-semibold tracking-[0.24em] text-accent uppercase">
				DEFINE YOUR STANDARD OF EXCELLENCE
			</p>

			<h1 class="font-heading text-5xl leading-tight text-primary md:text-6xl">
				Your Restaurant Doesn't Need More Ideas. It needs better execution.
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
