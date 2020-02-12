// scan do not work with primary keys
// they scan the entire table and return the data
// this is insufficient as entire table is scanned, used secondary table.

import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDb = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS });


// API Params
const scanParams = {
  TableName: 'NoAPP_Employee_Skills',
  ExpressionAttributeNames: {
    '#sk': 'Skill',
    '#skid': 'NoApp_SkillID',
  },
  ExpressionAttributeValues: {
    ':1': { N: '1' },
    ':5': { N: '5' },
  },
  FilterExpression: '#skid BETWEEN :1 AND :5', // scan uses to on dynamo db unlike query
  ProjectionExpression: '#sk, #skid',
  ConsistentRead: false,
  Limit: 10,
  ReturnConsumedCapacity: 'TOTAL',
  // parallel scan use Segment
  // ALL_ATTRIBUTES, ALL_PROJECTED_ATTRIBUTES, COUNT, SPECIFIC_ATTRIBUTES
  // Select: 'ALL_ATTRIBUTES', this cant be applied along with ProjectionExpression
};


const scan = async () => {
  const scanDetails = await dynamoDb.scan(scanParams).promise();

  scanDetails.Items.forEach((item) => {
    console.log(`skill:  ${JSON.stringify(item.Skill)} | Skill_id: ${JSON.stringify(item.NoApp_SkillID)}`);
  });
};

scan();
