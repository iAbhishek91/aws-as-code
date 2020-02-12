// get item always give one row back, if you want multiple entry then use query
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });

// API params
const getItemEmployeeParam = {
  TableName: 'NoAPP_Employee', // table name from where we na get data
  Key: {
    NoApp_EID: { N: '1' }, // this should be according to the definition
  },
  ConsistentRead: false, // true will bring guaranteed data but will take time and expensive.
  ReturnConsumedCapacity: 'TOTAL',
  // not defined the return all, similar to *
  // 'Emp_name': { Item: { Emp_name: { S: 'Abhishek' } } }
  // 'Emp_name, Emp_age': { Item: { Emp_age: { N: '30' }, Emp_name: { S: 'Abhishek' } } }
  ProjectionExpression: 'Emp_name, Emp_age', // filter column
};

const getItemEmployeeSkillsParam = {
  TableName: 'NoAPP_Employee_Skills', // table name from where we na get data
  Key: { // only partition key is not enough, sort key also required
    NoApp_EID: { N: '1' }, // this should be according to the definition
    NoApp_SkillID: { N: '1' },
  },
  ConsistentRead: false, // true will bring guaranteed data but will take time and expensive.
  ReturnConsumedCapacity: 'TOTAL',
  // not defined the return all, similar to *
  // 'Emp_name': { Item: { Emp_name: { S: 'Abhishek' } } }
  // 'Emp_name, Emp_age': { Item: { Emp_age: { N: '30' }, Emp_name: { S: 'Abhishek' } } }
  ProjectionExpression: 'Emp_age', // filter column
};

const getItem = async () => {
  const empDetails = await dynamoDB.getItem(getItemEmployeeParam).promise();

  console.log(empDetails);
  // OUTPUT:
  /* { Item:
   { NoApp_EID: { N: '1' },
     Emp_age: { N: '30' },
     Emp_name: { S: 'Abhishek' } },
  ConsumedCapacity: { TableName: 'NoAPP_Employee', CapacityUnits: 0.5 } } */

  const skillDetails = await dynamoDB.getItem(getItemEmployeeSkillsParam).promise();

  console.log(skillDetails);
};

getItem();
