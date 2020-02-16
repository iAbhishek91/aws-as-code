# RDS

Relational database service is a managed relational database.

## Factors user need to choose for creating a database

### Database configurations

- Type of database: `postgres`, `oracle`, `my-sql`, `mariadb`, `aurora`, `sql-server`
- Version: 

### Base Instance configuration

- Instance type: `standard`, `memory optimized classes`, `burstable` - db.t2.micro
- Storage type: `standard SSD`, `allocated storage`
- Allocated storage: number of GB u need. (auto scaling option is allowed)

### Availability

- multi AZ deployment - its for disaster recovery. This creates a standby instance which synchronously take copy from actual database. Application will automatically point standby server on failure of the main instance.

## Network