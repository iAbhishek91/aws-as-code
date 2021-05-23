# Sotrage services

## File based storage

- hierarchical strucuture, like most OS
- **Amazon EFS**: A scalable, elastic and cloud native network file system
- **Amazon FSx for windows file server**: A fully managed file storeage for windows server.

## Block storage

- data is saved in blocks
- Blocks can be then combined a provided to OS.
- **Amazon EBS**: Eay to use, high performance block storage, used by EC2, Elastic search, many more.

## Object storage

- Everything is stored as object, only thing you neeto access the file is "Object ID".
- Flat memory structure
- **Amazon S3**: store and retrieve any amount of data from anywhere in the world.
- **Amazon S3 Glacier**: for archival

## Backup

- **AWS Backups**: centrally manage and automated backups across AWS services.

## Data Transfer

- **AWS Storage Gateway**: Provide on-premise access to unlimited cloud storage.
- **AWS DataSync**: Easily transfer data to and from AWS up to 10 times faster than normal.
- **AWS Transfer Family**: Transfer files to Amazon S3 using SFTP, FTP and FTPS.
