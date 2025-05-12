import { S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
const { AWS_REGION: region, AWS_PROFILE: profile, NODE_ENV: environment } = process.env;

const isLocal = environment !== 'production';

export const s3Client = new S3Client({
    region,
    // If running locally, load credentials from the profile specified in the environment, otherwise use IAM role credentials (in production)
    credentials: isLocal ? fromIni({ profile }) : undefined,
});
