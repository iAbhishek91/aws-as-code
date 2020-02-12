// describe TTL for a specified table
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });

// API params
const describeTTLParams = {
  TableName: 'NoAPP_Employee',
}; // there is absolutely no params


const describeTTL = async () => {
  const limits = await dynamoDB.describeTimeToLive(describeTTLParams).promise();

  console.log(limits);
  // OUTPUT:
  /* { TimeToLiveDescription: { TimeToLiveStatus: 'DISABLED' } } */
};

describeTTL();
