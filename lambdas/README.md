# Lambdas

Backend Lambda functions for The Last Button.

These functions support the static SvelteKit website by handling server-side operations such as inquiry creation, DynamoDB writes, and future admin/notification workflows.

## Current Functions

### createInquiry

Handles assessment/contact form submissions.

Flow:

```txt
Svelte Contact Form
  → API Gateway HTTP API
  → createLastButtonInquiry Lambda
  → LastButtonInquiries DynamoDB table
```

## DynamoDB

### Table

```txt
LastButtonInquiries
```

### Primary Key

```txt
inquiryId
```

Type:

```txt
String
```

## createInquiry Item Shape

```ts
{
  inquiryId: string;
  name: string;
  restaurantName: string;
  email: string;
  phone: string;
  restaurantType: string;
  challenge: string;
  source: 'contact-page';
  status: 'new';
  createdAt: string;
}
```

## Lambda Environment Variables

These are configured in the AWS Lambda console.

```txt
INQUIRIES_TABLE=LastButtonInquiries
ALLOWED_ORIGIN=http://localhost:5173
```

For production, update `ALLOWED_ORIGIN` to the deployed site domain.

Example:

```txt
ALLOWED_ORIGIN=https://thelastbutton.com
```

## IAM Permissions

The `createLastButtonInquiry` Lambda execution role needs permission to write to DynamoDB.

```json
{
	"Effect": "Allow",
	"Action": ["dynamodb:PutItem"],
	"Resource": "arn:aws:dynamodb:us-east-1:657830185399:table/LastButtonInquiries"
}
```

## API Gateway

### API

```txt
last-button-api
```

### Route

```txt
POST /inquiries
```

### Current Endpoint

```txt
https://wx0696o6u1.execute-api.us-east-1.amazonaws.com/prod/inquiries
```

## Local Frontend Environment

The Svelte app uses a Vite environment variable.

```txt
VITE_API_BASE_URL=https://wx0696o6u1.execute-api.us-east-1.amazonaws.com/prod
```

After changing `.env`, restart the dev server.

```sh
npm run dev
```

## Testing the Endpoint

```sh
curl -X POST https://wx0696o6u1.execute-api.us-east-1.amazonaws.com/prod/inquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","restaurantName":"Test Restaurant","email":"test@example.com","phone":"5555555555","restaurantType":"Sports Bar","challenge":"Testing inquiry form"}'
```

Expected response:

```json
{
	"message": "Inquiry created",
	"inquiryId": "..."
}
```

## Future Functions

Potential future Lambda functions:

```txt
getInquiries
updateInquiryStatus
sendInquiryEmail
```

These would support an admin view, inquiry tracking, and email notifications.
