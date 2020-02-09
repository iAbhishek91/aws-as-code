import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const describeSecurityGroupsParam = {};


// ref: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeSecurityGroups.html
const describeSecurityGroups = async () => {
  const securityGrpsDesc = await ec2.describeSecurityGroups(describeSecurityGroupsParam).promise();

  console.log(securityGrpsDesc.SecurityGroups[0]);
};

describeSecurityGroups();
