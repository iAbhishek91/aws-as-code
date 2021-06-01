# AWS VPC

Virtual private cloud is a network in which your entire aws infrastructure lies.

EC2 classic and EC2 VPC are two generation of AWS VPC. EC2 classic is older version of ec2 where entire thing run on a flat network shared with other customer. EC2 VPC what we are discussing where we can configure and customise our network. Security groups etc.

It allows you to create virtual network within aws cloud.  It allows u to manage your network IP, subnet, Security, routing, and internet gateway very easily.

VPC services is not charged separately, so we can play withit.

There are different layer of security you can configure. Secure gateway, network access control list, etc.

## Main components of VPC

- VPC
- SubNet
- Internet gateway
- NAT gateway
- Virtual private gateway
- Peering connection
- VPC endpoint
- Egress only internet gateway
- security groups stateful, stores state of every network communication (source and destination ). Since they are aware of the src and dest, request to internet is automatically allowed.
- Network access control list: NACL are stateless need to configure both ingress and egress network connection.
- View logs: it allows you to do monitoring of AWS VPC. AWS Traffic monitoring are different as it provides much more information than VIew logs. View logs are important to analyse the VPC network connection.

## AWS VPC rules

- AWS will always block 4 ip address, and the last IP address for each subnet created for IP networking purposes.
- 200 subnet is possible to create per VPC
- For every EC2 instance AWS automatically assign a address within the subnet if not explicitly define d while starting the instance.
- You can’t assign multiple IP simultaneously to multiple instances.
- One may create a default gateway to each subnet. Then default gateway will route all the traffic to internet gateway, NAT gateway virtual private gateway.
- Obvious, VPC can’t span over multiple region.
- an VPC can be span over multiple availability zone.
- An subnet can’t span over multiple availability zone.
- To choose availability zone for your EC2 instance associate it with a subnet. The instance will be launched in the same availability zone same as the subnet.
- Rule of thumb, when you create a subnet, there should be at least one public network and another private network. The public subnet exposes the proxy server or webserver and database or backend is in private network.

## Security

Security in side VPC is provided by two concepts "Security Group" and "NACLs"

### Security Groups

- Security groups are all only rules
- Security groups are stateful, ie, if one way rules are defined, other is automatically defined.
- Security group are simple to set and are main part of security.
- Security groups can be added from a security group(as target), hence we need not bother about ip address.

### NACLs

- NACLs are allow and deny rules
- NACLs are stateless, hence we need to define both inbound and outbound properly
- NACLs are meant to be simple, if we have massive complex rules, then we need to look at security rules.

## DNS

- DNS is provided out of box inside the VPC.
- DNS resolution is provided to the VPC. This feature can resolve DNS both internal and external. Uses Amazon's DNS server.
- DNS hostname to all internal VPC instances.
- Refer more on rout53 for more about this.

