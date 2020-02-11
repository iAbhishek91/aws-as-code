// Deletes all tables
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';
import { listTables } from './listTables';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });


const deleteAllTables = async () => {
  const { TableNames } = await listTables();

  // describing all the tables
  TableNames.forEach(async (TableName) => {
    // API params
    const deleteTableParams = { TableName }; // this is the only table available

    const postTableDeleteData = await dynamoDB.deleteTable(deleteTableParams).promise();
    console.log(postTableDeleteData);
  });
};

deleteAllTables();
