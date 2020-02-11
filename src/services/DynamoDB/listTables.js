// Creates a new dynamo table on your account
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });

// API params
const listTablesParams = {};


// eslint-disable-next-line import/prefer-default-export
export const listTables = async () => dynamoDB.listTables(listTablesParams).promise();
