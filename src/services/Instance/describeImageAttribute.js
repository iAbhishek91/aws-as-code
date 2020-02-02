import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS });


// API params
const describeImageAttributeParams = {
  Attribute: 'description',
  ImageId: 'ami-04b9e92b5572fa0d1',
  DryRun: false,
};

const describeImageAttribute = async () => {
  const imageAttributes = await ec2.describeImageAttribute(describeImageAttributeParams).promise();

  console.log(imageAttributes);
};

describeImageAttribute();
