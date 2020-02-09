import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const revokeSGIngressParam = {
  GroupId: 'sg-0c619cd0f18ed548e',
  IpPermissions: [{
    FromPort: 22,
    IpProtocol: 'tcp',
    ToPort: 22,
    IpRanges: [{
      CidrIp: '0.0.0.0/0', // allow every ip
    }],
  }],
  // IpProtocol: 'tcp', // both ipPermissions and IpProtocol don't work together
};

// note we can add or delete security group rule any time,
// even when ec2 is running with particular SG
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupIngress.html
const revokeSGIngress = async () => {
  const postRevokeIngressData = await ec2
    .revokeSecurityGroupIngress(revokeSGIngressParam)
    .promise();

  console.log(postRevokeIngressData);
};

revokeSGIngress();
