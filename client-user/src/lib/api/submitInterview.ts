import { PUBLIC_INTERVIEW_API_URL } from '$env/static/public';

export type InterviewMessage = {
	role: 'coach' | 'user';
	content: string;
};

export type SubmitInterviewResponse = {
	interviewId: string;
	processingStatus: 'processing';
};

type SubmitInterviewRequest = {
	messages: InterviewMessage[];
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

export const submitInterview = async (
	messages: InterviewMessage[]
): Promise<SubmitInterviewResponse> => {
	const request: SubmitInterviewRequest = {
		messages
	};

	const response = await fetch(`${PUBLIC_INTERVIEW_API_URL}/interviews`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(request)
	});

	if (!response.ok) {
		throw new Error(await getErrorMessage(response, 'The interview could not be submitted.'));
	}

	return (await response.json()) as SubmitInterviewResponse;
};
