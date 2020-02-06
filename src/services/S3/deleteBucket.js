import { S3 } from 'aws-sdk';
import {  API_VERSIONS, REGION } from '../../constants';


const s3 = new S3({ apiVersion: API_VERSIONS, region: REGION });


// API params
const deleteBucketParams = {
  Bucket: `london-abhishek-6220-bucket.s3.${REGION}.amazonaws.com`,
};


const deleteBucket = async () => {
  const deleteBucketData = await s3.deleteBucket(deleteBucketParams).promise();

  console.log(deleteBucketData);
  // successful output: {} 
};

deleteBucket();
