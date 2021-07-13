# security groups

- They are firewall for AWS resources.
- They allow/block ip or specific port ingress or egress to the system.
- They can be applied to multiple instance, and hence can be shared.
- They are specific to region or VPC.
- They can be modified while instance are running. They are validated dynamically for each network call. and lives outside ec2 instance.
- Best practice to maintain separate security group for ssh, as its most important.
- Multiple security group are allowed.
- Application is "not accessible" (time out) issue, then mostly its sg issue.
- Application is "connection refused", then its application issue and not sg issue.
- Application is "permission error exception", then grant 0400 to pem file
- Default all inbound traffic are blocked, and outbound traffic are authorize.
- advance feature, sg can be refereed from another sg. This is useful when ec2 instance connect with each other.
- security group cant reference DNS name.
