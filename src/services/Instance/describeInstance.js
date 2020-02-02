import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';

const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const describeInstanceParams = {
  Filters: [{
    Name: 'instance-type',
    Values: ['t2.micro'],
  }],
  DryRun: false,
};


// ref:https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property
const describeInstances = async () => {
  const instanceDescription = await ec2.describeInstances(describeInstanceParams).promise();

  console.log(instanceDescription);
};

describeInstances();
