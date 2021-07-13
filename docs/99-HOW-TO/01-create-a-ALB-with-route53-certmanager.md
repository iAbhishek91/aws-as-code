# Create an Application LB with route53, SG, TLS and CertManager

Pre-requisite:

You have an application running on a EC2 instances.

- Step-1 create a SG
  - one for Loadbalancer(to accept traffic)
    - Open the ports that are used by the applicaiton for example 80, 443, 1234 etc
  - one for EC2 instances
    - Add the groupId of the above as source. *this will allow traffic to EC2 only from load balancer.
- Step-2 import certificate in cert manager, or request for new certificate
- Step-3 create an application load balancer
  - name lb-test
  - scheme: internet facing/internal
  - ip IPv4
  - listener: http at port 80 && https at port 443
  - VPC and AZ to select. (atleast two reqruied, even though you have one server)
  - Configure security certificate: choose certificate from ACM OR choose a certificate from IAM
  - Leave the default security policy
  - Select the Security group
  - create new target group from EC2 instance.
    - name: tg-test
    - type: Instance
    - Protocol and port
    - VPC
    - Health Check (they are part of target group)
      - Protocol: HTTP
      - Path: /
    - register target
      - select the instances and click on add to register
  - click on create
