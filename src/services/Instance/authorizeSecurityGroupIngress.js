import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const authorizeSGIngressParam = {
  GroupId: 'sg-0c376cd26f1b71ae4',
  IpPermissions: [{
    FromPort: 5432,
    IpProtocol: 'tcp',
    ToPort: 5432,
    IpRanges: [{
      CidrIp: '0.0.0.0/0', // allow every ip
    }],
  }],
  // IpProtocol: 'tcp', // both ipPermissions and IpProtocol don't work together
};

// note we can add or delete security group rule any time,
// even when ec2 is running with particular SG
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupIngress.html
const authorizeSGIngress = async () => {
  const postAuthIngressData = await ec2
    .authorizeSecurityGroupIngress(authorizeSGIngressParam)
    .promise();

  console.log(postAuthIngressData);
};

authorizeSGIngress();
