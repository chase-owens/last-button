import { PUBLIC_INTERVIEW_API_URL } from '$env/static/public';

import type { CreateVisionResult } from '@last-button/domain';

export type InterviewProcessingStatus = 'processing' | 'complete' | 'failed';

export type GetInterviewResponse = {
	interviewId: string;
	processingStatus: InterviewProcessingStatus;
	result?: CreateVisionResult;
	errorMessage?: string;
	updatedAt: string;
};

const getErrorMessage = async (response: Response, fallback: string): Promise<string> => {
	try {
		const body = (await response.json()) as {
			message?: string;
		};

		return body.message ?? fallback;
	} catch {
		return fallback;
	}
};

export const getInterview = async (interviewId: string): Promise<GetInterviewResponse> => {
	const response = await fetch(
		`${PUBLIC_INTERVIEW_API_URL}/interviews/${encodeURIComponent(interviewId)}`,
		{
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		}
	);

	if (!response.ok) {
		throw new Error(await getErrorMessage(response, 'The interview status could not be loaded.'));
	}

	return (await response.json()) as GetInterviewResponse;
};
