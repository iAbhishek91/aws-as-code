# aws-as-code

DevOps - automation of AWS.

This is a open source project can be used by anyone to learn about AWS cloud as code, without touching the AWS UI.

We don't use cloudFormation or terraform, which is again a layer of abstraction sits on top of rest APIs. All our functions are idempotent.

AWS Concepts or services documentation are kept in [DOCS](https://github.com/iAbhishek91/aws-as-code/tree/master/docs).

We use aws-sdk and promise syntax to keep our code sleek and maintainable. It's an interesting journey to come join me.

If you like my work please give a **star** in the repository. Contact me: [linkedln](https://www.linkedin.com/in/abhishek-das-b2248665/)

## Pre-requisite

Before you start your journey with API, please go through the below list thoroughly:

- Install node 8+ and configure PATH env variable to work with node.
- Install yarn (optional).
- Configure IAM, create user, user group as documented from the UI.
- Generate Secure access Key, access key for the new user. These details are required by API. By default access key details are not enabled for any users. These details are mandatory for AWS API to work.
- Configure environment variable in section [Environment variable for config](#Environment_variable_for_config)

## Environment variable for config

This should go ~/.bash_profile. Note: this wont work in Windows system.
This configuration is required by node to authenticate itself with the AWS.

```sh
export AWS_ACCESS_KEY_ID=AKIAY42DUI7B5GEXAMPLE
export AWS_SECRET_ACCESS_KEY=qNUdlsOwLYblablablablabxlfOc9EYQhGRo9gRJ
export AWS_DEFAULT_REGION=us-east-2
```

## ARN

- All aws resources are identified by ARN
- Format of ARN `arn:aws:[service]:[Region]:[Account ID]:[ResourceType]/[Resource]`
- example ARN `arn:aws:ec2:US-east-1:611637807043:instance:i-3dd4f812`

### Account id

Can be found in name >> my accounts its a 12 digit number unique number per account.

## AWS service endpoints

To connect programmatically to an AWS service, you use an endpoint. An **endpoint is the URL of the entry point for an AWS web service**. The AWS SDKs and the AWS Command Line Interface (AWS CLI).

Most Amazon Web Services offer a **Regional endpoint**

> Regional end points: protocol://service-code.region-code.amazonaws.com

**Region code** (These region codes are required while using AWS sdk.)

- US East (Ohio) : us-east-2
- US East (N. Virginia) : us-east-1 (we are using)

For more details refer : [AWS docs on endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html)

## Idempotent in AWS

Idempotent is important as each function implicitly retires if they fails, hence one call may multiple resource in AWS. Also human error is always considered. Same function may be invoked multiple times. Hence, implementing idempotent code is important.

By default some API are idempotent and they dont need any separate configuration.

However, for many AWS API support a parameter called **client token**, which implement idempotent.

A client token is a unique, case-sensitive string of up to 64 ASCII characters that you specify when you make a mutating API request.

ref: [AWS DOCS](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/Run_Instance_Idempotency.html)

## Errors code

AWS provides with standard error code. Refer: [AWS standard error code](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/errors-overview.html).
