// this file uses multiple AWS S3 APIs
/**
 * getBucketAcl returns all assigned access control list for the bucket
 * getBucketLocation returns location of the S3 bucket
 */
import { S3 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';
import { BUCKET_NAME } from './s3.data';


const s3 = new S3({ region: REGION, apiVersion: API_VERSIONS.s3 });


// API params
const getBucketAclParams = {
  Bucket: BUCKET_NAME,
};


const getBucketInfo = async () => {
  const bucketACLData = await s3.getBucketAcl(getBucketAclParams).promise();
  console.log(`Bucket ACL data: ${JSON.stringify(bucketACLData, undefined, ' ')}`);
  // OUTPUT
  // {
  //   "Owner": {
  //    "DisplayName": "i.abhishek.dass",
  //    "ID": "6a42b54b67b4b423ce8d55cc7f368e4bf0add27544c0332aa99bd034ad27c0a8"
  //   },
  //   "Grants": [
  //    {
  //     "Grantee": {
  //      "DisplayName": "i.abhishek.dass",
  //      "ID": "6a42b54b67b4b423ce8d55cc7f368e4bf0add27544c0332aa99bd034ad27c0a8",
  //      "Type": "CanonicalUser"
  //     },
  //     "Permission": "FULL_CONTROL"
  //    }
  //   ]
  //  }

  const bucketLocationSData = await s3.getBucketLocation(getBucketAclParams).promise();
  console.log(`Bucket CORS data: ${JSON.stringify(bucketLocationSData, undefined, ' ')}`);
  // OUTPUT
  // { "LocationConstraint": ""} /* blank means N Virginia */

  const bucketHeadSData = await s3.headBucket(getBucketAclParams).promise();
  console.log(`Bucket HEAD data: ${JSON.stringify(bucketHeadSData, undefined, ' ')}`);
  // OUTPUT
  // {}: body is null, the status is 200 if you have permission, else 403 Forbidden
};

getBucketInfo();
