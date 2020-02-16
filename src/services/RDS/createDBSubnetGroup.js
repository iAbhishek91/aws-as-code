// subnet group is required to create a db instance in RDS
// When using UI, DB security group is auto created
// subnet group are collection of subnet in your VPC

import { RDS } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const rds = new RDS({ region: REGION, apiVersion: API_VERSIONS.rds });


// API params
const createDBSubnetGroupParams = {
  DBSubnetGroupName: 'my-postgres-subnet-group',
  DBSubnetGroupDescription: 'all the subnet of default VPC',
  SubnetIds: [
    'subnet-7373534d',
    'subnet-b5d77bf8',
    'subnet-50766f0c',
    'subnet-f5d6cb92',
    'subnet-7013085e',
    'subnet-617bac6f',
  ],
};


const createDBSubnetGroup = async () => {
  const newDBSubNetGroupDetails = await rds.createDBSubnetGroup(
    createDBSubnetGroupParams,
  ).promise();

  console.log(newDBSubNetGroupDetails);
};


createDBSubnetGroup();
