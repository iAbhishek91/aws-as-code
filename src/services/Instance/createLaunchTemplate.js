import { EC2 } from 'aws-sdk';
import {
  API_VERSIONS,
  REGION,
  EC2_INSTANCE_ATTRIBUTES,
  PRIMARY_KEY_PAIR_NAME,
} from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS });
const RESOURCE_SUB_TAG = 'ubuntu-1804-amd64-ebs';


// API params
const createLaunchTemplateParams = {
  DryRun: false,
  ClientToken: `vm1-${RESOURCE_SUB_TAG}-t2micro`,
  LaunchTemplateName: `my-template-${RESOURCE_SUB_TAG}`, // max-len 128
  LaunchTemplateData: {
    ImageId: EC2_INSTANCE_ATTRIBUTES.ImageId,
    InstanceType: 't2.micro',
    KeyName: PRIMARY_KEY_PAIR_NAME,
    InstanceInitiatedShutdownBehavior: 'stop', // defaults to 'stop', else 'terminate'
  },
  TagSpecifications: [{
    ResourceType: 'key-pair',
    Tags: [{ Key: 'Name', Value: `my-key-pair-${RESOURCE_SUB_TAG}` }],
  }, {
    ResourceType: 'instance',
    Tags: [{ Key: 'Name', Value: `my-instance-${RESOURCE_SUB_TAG}` }],
  }, {
    ResourceType: 'launch-template',
    Tags: [{ Key: 'Name', Value: `my-launch-template-${RESOURCE_SUB_TAG}` }],
  }],
  VersionDescription: `1.0.0-${RESOURCE_SUB_TAG}`,
};
