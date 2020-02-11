// Describe all tables
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';
import { listTables } from './listTables';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });


const describeTables = async () => {
  const { TableNames } = await listTables();

  // describing all the tables
  TableNames.forEach(async (TableName) => {
    // API params
    const describeTableParams = { TableName }; // this is the only table available

    const tableDesc = await dynamoDB.describeTable(describeTableParams).promise();
    console.log(tableDesc);
  });
};

describeTables();
