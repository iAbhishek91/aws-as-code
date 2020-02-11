// insert or update, if data exists it will update else insert. a caveat called conditional insert
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });

// API params
const putItemParams = {
  Item: {
    NoApp_EID: { N: '1' },
    Emp_name: { S: 'Abhishek' },
    Emp_age: { N: '30' },
  },
  TableName: 'NoAPP_Employee',
  ReturnConsumedCapacity: 'TOTAL', // details about provisioned throughput consumption
};


const putItem = async () => {
  const postInsertData = await dynamoDB.putItem(putItemParams).promise();

  console.log(postInsertData);
};

putItem();
