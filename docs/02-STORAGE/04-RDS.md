# RDS

## features

- 20 GiB to 16TiB for SQL server and 64TiB for others(postgres, mariadb, oracle mysql)
- read replicas
- standalone replicas

## Benefits

### High availability

- RDS is HA which is multi AZ
- up time of **99.95%**
- Single standalone synchronous replica in another zone(optional but recommended)
- Read replica instance type are independent of master DB instance *for example, master can be provisioned IOPS SSD where as read replica can be of type GP2 - to reduce cost. Note that performance of read replica in this scenario will differ from master*
- RDS provides with DNS which points to master DB, in case of failure DNS points to standby synchronous db for failover.

### High Performance

Performance is based on storage type

- **gp2** (general purpose SSD) | single digit millisecond latencies | base performance 3 IOPS/GiB, min of 100 IOPS and max of 3,000 IOPS | burst IOPS for extended period
- **provisioned iops SSD** (also known as io1) | for production based IO intensive workload | high consistent IOPS(1000 to 30000) and low latency | high cost *provisioned resources are charged even it its not used*
- **magnetic** (standard) mainly for backward compatibility | no autoscaling | max size of 3 Tib | max of 1000 IOPS | no support for elastic volumes

**GP2**:

- Instance IO credit determine IOPS burst performance *larger volume have higher base performance and accumulates IO credit faster*
- IO credit balance is accumulated when required baseline IOPS is not used.
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html#CHAP_Storage.IO.Credits
- initial IO credit balance is 5.4 million IO credit *enough to have 3000 IOPS for 30 mints, mainly to overcome multiple bootstrap scenario*
- maximum burst IO balance can go upto initial IO credit balance of 5.4 million.
- maximum burst IOPS can go up to 3000 IOPS. *For storage more than 1000GIB has base IOPS of 3000 and no effect on burst performance*
- duration of burst IOPS = (IO credit balance) / (burst IOPS) - (3 * storage size in GIB)

**Provisioned IOPS**:

- use select IOPS rate and the storage size *For example PostgreSQL 1000 - 80000 IOPS | 100GiB - 64 TiB*
- IOPS may be lower than that is allowed by RDS and that depends on instance type *for example for postgreSQL db.m5.8xlarge, db.m5.16xlarge and db.r5.16xlarge instance classes is 40,000*

## Monitoring Storage performance

- CPU utilization: percentage of CPU utilization of VM on which the VM is hosted.
- Freeable memory: amount of RAM currently available for the nodes.
- Free storage space: currently available storage space
- read/write/total IOPS - reports read and write IOPS separately, IOPS is sum of both. ranges from 0 to 10,000 per sec
- read/write Latency - time b/w submission of request and its completion. reported as average latency for a given time interval. reports read write latency separately and its in milliseconds.
- Throughput - number of byts each seconds that are transferred to or from disk. measured in MBPS. ranges from 0 to IO channel's maximum bandwidth.
- Queue depth - number of IO request waiting. typical values for the queue depth range from zero to several hundred.

*In cloudwatch navigate to metrics > RDS > per-database-metrics*.

For database internal metrics(query throughput, query performance, connections, resource utilization) we need to use third-party like datadog etc.

### What affects storage performance

- **system activities**: multiAZ standby creation | read replica creation | changing storage types
- **database workload**: db or application desing results in concurrency issues, locking or other form of database contention.
- **db instance class**: use current generation instance type with enough bandwidth(instance with 10GB n/w connectivity) to support your storage types.

## Rules to update Storage size

- should be more than 10%, else it will error out
- once the storage is allocated it cant be scaled down
- DB goes into storage optimization status on scaling storage size, and it takes 5-6 hours to complete that(during that time DB wont accept any updates)

## DB State/Status

- CREATING: when database is getting created for the first time
- AVAILABLE: in running state
- MOdiFYING: when we modify few parameters like instance type. **IMP: change in storage Type, causes immediate outage**
- STORAGE OPTIMIZATION: when storage is modified (takes 5-6 hours an blocks everything)

[AWS RDS DB instance status](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/accessing-monitoring.html)

## Backup and Restore

- **Automated Backup**:
  - taken during the "backup window" *daily- configure time and duration*.
    - Duration is just an estimate, if if backup takes more than that time it would continue until it finishes.
    - Backup window can't overlap with weekly maintenance window.
    - Storage IO are suspended for few seconds while the backup initiates.
    - Elevated latency for few mints for multi-AZ deployments while the backup initiates.
  - automated backup may be "skipped", if there is too much load on the db during the backup window.
  - "backup retention period"
    - default to 7 day if created from console otherwise 1 day
    - automated backups are deleted after that. *Stopped time of the DB is not calculated, hence if DB is stopped snapshot can live for much longer.*
    - can be modify after DB is created.
    - can be anything between 0-35 days. *0 disabled automated backup* *IMPORTANT: changing the value from 0 to non-zero or vice-versa will create outage*
  - entire storage volume is snapshot *entire DB instance, NOT a particular database*
  - database should be in AVAILABLE state, else automated backup wont happen.
  - DB snapshot copy is running for the same instance same region.
  - First snapshot is taken in full, else its incremental.
  - can't share a automated snapshot/ but can create a copy.
  - backups are stored in S3.
  - when DB is deleted all automated backup are delete, if "Retain automated backups" is NOT selected.
- **Manual Snapshot**:
  - they are manually created.
  - can be copies and shared.
  - Max of 100 manual snapshot per region.(no limit for automated backup)
  - they are not deleted along with DB.

*[AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide) is a separate AWS service where we can configure & manage backups centrally. They are considered as manual backup, but are in in manual quota(of 100 per region). names are in specific format awsbackup:backup-job-number*.

## Information to create a new instance

**metadata**:

- DB engine
- License
- DB version
- Instance type
- Multi AZ (yes / no)
- Storage type
- Allocated storage

**Networking**:

- VPC (subnet under AWS network)
- Subnetwork (subnet under VPC) | subnet group *for multi-AZ deployment we need to define DB subnet group*
- publicly accessible (yes / no): will be assigned a public IP address
- AZ (not required in case of subnet group is used)
- VPC security group

**DB Subnet Group**:

DB subnet group is collection of subnet (typically private) where your database is launched. They are created before creating a new db instance.

**DB parameter group**:

- they are group of db configuration/parameter that are used to create a database

**Backup**:

- auto backup: 7 days
- backup window: no preference

**Monitoring**:

- enable enhance monitoring

**Maintenance**:

- Auto minor version upgrade (yes/no)
- Maintenance window

## what is IOPS

Input output operations per second. Its a measurement of performance of hard drive like SSD and HDD and storage area network.
