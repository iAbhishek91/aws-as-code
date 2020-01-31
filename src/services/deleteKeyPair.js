import awsConfig from '../aws.config';
import { PRIMARY_KEY_PAIR_NAME, REGION } from '../constants';


const AWS = awsConfig();


const ec2 = new AWS.EC2({ region: REGION });
const deleteKeyPairParams = {
  KeyName: PRIMARY_KEY_PAIR_NAME,
  DryRun: false, // in case true: DryRunOperation err if you are allowed, else unauthorized
};


const deleteKeyPair = async () => {
  // we don't delete the primary key, which is used for accessing AWS resources- 'my-key-pair'
  if (deleteKeyPairParams.KeyName !== PRIMARY_KEY_PAIR_NAME) {
    ec2.deleteKeyPair(deleteKeyPairParams, (_, data) => {
      if (data === null) console.log('Error while deleting key pair.');
      else console.log('Key-pair is deleted');
    });
  } else console.log(`Primary Key: "${PRIMARY_KEY_PAIR_NAME}" can't be deleted!`);
};


deleteKeyPair();
