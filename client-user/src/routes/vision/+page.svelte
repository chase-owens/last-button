<script lang="ts">
	import Checkmark from '$lib/assets/icons/Checkmark.svelte';
	import type { RestaurantVision, InterviewPhase, CreateVisionResult } from '@last-button/domain';
	import { tick } from 'svelte';

	type Message = {
		role: 'coach' | 'user';
		content: string;
	};

	let phase = $state<InterviewPhase>('restaurant_vision');
	let isOutOfScope = $state(false);
	let hasUserAgreement = $state(false);
	let answer = $state('');
	let messages = $state<Message[]>([
		{ role: 'coach', content: 'Assuming that were successful here, what would the outcome be?' }
	]);
	let isCreatingRestaurantVision = $state(false);

	let totalUserMessages = $derived(messages.filter((message) => message.role === 'user'));

	let vision = $state<RestaurantVision | null>(null);
	let isProcessing = $state(false);
	let errorMessage = $state('');

	const canSubmit = $derived(answer.trim().length > 0 && !isProcessing && !vision);

	const handleKeyDown = async (event: KeyboardEvent) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();

			if (!isProcessing && answer.trim()) {
				await handleSubmit();
			}
		}
	};

	async function handleSubmit(event?: SubmitEvent) {
		event?.preventDefault();

		const trimmedAnswer = answer.trim();

		if (!trimmedAnswer || isProcessing || vision) {
			return;
		}

		const nextMessages: Message[] = [
			...messages,
			{
				role: 'user',
				content: trimmedAnswer
			}
		];

		messages = nextMessages;
		answer = '';
		errorMessage = '';
		isProcessing = true;

		try {
			const response = await fetch(`${import.meta.env.VITE_INTERVIEW_API_BASE_URL}/interviews`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					messages: nextMessages
				})
			});

			const contentType = response.headers.get('content-type') ?? '';

			if (!contentType.includes('application/json')) {
				throw new Error('The interview service returned an unexpected response.');
			}

			const result = (await response.json()) as CreateVisionResult;

			if (!response.ok) {
				throw new Error('The interview could not continue.');
			}

			if (result.status === 'continue') {
				messages = [
					...messages,
					{
						role: 'coach',
						content: result.coachMessage
					}
				];

				return;
			}

			if (result.status === 'complete') {
				messages = [
					...messages,
					{
						role: 'coach',
						content: result.coachMessage
					}
				];

				vision = result.vision;
			}
		} catch (error) {
			console.error('Vision interview failed:', error);

			errorMessage = 'Something went wrong while continuing the conversation. Please try again.';
		} finally {
			isProcessing = false;
		}
	}

	let messagesContainer: HTMLDivElement | undefined = $state(undefined);

	async function scrollToBottom() {
		await tick();

		messagesContainer?.scrollTo({
			top: messagesContainer.scrollHeight,
			behavior: 'smooth'
		});
	}

	const ctaLabel = $derived(isProcessing ? '...' : 'Submit');

	const filteredMessages = $derived(messages.slice(-5));
</script>

<svelte:head>
	<title>Create Your Operational Vision | The Last Button</title>
	<meta
		name="description"
		content="Create a clear operational vision for one restaurant interaction, pattern, or procedure."
	/>
</svelte:head>

<section class="mx-auto max-w-6xl px-4 py-20">
	<div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
		<div>
			<p class="text-sm font-semibold tracking-[0.22em] text-accent uppercase">
				Create your operational vision
			</p>

			<h1 class="mt-3 font-heading text-5xl text-primary md:text-6xl">Start with a Conversation</h1>

			<div class="mt-8 flex flex-col gap-6">
				<p class="max-w-2xl text-lg leading-8 text-muted">
					Every successful restaurant has a vision of what great execution looks like.
				</p>

				<p class="max-w-2xl text-lg leading-8 text-muted">
					In about five minutes, we'll help you define yours. Through a guided conversation, you'll
					create a clear operational vision that can be observed, measured, and consistently
					executed.
				</p>

				<p class="max-w-2xl leading-8 text-muted">
					This isn't a survey or a checklist. It's a structured interview designed to uncover what
					success actually looks like for your restaurant before discussing how to achieve it.
				</p>
			</div>

			<div class="mt-10 rounded-vintage border border-border bg-surface p-6">
				<h2 class="font-heading text-2xl text-primary">What to Expect</h2>

				<ul class="mt-6 space-y-4">
					<li class="flex items-center gap-3">
						<span class="text-green-600">
							<Checkmark class="size-4" />
						</span>
						<span class="text-primary">A clear definition of success</span>
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
						<span class="text-primary">A shared operational vision</span>
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

		<div
			class="flex flex-col rounded-vintage border border-border bg-surface shadow-soft lg:h-full"
		>
			<div class="border-b border-border px-8 py-7">
				<h2 class="font-heading text-3xl text-primary">
					{vision ? 'Your Operational Vision' : 'Create Your Vision'}
				</h2>

				<p class="mt-2 leading-7 text-muted">
					{vision
						? 'Review the definition of successful execution created through your conversation.'
						: "We'll guide you through a short conversation to define what great execution looks like in your restaurant."}
				</p>
			</div>

			{#if vision}
				<div class="space-y-7 px-8 py-8">
					<div>
						<p class="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
							Vision statement
						</p>

						<p class="mt-3 font-heading text-2xl leading-9 text-primary">
							{vision.visionStatement}
						</p>
					</div>

					<div class="border-t border-border pt-6">
						<p class="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
							Operational pattern
						</p>

						<p class="mt-3 leading-7 text-foreground">
							{vision.operationalPattern}
						</p>
					</div>

					{#if vision.observableFeatures.length}
						<div class="border-t border-border pt-6">
							<p class="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
								What success looks like
							</p>

							<ul class="mt-4 space-y-3">
								{#each vision.observableFeatures as feature (feature)}
									<li class="flex gap-3 leading-7 text-foreground">
										<span class="mt-3 size-1.5 shrink-0 rounded-full bg-accent"></span>
										<span>{feature}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			{:else}
				<div class="flex flex-col justify-between lg:h-full">
					<div
						bind:this={messagesContainer}
						class="h-full min-h-0 space-y-8 overflow-y-auto px-8 py-8"
						aria-live="polite"
						aria-label="Vision interview conversation"
					>
						{#each filteredMessages as message, index (`${message.role}-${index}`)}
							{#if message.role === 'coach'}
								<div class="max-w-[90%]">
									<p class="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
										The Last Button
									</p>

									<div class="mt-3 border-l-2 border-accent pl-5">
										<p class="leading-7 text-foreground">
											{message.content}
										</p>
									</div>
								</div>
							{:else}
								<div class="ml-auto max-w-[86%]">
									<p
										class="text-right text-xs font-semibold tracking-[0.16em] text-muted uppercase"
									>
										You
									</p>

									<div class="mt-3 rounded-vintage bg-primary px-5 py-4 text-primary-foreground">
										<p class="leading-7">
											{message.content}
										</p>
									</div>
								</div>
							{/if}
						{/each}

						{#if isProcessing}
							<div class="max-w-[90%]">
								<p class="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
									The Last Button
								</p>

								<div class="mt-3 border-l-2 border-accent pl-5">
									<p class="animate-pulse leading-7 text-muted">Considering your response…</p>
								</div>
							</div>
						{/if}
					</div>

					<form class="flex flex-col border-t border-border p-6" onsubmit={handleSubmit}>
						<label for="vision-answer" class="sr-only">Your response</label>

						<div
							class="flex-1 overflow-y-auto rounded-vintage bg-background focus-within:border-primary"
						>
							<textarea
								id="vision-answer"
								bind:value={answer}
								onkeydown={handleKeyDown}
								disabled={isProcessing}
								rows="3"
								class="min-h-28 w-full resize-none bg-transparent px-4 py-4 leading-7 text-foreground outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-60"
								placeholder={isProcessing
									? 'Considering your response…'
									: 'Type your response here…'}></textarea>

							<div class="flex items-center justify-end bg-white px-4 py-3">
								<button
									type="submit"
									disabled={false}
									class="rounded-vintage bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
								>
									{ctaLabel}
								</button>
							</div>
						</div>

						{#if errorMessage}
							<p class="mt-4 text-sm text-red-700">
								{errorMessage}
							</p>
						{/if}
					</form>
				</div>
			{/if}
		</div>
	</div>
</section>
