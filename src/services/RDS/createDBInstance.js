// creates a new database
import { RDS } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const rds = new RDS({ region: REGION, apiVersion: API_VERSIONS.rds });


// API params
const createDBInstanceParams = {
  DBName: 'my_RDS_postgreSQL',
  DBInstanceIdentifier: 'my-db-instance',
  DBInstanceClass: 'db.t2.micro',
  StorageType: 'gp2', // general purpose
  AllocatedStorage: 20,
  // MaxAllocatedStorage: 20, // if undefined, auto scaling is not allowed
  Engine: 'postgres',
  EngineVersion: '11.6', // check the valid versions - DescribeDBEngineVersions
  MasterUsername: 'admin123',
  MasterUserPassword: 'admin123',
  DBParameterGroupName: 'default.postgres11', // taken from UI create DB screen
  // OptionGroupName: '', // not supported by postgres
  Port: 5432,
  // Iops: 10, // invalid with storage type gp2, IO operations / second, (0.5 - 50) * storage
  MultiAZ: false, // for disaster recovery
  BackupRetentionPeriod: 7, // if 0 auto backup is disabled
  PreferredBackupWindow: '02:00-03:00',
  AutoMinorVersionUpgrade: true, // by default true, auto minor version upgrade
  // MonitoringInterval: 60, // in sec, 0 will disable enhance monitoring
  // eslint-disable-next-line max-len
  // MonitoringRoleArn: 'arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole', // role which can do
  // EnablePerformanceInsights: true, // performance insight stats are shared with cloud watch
  // DBSecurityGroups: ['sg-0c376cd26f1b71ae4'], // for VPC DB instances
  VpcSecurityGroupIds: ['sg-0c376cd26f1b71ae4'], // cant be given with DBSecurityGroups
  DBSubnetGroupName: 'my-postgres-subnet-group', // required, find from vpc dashboard
  PubliclyAccessible: true, // not recommended, in production env.
  StorageEncrypted: false, // default it do not encrypt data
  DeletionProtection: false, // if true, db cant be deleted before removing this protection
};


const createDBInstane = async () => {
  const newDB = await rds.createDBInstance(createDBInstanceParams).promise();

  console.log(newDB);

  // OUTPUT
  // { ResponseMetadata: { RequestId: 'e0626edc-07b2-47ad-9e98-2967f7849466' },
  // DBInstance: 
  //  { DBInstanceIdentifier: 'my-db-instance',
  //    DBInstanceClass: 'db.t2.micro',
  //    Engine: 'postgres',
  //    DBInstanceStatus: 'creating',
  //    MasterUsername: 'admin123',
  //    DBName: 'my_RDS_postgreSQL',
  //    AllocatedStorage: 20,
  //    PreferredBackupWindow: '02:00-03:00',
  //    BackupRetentionPeriod: 7,
  //    DBSecurityGroups: [],
  //    VpcSecurityGroups: [ [Object] ],
  //    DBParameterGroups: [ [Object] ],
  //    DBSubnetGroup: 
  //     { DBSubnetGroupName: 'my-postgres-subnet-group',
  //       DBSubnetGroupDescription: 'all the subnet of default VPC',
  //       VpcId: 'vpc-81daf3fb',
  //       SubnetGroupStatus: 'Complete',
  //       Subnets: [Array] },
  //    PreferredMaintenanceWindow: 'fri:06:29-fri:06:59',
  //    PendingModifiedValues: { MasterUserPassword: '****', ProcessorFeatures: [] },
  //    MultiAZ: false,
  //    EngineVersion: '11.6',
  //    AutoMinorVersionUpgrade: true,
  //    ReadReplicaDBInstanceIdentifiers: [],
  //    ReadReplicaDBClusterIdentifiers: [],
  //    LicenseModel: 'postgresql-license',
  //    OptionGroupMemberships: [ [Object] ],
  //    PubliclyAccessible: true,
  //    StatusInfos: [],
  //    StorageType: 'gp2',
  //    DbInstancePort: 0,
  //    StorageEncrypted: false,
  //    DbiResourceId: 'db-5EH3PIUDB5T22N54P5AL375FQU',
  //    CACertificateIdentifier: 'rds-ca-2019',
  //    DomainMemberships: [],
  //    CopyTagsToSnapshot: false,
  //    MonitoringInterval: 0,
  //    DBInstanceArn: 'arn:aws:rds:us-east-1:611637807043:db:my-db-instance',
  //    IAMDatabaseAuthenticationEnabled: false,
  //    PerformanceInsightsEnabled: false,
  //    EnabledCloudwatchLogsExports: [],
  //    ProcessorFeatures: [],
  //    DeletionProtection: false,
  //    AssociatedRoles: [] } }
};

createDBInstane();
