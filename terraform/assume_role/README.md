# Assume role in same account using terraform

**Below are steps**:

- Step-1: Create an IAM user - "abhishek"
- Step-2: Create a group - "viewer"
- Step-3: Add "abhishek" to the group "viewer"
- Step-4: Create a policy to view EC2, list IAM, assumeRole STS.
- Step-5: Attach the policy to the group - "viewer"
- Step-6: Create a role - "assume_s3_viewer", to trust the above user - "abhishek"
- Step-7: Then attach AWS managed policy to the role - AmazonS3ReadOnlyAccess

> All the above steps are automatically done via terraform. Use the below command to create

```sh
tf init
tf apply
```

**Validation**:

- Step-1: create an access key for the user - "abhishek"
- Step-2: configure AWS CLI for the user using the command: `aws configure --profile=temp`
- Step-3: validate the admin user using the command `aws sts get-caller-identity`
- Step-4: validate the abhishek user using the command `aws sts get-caller-identity --profile=temp`
- Step-5: validate that you are able to list s3 buckets using admin but not with abhishek user use the below command `aws s3 ls` and `aws s3 ls --profile=temp`
- Step-6: validate that you are able to assume role using the below command: `aws sts assume-role -role-arn=<arn-of-assume_s3_viewer> --role-session-name test`
- Step-7: the previous command will provide you with "AccessKeyId", "SecretAccessKey", "SessionToken", configure environment variable AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN.
- Step-8: Setting this env variable will allow you access the IAM role - assume_s3_viewer, instead of IAM user. Validate that you are able to list all the s3 buckets `aws s3 ls`
- Step-9: Validate the user you are in by using the command `aws sts get-caller-identity` - it should be the role
- Step-10: Validate that you are NOT able to access the S3 using the IAM user "abhishek" : `aws s3 ls --profile=temp`