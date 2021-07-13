# EC2 LB

- Load balancer act as single point access to DNS to your applicaiton.
- Seamlessly handle failure of downstream instances
- Perform health check to your instances.
- Provide SSL termination HTTPS for your websites
- Enforce stickiness with cookies.
- HA across zones.
- Public traffic and private traffic are separated.(can be privateLB or public LB)

## Type of load balancer in AWS

- Classic load balancer(deprecated, not recommended)
  - Layer 7
  - one LB per application
  - Deprecated
  - Expensive
- Application load balancer(V2 - new generation)
  - Layer 7
  - supports http/https and websockets
  - multiple http across different machine
  - multiple http application on the same machine(e.g:contianers)
  - load balancing based on route in URL
  - load balancing based on hostname
  - Dynamic port mapping feature.
  - downstream applicaiton do not see the IP address of the clint, acting as rev-proxy. the IP is inserted in the header X-Forwarded-For
- Network load balancer(V2 - new generation)
  - Layer 4
  - supports TCP and UDP
  - static IP and elastic IP
  - supports extreme load

All the load balancer have a static host name resolved by route 53. LB scales but not instantly(they need warm-up time)

## Target Group

Load balancer routes request to the targets group using the target group settings that you specify, and performs health checks on the targets using the health check settings that you specify.

Once it is created, we then specify the target by clicking on "Add to register"

> NOTE: Load balancer listener should match with the target group. For example if there is two listener 80 and 443, then there should be target group accpting connections to those port. As well we need to match the SG

## Create a LB

Ref: HOW-TO/0x-create-a-ALB-route53-certmananger.md
