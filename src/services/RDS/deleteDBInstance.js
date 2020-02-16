import { RDS } from 'aws-sdk';
import { API_VERSIONS, REGION } from '../../constants';


const rds = new RDS({ region: REGION, apiVersion: API_VERSIONS.rds });


// API params
const deleteDBInstanceParam = {
  DBInstanceIdentifier: 'my-db-instance',
  SkipFinalSnapshot: false, // default
  DeleteAutomatedBackups: true, // default
};


const deleteDBInstance = async () => {
  const deletedDB = await rds.deleteDBInstance(deleteDBInstanceParam).promise();

  console.log(deletedDB);
};

deleteDBInstance();
