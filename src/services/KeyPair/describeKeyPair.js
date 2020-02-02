import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';

const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


const describeKeyPairsParams = {
  DryRun: false,
};


export default async () => ec2.describeKeyPairs(describeKeyPairsParams).promise();
