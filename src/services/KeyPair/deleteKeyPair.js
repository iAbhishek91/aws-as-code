import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API parameters
const deleteKeyPairParams = {
  KeyName: 'my-key-pair',
  DryRun: false, // in case true: DryRunOperation err if you are allowed, else unauthorized
};


const deleteKeyPair = async () => {
  try {
    await ec2.deleteKeyPair(deleteKeyPairParams).promise();

    console.log('Key-pair is deleted');
  } catch (e) {
    console.log('Error while deleting key pair.');
  }
};


deleteKeyPair();
