import { EC2 } from 'aws-sdk';
import { REGION } from '../../constants';

const ec2 = new EC2({ region: REGION });


const describeKeyPairsParams = {
  DryRun: false,
};


export default async () => ec2.describeKeyPairs(describeKeyPairsParams).promise();
