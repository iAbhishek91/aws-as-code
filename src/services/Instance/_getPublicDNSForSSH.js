import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';

const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const describeInstanceParams = {};


// ref:https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property

// eslint-disable-next-line import/prefer-default-export
const describeInstances = async () => {
  const instancesDetails = await ec2.describeInstances(describeInstanceParams).promise();

  instancesDetails.Reservations[0].Instances.forEach((instance) => {
    const { Tags, PublicDnsName, PublicIpAddress } = instance;

    console.log(`Instance: ${Tags[0].Value} | ${PublicDnsName} | ${PublicIpAddress}`);
  });
};

describeInstances();
