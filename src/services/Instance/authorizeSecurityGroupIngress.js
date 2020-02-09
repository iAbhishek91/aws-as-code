import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS.ec2 });


// API params
const authorizeSGIngressParam = {
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


// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupIngress.html
const authorizeSGIngress = async () => {
  const postAuthIngressData = await ec2
    .authorizeSecurityGroupIngress(authorizeSGIngressParam)
    .promise();

  console.log(postAuthIngressData);
};

authorizeSGIngress();
