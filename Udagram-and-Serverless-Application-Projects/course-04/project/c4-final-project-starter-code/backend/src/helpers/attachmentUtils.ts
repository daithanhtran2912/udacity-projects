import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';

const XAWS = AWSXRay.captureAWS(AWS);

// TODO: Implement the fileStogare logic
const bucketName = process.env.ATTACHMENT_S3_BUCKET;
const signedUrlExpiration = process.env.SIGNED_URL_EXPIRATION;

export async function createPresignUrl(todoId: string): Promise<string> {
  const s3_bucket = new XAWS.S3({
    signatureVersion: 'v4'
  });

  return s3_bucket.getSignedUrl("putObject", {
    Bucket: bucketName,
    Key: todoId,
    Expires: parseInt(signedUrlExpiration)
  });
}

export function createAttachmentUrl(todoId: string): string {
  return `https://${bucketName}.s3.amazonaws.com/${todoId}`;
}