import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const createSecurityGroupsParam = {
  Description: 'My security group for ssh',
  GroupName: 'my-sg-group', // cant start with name 'sg-'
  VpcId: 'vpc-81daf3fb', // this is important to note that SG are part of VPC
  DryRun: false,
};


// ref: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateSecurityGroup.html
const createSG = async () => {
  const newSGDesc = await ec2.createSecurityGroup(createSecurityGroupsParam).promise();

  console.log(newSGDesc);
  // OUTPUT:
  // { GroupId: 'sg-0c619cd0f18ed548e' }
};

createSG();
