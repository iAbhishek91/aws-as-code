# aws-as-code
DevOps - automation of AWS

## IAM

Identity and access management is a service for authorization and authentication for AWS API.

When send request to AWS API, IAM will verifies your identity and checks you are allowed or not. Its basically verifies and validates who access what in AWS.

Four primary IAM concepts:

### IAM user

- IAM user is not a root user. Root user have access to everything by default.
- Its not recommended that root user have access key.
- Root user will always have a password to login to AWS UI.
- Root user cant be associated with any AWS resources.
- IAM user is to  authenticate people accessing AWS account.

### IAM group

- As name suggest, its a goup of IAM user.
- Root user can't be part of a group.

### IAM role

- IAM role used to authenticate AWS resources.
- When using IAM role, access key are automatically injected into ec2 instance. **Question is: why it is required to have ec2 instance having the access key?** - In most of the case EC2 instance requires access to other resources like , do a backup in s3 | shutdown it self once job is done | etc.
- Policies can be attached with roles. And when we attach ec2 instance with a role, all policies attached with role will be evaluated.

### IAM policies

- policies are used to define the permissions for a user, group or role.
- policies are defined in JSON.
- JSON contains array of statements. As shown below
- Allow and Deny are the effect, Deny always overrides Allow.

```js
"Statement": [
  "Sid": 1,
  "Effect": "Allow", // can be Allow or Deny
  "Action": "ec2:*", // ec2:TerminateInstance
  "Resources": "*" // resources are identified by ARN (amazon resource name)
]
```

- There are two types of polices. Managed (AWS managed, User managed) and Inline.
- Inline polices cant be reused, and are assigned to certain IAM role, user or group. and Hence Inline policies can exists without IAM role, user or group.

### IAM tags

- IAM tags are way to attach key-value pair with a IAM user.
- Key can be email address, job title, name etc. These gives more flexible way to manage users.
- AWS allows max of 50 keys for each user.

## ARN

- All aws resources are identified by ARN
- Format of ARN `arn:aws:[service]:[Region]:[Account ID]:[ResourceType]/[Resource]`
- example ARN `arn:aws:ec2:US-east-1:611637807043:instance:i-3dd4f812`

### Account id

Can be found in name >> my accounts its a 12 digit number unique number per account.
