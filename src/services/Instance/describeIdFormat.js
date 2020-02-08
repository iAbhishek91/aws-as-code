import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS });


// API params
const describeIdFormatParams = {
  Resource: 'instance',
  // refer https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeIdFormat.html
};

const describeIdFormat = async () => {
  const idFormats = await ec2.describeIdFormat(describeIdFormatParams).promise();

  console.log(idFormats);
};

describeIdFormat();
