import { S3 } from 'aws-sdk';
import { API_VERSIONS, REGION } from '../../constants';
import { BUCKET_NAME } from './s3.data';


const s3 = new S3({ apiVersion: API_VERSIONS.s3, region: REGION });


// API params
const listObjectsParams = {
  Bucket: BUCKET_NAME,
  MaxKeys: 10, // max 1000
};


// eslint-disable-next-line import/prefer-default-export
export const listObjects = async () => s3.listObjects(listObjectsParams).promise();
// output:
/*
{
  IsTruncated: false,
  Marker: '',
  Contents: [
    {
      Key: '435d020b-ec7e-48f5-a50a-203f52cb27d1',
      LastModified: 2020-02-07T08:02:53.000Z,
      ETag: '"faf1db69c92d133038453f42799f7eed"',
      Size: 50,
      StorageClass: 'STANDARD_IA',
      Owner: [Object]
    }
  ],
  Name: 'london-abhishek-6220-bucket.s3.us-east-1.amazonaws.com',
  Prefix: '',
  MaxKeys: 10,
  CommonPrefixes: []
}
*/

