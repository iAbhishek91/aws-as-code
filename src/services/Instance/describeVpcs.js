import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });

// THIS FUNCTION IS NOT WORKING, below code is as per documentation
// API filter: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_Filter.html
// Error : Cannot read property '0' of undefined
// API params
const describeVpcsParam = {
  Filters: [{
    Name: 'state',
    Values: ['available'],
  }],
  // VpcIds: ['vpc-85daf3fb'],
  DryRun: false,
};


// refer: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeVpcs.html
const describeVpcs = async () => {
  const securityGrpsDesc = await ec2.describeVpcs(describeVpcsParam).promise();

  console.log(securityGrpsDesc.SecurityGroups[0]);
};

describeVpcs();
