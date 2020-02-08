/**
 * *************************************************
 * CAUTION! This function will Stop all the VMS
 * However, EBS will continue to run.
 * *************************************************
 */

import { EC2 } from 'aws-sdk';
import { describeInstances } from './describeInstances';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// ref: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_StopInstances.html
const stopInstances = async () => {
  // Fetch the instance-ids and reduce it to form a array of InstanceIds
  const InstanceIds = (await describeInstances()).Reservations[0].Instances.reduce((acc, curr) => {
    acc.push(curr.InstanceId);
    return acc;
  }, []);

  // API params
  const stopInstancesParam = {
    InstanceIds,
    Hibernate: false, // do not opt for this option, if really not required.
    Force: false, // do not flush file system caches or file system metadata, risky
    DryRun: false,
  };

  const postStopData = await ec2.stopInstances(stopInstancesParam).promise();

  console.log(postStopData);
};

stopInstances();
