// insert or update, if data exists it will update else insert. a caveat called conditional insert
import { DynamoDB } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const dynamoDB = new DynamoDB({ region: REGION, apiVersion: API_VERSIONS.dynamoDB });

// raw data
const employeeData = [
  ['1', 'Abhishek', '30'],
  ['2', 'Sutapa', '30'],
  ['3', 'Subhojit', '30'],
  ['4', 'Malpa', '30'],
  ['5', 'Bishu', '30'],
  ['6', 'Sarath', '30'],
  ['7', 'Dinesh', '30'],
];

const employeeSkillsData = [
  ['1', '1', 'NodeJS'], ['1', '2', 'Docker'], ['1', '3', 'AWS'],
  ['2', '1', 'SAP-MM'], ['2', '2', 'SAP-SD'], ['2', '3', 'SAP-WM'],
  ['3', '1', 'C#'], ['3', '2', 'PHP'],
  ['4', '1', 'Selenium'], ['4', '2', 'JMeter'],
  ['5', '1', 'MDM'], ['5', '2', 'Agile'],
  ['6', '1', 'React'], ['6', '2', 'NodeJS'], ['6', '3', 'JS'],
  ['7', '1', 'C'], ['7', '2', 'Java'],
];

// processed API params
const putItemsEmployeeParamsArr = employeeData.map((employee) => ({
  Item: {
    NoApp_EID: { N: employee[0] },
    Emp_name: { S: employee[1] },
    Emp_age: { N: employee[2] },
  },
  TableName: 'NoAPP_Employee',
  ReturnConsumedCapacity: 'TOTAL', // details about provisioned throughput consumption
}));

const putItemsEmployeeSkillsParamsArr = employeeSkillsData.map((employeeSkill) => ({
  Item: {
    NoApp_EID: { N: employeeSkill[0] },
    NoApp_SkillID: { N: employeeSkill[1] },
    Emp_age: { S: employeeSkill[2] },
  },
  TableName: 'NoAPP_Employee_Skills',
  ReturnConsumedCapacity: 'TOTAL', // details about provisioned throughput consumption
}));

const putItem = async () => {
  putItemsEmployeeParamsArr.forEach(async (putItemsEmployeeParams) => {
    const postInsertData = await dynamoDB.putItem(putItemsEmployeeParams).promise();

    console.log(postInsertData);
  });

  putItemsEmployeeSkillsParamsArr.forEach(async (putItemsEmployeeSkillsParams) => {
    const postInsertData = await dynamoDB.putItem(putItemsEmployeeSkillsParams).promise();

    console.log(postInsertData);
  });
};

putItem();
