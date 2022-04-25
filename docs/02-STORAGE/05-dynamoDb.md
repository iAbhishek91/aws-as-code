# DynamoDB

This service was created in 2007 after understanding the limitation of relational database.

DynamoDB is successor of simple DB.

- NoSQL
- managed
- serverless
- key-value and document data
- fast (single digit millisecond response)
- unlimited throughput(configurable)
- unlimited storage
- auto scale up/down
- supports trillions of request/day
- ACID
  - atomicity - all transaction succeed or none (transactions in RDBMS)
  - consistency - all data will be consistent and valid - follows all the data base rules - like constrains, relationship, data type, triggers, partitioning
  - Isolation all transactions are in isolation, other transaction are independent
  - Durability - once transaction is committed it will remain in the system.
- On-demand backup
- encryption at rest
- replication across multiple AZs
- SLA - 99.999%

## DynamoDB - architecture how data is stored

- DynamoDB stores all its data in **partitions**, a *partition is an allocation of storage for a table*.
  - As data grows, dynamoDB automatically adds *partitions*.
  - There is *a **partition key** per index*. Internal story: the data of the partition key is passed onto a hash function to determine which partition the data is stored into. This hash function(consistent hashing) is the magic of dynamoDb.
  - partition key can only be *string, binary or number*
  - **partition key**: primary key(unique and cant be null), with a special attribute - also known as **hash attribute**.
  - **Partition and sort key**:  they have two attribute associated - one is hash attribute/partition attribute and second attribute is sort key. This key are also called as **composite primary key**(basically multiple key combined). Multiple functions like, aggregation(group by, count), sorting, comparison (==, <, >, , >=)
  - The partitions are *backed by SSDs*.
  - Partitions holds max od 10GB of data, with 3000 RCU or 1000 WCU
- **Tables**: are collection of data, DynamoDB table must contain a *name*, *primary key*, and *read write capacity*.
  - table name must be unique, per AWS account per region.
  - table name are case sensitive, (-, _, .) are allowed, 3 to 355 long
  - table contains multiple - **Items**. *rows in a table in RDBMS*.
- **Items** is a unique group of **attributes**. *attributes are fundamental data element in a Item similar to columns in RDBMS*
  - Each items are limited to **400KB** in size. (IMPORTANT)
  - Items are uniquely identified by a partition key.

- Data are *auto replicated on multi AZ within a region*.

Schema agnostic(are type of database where we don't define the) nature of DynamoDB

## DynamoDB - indexes

Indexes are data structures which contains a subset of attributes from a table, along with an alternate key to support query operations. You can retrieve data from the index using a query. Just like a table. Table can have multiple secondary indexes.
you can create two type of secondary indexes:

> What about primary index: primary index is created using the partition keys.

- **local secondary indexes(LSI)**: index that has same partition key as the base table but a different sort key. The primary key of a LSI must be composite (partition and sort key). Must be created during the creation time.
- **global secondary indexes(GSI)**: Index with a partition key and sort key that can be different from the partition key on the base table, the primary key of a GSI can be either simple or composite. Strong consistency is unsupported.

## DynamoDB - datatype

scaler: string, number, boolean, null
list: array, different data types, ["Coffee", "beer", 2011]
document:
    map: dictionary / objects
    set: unique items in the list

NOTE: raw binary data are not supported in dynamo db. they have to base64 encoded formatted. Also separate timestamp or datetime are not allowed.

## DynamoDB - performance model

Performance of DynamoDB is defined by read & write capacity. Has two modes **On-Demand Capacity** or **Provisioned Capacity**. *switch between modes are allowed once per day*.

Read & Write capacity has a limit of 40,000 RCU and 40,000 WCU.

Read operation are of two types: **Eventually consistent read** and **Strongly Consistent Read**. 1 RCU is 1 strongly consistent read per seconds or 2 eventually consistent read, item up to 4 KB in size per seconds. For 4 KB item eventual read request require 2 RCUs.

Write operation are either **normal write** or **transactional write**. 1 WCU to write data of size 1KB in size. Transaction write request require 2 WCUs for items up to 1 KB.

- on demand capacity
  - db scales according to demand
  - pay as you go | unpredicted traffic and workload
- provisioned capacity(default)
  - define the minimum read and write per seconds that are required by the application. then later auto scales(refer the section for autoscaling)
  - cheaper than on demand
  - consistent an predictable performance(configurable)
  - price depends on provisioned capacity(pay for what you use)

### Examples - Provisioned throughput calculation

- A system needs to store 60 patient records of 1.5 KB, each, every minute. What WCU should you allocate on the patient record table
  - approximately ~1 per sec write
  - 1.5KB each item, 1WCU = 1KB per sec. so it **require 2 WCU** for 1.5KB.

- A weather application reads data from a DynamoDB table, Each item in the table is 7KB in size. How many RCUs should be set on the table to allow for 10 reads per seconds.
  - 1 item 7KB, with 10 read per second
  - 1 item eventual consistent read of 7KB, 1 RCU.(2 item read under 4KB)
  - 10 item requires 10 RCU.

## DynamoDB - autoscaling

**Application auto scaling** is a AWS service which is used to auto scale dynamoDB. Similar to KEDA. Application auto scaling service looks at cloudwatch metrics and the trigger auto scale to the database.

- Auto scaling is best suited for predictable, gradually changing traffic patterns.
- May need to still manually change provisioned throughput settings.
- Apply auto scaling uniformly to tables and global secondary indexes(GSI)

## DynamoDB - tabs

- overview
- items: item in the table, view, insert, delete or update
- Metrics: cloudwatch metrics are displayed
- Alarms: Manage cloudwatch alarm
- Capacity: modify table provisioned capacity
- Indexes: manage global secondary indexes, also shows local secondary indexes
- Global tables: multi region, multi master replicas
- Backups: on demand backups
- Triggers: Manage trigger to connect dynamodb streams to Lambda functions
- Access control: set up find grained access with web identity federation.
- Tags:

## DynamoDB - arn format

arn:aws:dynamodb:eu-west-1:12341324132423:table/table-name

## DynamoDB - how its queried

Dynamo db do not have a query language, its basically a API based data store.

## DynamoDB - storage size

Storage size of a table is shown in the overview tab. Bu they are not real time, updated in 6 hour or so.

## DynamoDB reserved capacity

DynamoDB have reserved capacity option, way to save some money, if you commit to read/write capacity.

## DynamoDB - Scans and queries

Scans:

- return all items and attributes for a given table
- filtering do not reduce RCU consumption.(after fetch the data are discarded)
- Eventually consistent read by default, but can be enabled
- single query returns result that fir within 1 MB.
- pagination is required for more than 1 MB
- parallel scan are allowed to improve performance.
- If you are repeatedly using scans to filter on the same no-PK/SK attribute, consider creating a secondary index

Query: (use query over scans - faster and cheaper)

- Find item based on primary keys
- Query limited to PK, PK+SK or secondary index.
- Return all items with that PK value
- Eventually consistent read by default, but can be enabled
- Querying only one partition, is basically scan of one partition and then filter.
- single query returns result that fir within 1 MB.
- pagination is required for more than 1 MB
- **cheaper** than scans, as it takes less RCU uses hash algorithm to find the value.

## Migration from RDBMS to DynamoDB

RDBMS has four tables: Artist, Album, Track and User Data.

Album - id(PK), sku, artist_id(FK), title, format, cover_art
Artist - id(PK)
Track - id(PK), album_id, name, number
User - id(PK), email, password
