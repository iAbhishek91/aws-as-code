import { EC2 } from 'aws-sdk';
import {
  API_VERSIONS,
  REGION, CLIENT_TOKEN,
  EC2_INSTANCE_ATTRIBUTES,
  PRIMARY_KEY_PAIR_NAME,
} from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS });


// API params
const createLaunchTemplateParams = {
  DryRun: false,
  ClientToken: CLIENT_TOKEN.vm1,
  LaunchTemplateName: 'my-template',
  LaunchTemplateData: {
    ImageId: EC2_INSTANCE_ATTRIBUTES,
    InstanceType: 't2.micro',
    KeyName: PRIMARY_KEY_PAIR_NAME,
  },
};
