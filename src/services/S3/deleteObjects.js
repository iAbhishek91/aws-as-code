import { S3 } from 'aws-sdk';
import { API_VERSIONS, REGION } from '../../constants';
import { BUCKET_NAME } from './s3.data';
import { listObjects } from './listObjects';


const s3 = new S3({ apiVersion: API_VERSIONS.s3, region: REGION });


const deleteObjects = async () => {
  const arrOfDeleteObject = (await listObjects()).Contents.reduce((accumulatorObj, currObj) => {
    accumulatorObj.push({ Key: currObj.Key });
    return accumulatorObj;
  }, []);

  console.log(`Keys that will deleted: ${arrOfDeleteObject}`);

  // API params
  const deleteObjectsParams = {
    Bucket: BUCKET_NAME,
    Delete: {
      Objects: arrOfDeleteObject,
      Quiet: false, // false is the default value
    },
  };

  await s3.deleteObjects(deleteObjectsParams).promise();
};


deleteObjects();
