# Interconnectivity of networks in AWS

> Every service are not part of VPC. Like S3, cloudWatch DynamoDB

## VPC peering

- Allows VPC peering is done for connecting two differnet VPC(within same account or different)
- VPC peering is one to one relation.
- VPC participating in peering should not have overlapping IP addresses.
- One account-owner will initialte a peering request and other will accept the peering.
- Last step is to configure the route table between the VPC for traffic to flow.
- No speed limit.
- Data transfer is only considered for cost.

## Transit Gateway

- Relatively new feature as of 2020
- This is mostly used when we have lots of VPC to connect. It will become very complex. As well it will hit the limit of max VPC peering connecion supported (125).
- Transit gateway supports 5000 attachements.
- Transit gateway is a managed routing service, which is specific to a region.
- Then we can connect multiple VPC(from that same region) to the transit gateway and then it will connect all the VPC with eachother.
- Transit gateway act as a hub for other routes.
- Transit gateway has its own routing table, which forwards the traffic from one VPC to other.
- Speed is 50Gbps per VPC attachment.
- Data transfer and attachements are considered for cost.
- In future tansit gateway can communicate with other transit gateway on different region, hence we can create a network across regiuons.

## AWS VPN

- used to connect VPC to on-premise.
- Define a customer gateway(can be your router etc). Which is located in on-premise
- On VPC side we create virtual private gateway
- Internally each VPC connection has two IPSec tunnels, this is for HA, as there are two differnt VPN termination endpoint, located on different separate VPC.
- Either use dynamic routing protocol(like BGP), or else need to define routes in the routing table to make the connection.
- This is great and easy to setup, but they runs over the internet and have slower conneciton compared to Direct Connect.

## AWS Direct connect

- used for trusted and secure connection between VPC and on-premise.
- We need to first locate the "AWS Direct connect location". They are listed on AWS website.
- VPG(virtual private gateway) is requried to make the connection between the VPC and "direct connection location".
- Also we can connect to public AWS services from AWS cage located inside the "AWS Direct Connect location".
- For connecting multiple VPC from on-premise, we can use AWS Direct Conect Gateway. (up to 10 VPC). Or we can use Transit gateway as well, however its comming up for al the locations.
- VLAN is created from on-premise to direct connection location.
