import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const describeVpcsParam = {
  Description: 'My security group for ssh',
  GroupName: 'my-sg-group', // cant start with name 'sg-'
  VpcId: 'vpc-85daf3fb',
  DryRun: false,
};


// refer: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeVpcs.html
const describeVpcs = async () => {
  const securityGrpsDesc = await ec2.describeSecurityGroups(describeVpcsParam).promise();

  console.log(securityGrpsDesc.SecurityGroups[0]);
};

describeVpcs();
