import { S3 } from 'aws-sdk';
import { API_VERSIONS, REGION } from '../../constants';


const s3 = new S3({ apiVersion: API_VERSIONS.s3, region: REGION });


// API params
const createBucketParams = {
  ACL: 'private',
  Bucket: `london-abhishek-6220-bucket.s3.${REGION}.amazonaws.com`,
  CreateBucketConfiguration: {
    LocationConstraint: REGION,
  }
};


const createBucket = async () => {
  const isBucketCreated = await s3.createBucket(createBucketParams).promise();

  console.log(isBucketCreated);
  // output:
  // { Location: '/london-abhishek-6220-bucket.s3.us-east-1.amazonaws.com' }
};


createBucket();
