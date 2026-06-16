<script lang="ts">
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	let form = $state({
		name: '',
		restaurantName: '',
		email: '',
		phone: '',
		restaurantType: '',
		challenge: ''
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...form,
					source: 'contact-page'
				})
			});

			if (!response.ok) {
				throw new Error('Failed to submit inquiry');
			}

			submitStatus = 'success';

			form = {
				name: '',
				restaurantName: '',
				email: '',
				phone: '',
				restaurantType: '',
				challenge: ''
			};
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'Something went wrong. Please try again or contact us directly.';
		} finally {
			isSubmitting = false;
		}
	}

	const ctaLabel = $derived(isSubmitting ? 'Submitting...' : 'Request Discovery Call');
</script>

<section class="mx-auto max-w-6xl px-4 py-20">
	<div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
		<div>
			<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">
				Schedule an Assessment
			</p>

			<h1 class="mt-3 font-heading text-5xl text-primary md:text-6xl">
				Start with a Conversation.
			</h1>

			<p class="mt-8 max-w-2xl text-lg leading-8 text-muted">
				Every restaurant is different. The first step isn't recommendations—it's understanding your
				concept, goals, current challenges, and what success looks like for your operation.
			</p>

			<p class="mt-6 max-w-2xl leading-8 text-muted">
				We'll discuss where you are today, where you'd like to be, and whether an assessment is the
				right fit. If there is an opportunity to strengthen execution, align standards, and improve
				results, we'll outline what the next steps could look like.
			</p>

			<div class="mt-10 rounded-vintage border border-border bg-surface p-6">
				<h2 class="font-heading text-2xl text-primary">What to Expect</h2>

				<ul class="mt-6 space-y-4 text-muted">
					<li>
						<strong class="text-primary">Discovery Conversation</strong> — Learn about your operation,
						priorities, and current challenges.
					</li>

					<li>
						<strong class="text-primary">Assessment Discussion</strong> — Review what an on-site assessment
						involves and whether it makes sense for your operation.
					</li>

					<li>
						<strong class="text-primary">Next Steps</strong> — If there's a fit, we'll discuss potential
						opportunities and an approach moving forward.
					</li>
				</ul>
			</div>
		</div>

		<div class="rounded-vintage border border-border bg-surface p-8 shadow-soft">
			<h2 class="font-heading text-3xl text-primary">Request an Assessment</h2>

			<p class="mt-3 text-muted">Tell us a little about your operation and we'll be in touch.</p>

			<form class="mt-8 space-y-5" onsubmit={handleSubmit}>
				<div>
					<label for="name" class="mb-2 block text-sm font-medium text-primary"> Name </label>

					<input
						id="name"
						name="name"
						type="text"
						autocomplete="name"
						required
						bind:value={form.name}
						class="w-full rounded border border-border bg-background px-4 py-3"
						placeholder="Your name"
					/>
				</div>

				<div>
					<label for="restaurantName" class="mb-2 block text-sm font-medium text-primary">
						Restaurant Name
					</label>

					<input
						id="restaurantName"
						name="restaurantName"
						type="text"
						bind:value={form.restaurantName}
						autocomplete="organization"
						class="w-full rounded border border-border bg-background px-4 py-3"
						placeholder="Restaurant name"
					/>
				</div>

				<div class="grid gap-5 md:grid-cols-2">
					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-primary"> Email </label>

						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={form.email}
							class="w-full rounded border border-border bg-background px-4 py-3"
							placeholder="name@email.com"
						/>
					</div>

					<div>
						<label for="phone" class="mb-2 block text-sm font-medium text-primary"> Phone </label>

						<input
							id="phone"
							name="phone"
							type="tel"
							autocomplete="tel"
							bind:value={form.phone}
							class="w-full rounded border border-border bg-background px-4 py-3"
							placeholder="(555) 555-5555"
						/>
					</div>
				</div>

				<div>
					<label for="restaurantType" class="mb-2 block text-sm font-medium text-primary">
						Restaurant Type
					</label>

					<input
						id="restaurantType"
						name="restaurantType"
						type="text"
						bind:value={form.restaurantType}
						class="w-full rounded border border-border bg-background px-4 py-3"
						placeholder="Casual Dining, Sports Bar, Fine Dining, Bakery..."
					/>
				</div>

				<div>
					<label for="challenge" class="mb-2 block text-sm font-medium text-primary">
						Biggest Challenge Right Now
					</label>

					<textarea
						id="challenge"
						name="challenge"
						bind:value={form.challenge}
						rows="5"
						class="w-full rounded border border-border bg-background px-4 py-3"
						placeholder="Tell us about your operation, current challenges, or what prompted you to reach out."
					></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full rounded-vintage bg-primary px-6 py-4 font-semibold text-white transition hover:opacity-90"
				>
					{ctaLabel}
				</button>

				{#if submitStatus === 'success'}
					<p class="text-sm text-green-700">Thanks — your request has been sent.</p>
				{/if}

				{#if submitStatus === 'error'}
					<p class="text-sm text-red-700">
						{errorMessage}
					</p>
				{/if}
			</form>
		</div>
	</div>
</section>
