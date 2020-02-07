import { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid';
import { REGION, API_VERSIONS } from '../../constants';
import { BUCKET_NAME } from './s3.data';


const s3 = new S3({ region: REGION, apiVersion: API_VERSIONS.s3 });


// API params
const putObjectParam = {
  Body: fs.readFileSync(path.join(process.cwd(), 'resources', 'dataUploadedToS3', 'b-sample.json')),
  Bucket: BUCKET_NAME,
  ACL: 'authenticated-read', // refer S3.md for all the available options
  ServerSideEncryption: 'AES256', // only two possible: "aws:kms"
  Key: uuid.v4(),
  Tagging: 'TestTag1=test1&TestTag2=test2',
  StorageClass: 'STANDARD_IA', // IA: infrequently accessed
};

const putObject = async () => {
  const putObjData = await s3.putObject(putObjectParam).promise();
  console.log(putObjData);
  // OUTPUT
  // {
  // ETag: '"faf1db69c92d133038453f42799f7eed"',
  // ServerSideEncryption: 'AES256'
  // }
};

putObject();
