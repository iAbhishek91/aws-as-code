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
  // this need to be changed if you terminate a resource. already taken
  // `vm-${RESOURCE_SUB_TAG}-t2micro`
  ClientToken: `vm1-${RESOURCE_SUB_TAG}-t2micro`,
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
  /*
  { Groups: [],
  Instances:
   [ { AmiLaunchIndex: 0,
       ImageId: 'ami-062f7200baf2fa504',
       InstanceId: 'i-0b771cda0XXXXXXXX',
       InstanceType: 't2.micro',
       KeyName: 'my-key-pair',
       LaunchTime: 2018-02-08T22:58:56.000Z,
       Monitoring: [Object],
       Placement: [Object],
       PrivateDnsName: 'ip-172-32-34-9.ec2.internal',
       PrivateIpAddress: '172.32.34.9',
       ProductCodes: [],
       PublicDnsName: '',
       State: [Object],
       StateTransitionReason: '',
       SubnetId: 'subnet-99999f0c',
       VpcId: 'vpc-85daf3fb',
       Architecture: 'x86_64',
       BlockDeviceMappings: [],
       ClientToken: 'vm1-amazon-linux-2-ebs-t2micro',
       EbsOptimized: false,
       Hypervisor: 'xen',
       ElasticGpuAssociations: [],
       ElasticInferenceAcceleratorAssociations: [],
       NetworkInterfaces: [Array],
       RootDeviceName: '/dev/xvda',
       RootDeviceType: 'ebs',
       SecurityGroups: [Array],
       SourceDestCheck: true,
       StateReason: [Object],
       Tags: [Array],
       VirtualizationType: 'hvm',
       CpuOptions: [Object],
       CapacityReservationSpecification: [Object],
       Licenses: [],
       MetadataOptions: [Object] } ],
  OwnerId: 'XXX63780XXXX',
  ReservationId: 'r-05b71f6fa070aXXXX' }
  */
};

runInstance();
