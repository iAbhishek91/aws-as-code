# Dynamo DB

It's a no-sql data database.

Its a key-pair no-sql database with support of documents.

25gb of DynamoDB is always free. Hence architect should better to use it to reduce cost.

DynamoDB works over Http call, hence server need to have access to internet to access dynamoDB.

There are two option for one to give internet access to instance from private subnet.

- use NAT gateway (cost increases as the request increases, also NAT gateway have restriction of 10GB per VPC)
- VPC endpoint (preferred option).

## Limitations or constrains

- putItems:
  - attribute cant be null.
  - request with empty values will be rejected.
  - string and binary must have length greater than 0.
