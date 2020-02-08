/**
 * *************************************************
 * CAUTION! This function will terminate all the VMS & EBS
 * *************************************************
 */

import { EC2 } from 'aws-sdk';
import { describeInstances } from './describeInstances';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// ref:https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property
const terminateInstances = async () => {
  // Fetch the instance-ids and reduce it to form a array of InstanceIds
  const InstanceIds = (await describeInstances()).Reservations[0].Instances.reduce((acc, curr) => {
    acc.push(curr.InstanceId);
    return acc;
  }, []);

  // API params
  const terminateInstancesParam = { InstanceIds };

  const postTerminationData = await ec2.terminateInstances(terminateInstancesParam).promise();

  console.log(postTerminationData);
};

terminateInstances();
