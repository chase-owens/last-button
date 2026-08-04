import { getInterview, type GetInterviewResponse } from './getInterview';

const DEFAULT_INTERVAL_MS = 2_000;
const DEFAULT_TIMEOUT_MS = 180_000;

type PollInterviewOptions = {
	intervalMs?: number;
	timeoutMs?: number;
	signal?: AbortSignal;
};

const wait = (durationMs: number, signal?: AbortSignal): Promise<void> =>
	new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(new DOMException('Polling was cancelled.', 'AbortError'));
			return;
		}

		const timeoutId = window.setTimeout(() => {
			signal?.removeEventListener('abort', handleAbort);
			resolve();
		}, durationMs);

		const handleAbort = () => {
			window.clearTimeout(timeoutId);
			reject(new DOMException('Polling was cancelled.', 'AbortError'));
		};

		signal?.addEventListener('abort', handleAbort, {
			once: true
		});
	});

export const pollInterview = async (
	interviewId: string,
	options: PollInterviewOptions = {}
): Promise<GetInterviewResponse> => {
	const { intervalMs = DEFAULT_INTERVAL_MS, timeoutMs = DEFAULT_TIMEOUT_MS, signal } = options;

	const startedAt = Date.now();

	while (Date.now() - startedAt < timeoutMs) {
		if (signal?.aborted) {
			throw new DOMException('Polling was cancelled.', 'AbortError');
		}

		const interview = await getInterview(interviewId);

		if (interview.processingStatus === 'complete') {
			if (!interview.result) {
				throw new Error('The interview completed without returning a result.');
			}

			return interview;
		}

		if (interview.processingStatus === 'failed') {
			throw new Error(
				interview.errorMessage ?? 'Something went wrong while processing the interview.'
			);
		}

		await wait(intervalMs, signal);
	}

	throw new Error('The interview is taking longer than expected. Please try again.');
};
