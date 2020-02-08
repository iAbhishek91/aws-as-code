import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';

const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const describeInstanceParams = {};


// ref:https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property

// eslint-disable-next-line import/prefer-default-export
export const describeInstances = async () => (
  ec2.describeInstances(describeInstanceParams).promise()
);
