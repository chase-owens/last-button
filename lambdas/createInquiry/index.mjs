import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocumentClient.from(
	new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' })
);

const TABLE_NAME = process.env.INQUIRIES_TABLE;

const corsHeaders = {
	'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
	'Access-Control-Allow-Headers': 'content-type',
	'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

export const handler = async (event) => {
	if (event.requestContext?.http?.method === 'OPTIONS') {
		return {
			statusCode: 204,
			headers: corsHeaders
		};
	}

	try {
		if (!TABLE_NAME) {
			throw new Error('Missing INQUIRIES_TABLE environment variable');
		}

		const body = JSON.parse(event.body || '{}');

		const inquiry = {
			inquiryId: crypto.randomUUID(),
			name: body.name?.trim() || '',
			lastName: body.lastName?.trim() || '',
			restaurantName: body.restaurantName?.trim() || '',
			email: body.email?.trim() || '',
			phone: body.phone?.trim() || '',
			restaurantType: body.restaurantType?.trim() || '',
			challenge: body.challenge?.trim() || '',
			source: body.source || 'contact-page',
			status: 'new',
			createdAt: new Date().toISOString()
		};

		if (inquiry.lastName) {
			return {
				statusCode: 200,
				headers: corsHeaders,
				body: JSON.stringify(inquiry)
			};
		}

		if (!inquiry.name || !inquiry.email) {
			return {
				statusCode: 400,
				headers: corsHeaders,
				body: JSON.stringify({
					message: 'Name and email are required.'
				})
			};
		}

		await dynamo.send(
			new PutCommand({
				TableName: TABLE_NAME,
				Item: inquiry
			})
		);

		return {
			statusCode: 201,
			headers: corsHeaders,
			body: JSON.stringify({
				message: 'Inquiry created',
				inquiryId: inquiry.inquiryId
			})
		};
	} catch (error) {
		console.error('CREATE_INQUIRY_ERROR', error);

		return {
			statusCode: 500,
			headers: corsHeaders,
			body: JSON.stringify({
				message: 'Failed to create inquiry'
			})
		};
	}
};
