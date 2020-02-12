import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDb = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS });


// API Params
const queryParams = {
  TableName: 'NoAPP_Employee_Skills',
  ExpressionAttributeValues: {
    // ':node': { S: 'NodeJS' }, // # is not allowed, use : as common practice
    ':1': { N: '1' },
    ':4': { N: '4' },
  },
  ExpressionAttributeNames: {
    '#eid': 'NoApp_EID', // : is not allowed, use # as common practice
    '#sid': 'NoApp_SkillID',
    '#skill': 'Skill',
  },
  KeyConditionExpression: '#eid = :1 AND #sid BETWEEN :1 AND :4',
  // filter on the not primary keys after the key condition is applied.
  // FilterExpression: '#skill = :node',
  ProjectionExpression: '#skill, #sid', // select what ?
  Limit: 5, // max number of items
  ConsistentRead: false, // true is expensive, but grantees consistent data
};

/*
- Work based on primary keys (partition key OR partition and sort key)
- query result are always sorted
- filter of data can be done using FilterExpression or Limit
- FilterExpression cant hold partition key or sort key
*/
const query = async () => {
  const dataQueried = await dynamoDb.query(queryParams).promise();

  console.log(dataQueried.Items);
};

query();
