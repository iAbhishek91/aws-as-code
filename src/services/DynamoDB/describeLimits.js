// limit of your region and also for the table that you have create
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });

// API params
const describeLimitsParams = {}; // there is absolutely no params


const describeLimits = async () => {
  const limits = await dynamoDB.describeLimits(describeLimitsParams).promise();

  console.log(limits);
  // OUTPUT:
  // max read capacity allowed for my account in this region
  // { AccountMaxReadCapacityUnits: 80000,
  // max write capacity allowed for my account in this region
  //   AccountMaxWriteCapacityUnits: 80000,
  // max read capacity allowed, including read capacity units provisioned for global sec index.
  //   TableMaxReadCapacityUnits: 40000,
  // max read capacity allowed, including read capacity units provisioned for global sec index.
  //   TableMaxWriteCapacityUnits: 40000 }
};

describeLimits();
