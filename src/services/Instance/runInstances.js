import { EC2 } from 'aws-sdk';
import {
  API_VERSIONS,
  REGION,
  EC2_INSTANCE_ATTRIBUTES,
  PRIMARY_KEY_PAIR_NAME,
} from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS });
const RESOURCE_SUB_TAG = 'amazon-linux-2-ebs';


// API params
const runInstanceParams = {
  DryRun: false,
  AdditionalInfo: 'additional info: my first automated instance',
  ImageId: EC2_INSTANCE_ATTRIBUTES.ImageId,
  InstanceType: 't2.micro',
  ClientToken: `vm-${RESOURCE_SUB_TAG}-t2micro`,
  CapacityReservationSpecification: {
    CapacityReservationPreference: 'open',
  },
  DisableApiTermination: false, // DON'T CHANGE! API, CLI will unable to terminate the instance
  EbsOptimized: false, // DON'T CHANGE, else extra charges applies for optimization
  // ElasticGpuSpecification.N:  this attaches additional resources is used for Windows for graphics
  // ElasticInferenceAccelerator.N: this attaches additional resource for deep learning
  InstanceInitiatedShutdownBehavior: 'stop', // else "terminate"
  KeyName: PRIMARY_KEY_PAIR_NAME,
  MaxCount: 1, // maximum number of instances
  MinCount: 1, // this number should not increase more the capacity of AZ
  TagSpecifications: [{
    ResourceType: 'instance',
    Tags: [
      { Key: 'Name', Value: `my-instance-${RESOURCE_SUB_TAG}` },
    ],
  }],
  // UserData: <string> // some commands required to be executed on launch
};

const runInstance = async () => {
  const data = await ec2.runInstances(runInstanceParams).promise();

  console.log(data);
};

runInstance();
