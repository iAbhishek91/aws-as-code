import { S3 } from 'aws-sdk';
import { API_VERSIONS, REGION } from '../../constants';
import { BUCKET_NAME } from './s3.data';


const s3 = new S3({ apiVersion: API_VERSIONS, region: REGION });


// API params
const deleteBucketParams = {
  Bucket: BUCKET_NAME,
};


const deleteBucket = async () => {
  const deleteBucketData = await s3.deleteBucket(deleteBucketParams).promise();

  console.log(deleteBucketData);
  // successful output: {}
};

deleteBucket();
