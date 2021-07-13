# IAM

Identity and access management do not falls under any region (data centers). Its a global free service.

IAM is a service for authorization and authentication for AWS API.

When send request to AWS API, IAM will verifies your identity and checks you are allowed or not. Its basically verifies and validates who access what in AWS.

Also note resources in IAM is limited, Refer IAM quotas. For example:

- default roles/account 1000, max to 5000
- default group/account 300, max to 500
- managed policies attached to IAM role/user 10, max 20
- Users in an AWS account 5000 (more than that try using temporary security credentials - STS assume role)

>NOTE: IAM is not the only security service, other services have security implemented outside IAM. For example: EC2 have ssh key pair, RDS have username and password to access, WorkSpace sign in to a desktop with username and password.

## Key terms

- **Resources**: Each services consist of one or multiple resources. In IAM resources are user, group, role, policies and identity provider object. These can be added, updated, deleted from IAM.
- **Resource Object**: Visualize it as a instance of resource, like Users are resource and each user are resource object.
- **Identities**: these are IAM resource objects which are used for identity or grouping. Policies can be assigned to these resources. They are *user*, *group* and *roles*
- **Entities**: these are IAM resource object that AWS uses for authentication. They are *IAM user*, *federated user* and *assume IAM roles*. NOTE: root user are not entities as they have * access for everything, group are not entities as they can login.
- **Principals**: They are external and are NOT AWS IAM resource object. Person or application that uses AWS root account or IAM entities to sign in and make request to AWS.

## Process of communication between AWS and Principal

- Principal can communicate with AWS using *console*, *CLI*, and *API*(native using SDK or terraform like tools).
- In any form(cli, api or console), under the hood the entry point is same. When principle tries to connect with AWS the following are required:
  - Actions or Operations: action like create, list, delete etc that principle wants to perform.
  - Resources: AWS resource object on which the request is performed
  - Principal: its the entity or root user, and the associated policies are sent.
  - Environment data: ip address, user agent etc
  - Resource data: These are attribute that are requested for the above resource(s).
- Once the request is made AWS first authenticate the principle(root or entity). The authentication details varies based on the type they are accessing.
- Authorization: they are done via policies that are associated with the entities. If single policies results in deny then the entire request is denied. Evaluation rules as below:
  - By default every request is denied (explicit deny).
  - Explicit policies allow policies overrides it.
  - There are different type of policies, organization SCP, IAM permission, or session policy override the policy. If any of the extra policy override the previous approve, the request is denied again.

## User

- **Root user**(first time user): complete, unrestricted access to all resources.
- **IAM users**: They are separate users within a account that corresponds to a principal(person or application). Each user have there own username and password or access keys for API.
- **Federated user**: In a organization which already have a way to authenticate, like SSO using AD, or open ID connect, etc, then IAM user need NOT be created for them. Instead we can federate those user identities into AWS. These system can be trusted and when they access AWS resource, they get a temporary security credentials which are used to access AWS resources.

## Access management

Is done by defining resources defining polices and assign it to identities or AWS resource *don't confuse, as there are different type of policies, which can assigned. explained below*

## IAM user

- IAM user are a identity resource in IAM.
- IAM user has associated credentials and permissions.
- In AWS there is nothing called service accounts, IAM user can be provided to a user or to an application.
- IAM user is NOT a root user. Root user have access to everything by default. Its NOT recommended that root user have access key. Root user will always have a password to login to AWS UI. Root user cant be associated with any AWS resources.
- IAM user is to  authenticate people accessing AWS account.
- IAM user should be provided permission using identity-based policies(directly or indirectly using groups and roles) else by default everything is denied.
- IAM user can be associated with only one AWS account.

## IAM group

- Group are also resource of type identity in IAM.
- As name suggest, its a group of IAM user.
- Root user can't be part of a group.
- We can assign IAM user to group and attach policies to group.
- however the **golden rule** still applies, if user has not been granted an explicit permission for an action and a resource, the user does not have those permissions.

## IAM role

- IAM role used to authenticate AWS resources. They are also identity resource in AWS.
- Roles are mostly used for providing access to external users like - AWS users from other account, federated users, applications.
- When using IAM role, access key are automatically injected into ec2 instance. **Question is: why it is required to have ec2 instance having the access key?** - In most of the case EC2 instance requires access to other resources like , do a backup in s3 | shutdown it self once job is done | etc.
- Policies can be attached with roles. And when we attach ec2 instance with a role, all policies attached with role will be evaluated.

## IAM policies

- policies are resources under IAM service, which can be assigned to identity or resources.
- policy object(defined & stored as JSON) when associated with identities or resource, defines their permission.
- these policies are validated only when principle uses entity to access AWS resources.
- JSON contains array of statements. As shown below
- Allow and Deny are the effect, Deny always overrides Allow.

```js
"Statement": [
  {
    "Sid": 1,  // identifier for the statement
    "Effect": "Allow", // can be Allow or Deny, statement can be allowed or denied
    "Action": "ec2:*", // ec2:TerminateInstance, list of action this policy allows or denies
    "Resources": "*" // resources are identified by ARN (amazon resource name), list of resources to which the action applied to
  }
]
```

- There are different types of policies:
  - **identity-based policies**: policies that are attached to an identity(user, group, role). It defines *what actions*. *which resource* and under *what condition* an identity can have.
    - There are two types of polices. Managed (AWS managed, User managed) and Inline.
    - Inline polices cant be reused, and are assigned to certain IAM role, user or group. and Hence Inline policies can exists without IAM role, user or group, mostly NOT recommended.
  - **Resource-based policies**: are policies that are attached to AWS resources(s3 bucket, IAM role trust policy). It defines *what action* an principle can perform on that resource, and *what condition*.
    - Resource based polices are always inline NO managed policy.
    - One way to provide cross account access, we can specify an entire account or IAM entities in another account as a the principle in a resource-based policy.
    - Important to note: IAM service(resources) supports ONLY ONE TYPE of resource-based policy called - role trust policy, which are attached to IAM roles. Because IAM role are identity as well as resource that supports role-based policy, you must attach both a trust policy and an identity-based policy to an IAM role. Trust policy define which principle entity(user, group or role or federated user) can assume the role.

## IAM tags

- IAM tags are way to attach key-value pair with a IAM user.
- Key can be email address, job title, name etc. These gives more flexible way to manage users.
- AWS allows max of 50 keys for each user.

## ABAC - attribute-based-access-control

is an authorization strategy that define permissions based on attributes, In AWS, these attributes are called **tags**.

These ABAC polices can be designed to allow operations when the principle's tag matches the resources tag.

ABAC comes handy where environment is growing rapidly and managing policies becomes cumbersome.

### Comparison of ABAC with traditional RBAC

RBAC: we define policies for role like admin, developer and so on.. then each polices are attached to identities. Now the problem is if admin requires a new access, the policy must be updated.

In ABAC it is taken care automatically, new resources are created with existing tag, IAM identities will get access automatically.

below are list of advantages of ABAC over RBAC:

- ABAC automatically scales with innovation
- ABAC requires fewer policies
- Team can change and grow quickly: because access is granted automatically.
- Granular permission are possible: give access to all resource, however only resource with matching tags can be accessed