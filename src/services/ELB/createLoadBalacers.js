// Used to create a application LB or network LB.
import { ELBv2 } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const elbv2 = new ELBv2({ region: REGION, apiVersion: API_VERSIONS.elbV2 });


// API params
const createLoadBalancersParam = {
  Name: 'my-ext-app-lb', // no start or end with - or internal- max length 32
  Type: 'application', // default chosen, else "network"
  Scheme: 'internet-facing', // default chosen, else "internal"
  SecurityGroups: ['sg-0c619cd0f18ed548e'], // id of SG
};


const createLoadBalancer = async () => {
  const newLBDetails = await elbv2.createLoadBalancer(createLoadBalancersParam).promise();

  console.log(newLBDetails);
};

createLoadBalancer();
