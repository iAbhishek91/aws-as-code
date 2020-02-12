// Creates a new dynamo table on your account
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });

// API params
const createEmployeeTableParams = {
  TableName: 'NoAPP_Employee', // table name must be unique in a regions. 255 max_len
  AttributeDefinitions: [{
    AttributeName: 'NoApp_EID',
    AttributeType: 'N', // S-string, B - binary, N - number
  }],
  KeySchema: [{
    AttributeName: 'NoApp_EID',
    KeyType: 'HASH', // this is used for partition data, RANGE is used for sort key
    // Incase you have only one key as primary key then choose HASH
    // Incase you have two key, then first one should be primary, followed by the secondary
  }], // the fields must be available in the AttributeDefinitions
  ProvisionedThroughput: {
    ReadCapacityUnits: 3,
    WriteCapacityUnits: 3,
  },
  BillingMode: 'PROVISIONED', // for predictable mode, else PAY_PER_REQUEST for unpredictable mode
  Tags: [
    { Key: 'Name', Value: 'my_noApp_dymanoDB_table_1' },
  ],
};

const createEmployeeSkillsTableParams = {
  TableName: 'NoAPP_Employee_Skills', // table name must be unique in a regions.
  AttributeDefinitions: [{
    AttributeName: 'NoApp_SkillID',
    AttributeType: 'N', // S-string, B - binary, N - number
  }, {
    AttributeName: 'NoApp_EID',
    AttributeType: 'N', // S-string, B - binary, N - number
  }],
  KeySchema: [{
    AttributeName: 'NoApp_EID',
    KeyType: 'HASH', // this is used for partition data, RANGE is used for sort key
  }, {
    AttributeName: 'NoApp_SkillID',
    KeyType: 'RANGE', // this is used for sort data, HASH is used for Partition key
  }], // the fields must be available in the AttributeDefinitions
  ProvisionedThroughput: {
    ReadCapacityUnits: 3,
    WriteCapacityUnits: 3,
  },
  BillingMode: 'PROVISIONED', // for predictable mode, else PAY_PER_REQUEST for unpredictable mode
  Tags: [
    { Key: 'Name', Value: 'my_noApp_dymanoDB_table_1' },
  ],
};


const createTable = () => {
  [createEmployeeTableParams, createEmployeeSkillsTableParams].forEach(async (tableDetails) => {
    const newTableDetails = await dynamoDB.createTable(tableDetails).promise();

    console.log(newTableDetails);
  });
};

createTable();
