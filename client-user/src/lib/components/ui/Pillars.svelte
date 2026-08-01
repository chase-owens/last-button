<script lang="ts">
	const pillars = [
		{
			title: 'Guest',
			text: 'The standards that when met or not impact the guest experience.',
			items: [
				'Arrival & first impression',
				'Service standards',
				'Hospitality',
				'Recovery & resolution',
				'Guest satisfaction'
			]
		},
		{
			title: 'Kitchen',
			text: 'The standards that protect food quality, timing, and consistency.',
			items: [
				'Ticket times',
				'Food temperature',
				'Plate presentation',
				'Storage & waste',
				'Execution under volume'
			]
		},
		{
			title: 'Team',
			text: 'The standards that help managers and staff execute the vision every shift.',
			items: [
				'Shift communication',
				'Training expectations',
				'Manager verification',
				'Coaching rhythm',
				'Accountability'
			]
		},
		{
			title: 'Business',
			text: 'The standards that connect daily execution to cost control and profitability.',
			items: [
				'Labor efficiency',
				'Food cost',
				'Inventory control',
				'Sales performance',
				'Repeat customers'
			]
		}
	];
</script>

<section class="mx-auto max-w-6xl px-4 py-20 md:py-24">
	<div class="max-w-3xl">
		<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">What We Measure</p>

		<h2 class="mt-3 font-heading text-4xl text-primary md:text-5xl">
			Success Looks Different Everywhere.
		</h2>

		<p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
			The standards that define success depend on the concept, the operation, and the experience
			ownership intends to create.
		</p>
	</div>

	<div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
		{#each pillars as pillar}
			<article class="rounded-vintage border border-border bg-surface p-5 shadow-soft">
				<div
					class="mb-5 flex size-10 items-center justify-center rounded-full bg-primary text-white"
				>
					●
				</div>

				<h3 class="font-heading text-2xl text-primary">{pillar.title}</h3>

				<p class="mt-3 text-sm leading-6 text-muted">{pillar.text}</p>

				<ul class="mt-5 space-y-3 border-t border-border pt-5 text-sm text-muted">
					{#each pillar.items as item}
						<li class="flex gap-3">
							<span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>
