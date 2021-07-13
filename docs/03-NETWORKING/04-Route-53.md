# Route-53

- Its a global(not specific to Route 53) AWS managed DNS service. Highly scalable.
- Route 53 is not specific to any region.
- Route 53 act as a DNS routing(configure rules and records), a domain registration and health checking.
- Commpon records are:
  - A: URL to IPv4
  - AAAA: URL to IPv6
  - CNAME: URL to URL
  - Alias URL to AWS resource
- Supports both private(access within VPC) and public hostname.
- Load balancing
- Health check
- Routing policies

## How DNS works

[Client (browsers or CLIs), invokes a website "example.com". It is forwarded to DNS resolver. DNS resolver sends the reuqest to "root DNS name server", "root DNS name server" forwards it to "TLD name server for .com", it then forwards to "amazon route53", "amazon route53" then forwards it to your webserver.](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-dns-service.html)

## Route53 terms

### DNS

DNS is NOT different in AWS or GCP or any other providers. By DNS we refer to worldwide network of DNS(DNS server, DNS name server) that help to resolve domain names.

### DNS query

Query to DNS for a resource.

### DNS resolver

A DNS server, often managed by ISP, that act as a intermediate b/w user reqeust and DNS name servers.

### Name server

- Server within the DNS system which helps to translate to domain names. They are recursive(points to another DNS server) or authoritative name servers(knows all domains for a TLD[top level domain]).

### Hosted zones

- Is a container of records. The specifies how you want to route traffic for a domain and all of the subdomain.
- hosted zone have same/part name as the corresponding domain.

### Record(record set)

Record set are defined within hosted zone. Each record set has a name, type and values.

Values depends on the type. It can be EC2, S3, ELB or direct IP address.

### Aliasing

NOTE: All DNS provider do not support aliasing, AWS does.

Alising is a record type, "which provides a Route-53 secific extension to DNs functionality".

- they are used to route traffic to selected AWS resources (cloudfront or S3, or elb). Instead of accessing S3 via the public URL we can configure Route53 domain name to access the endpoint.
- they lets you route trafic from one record in a hosted zone to another record.
- Alias record also automatically recognizes changes in the resurce. If the IP of the underlying resource changes, Route53 automatically starts to respond to DNS queries using the new IP address.

HOW its different from CNAME? They are similar to CNAME, but different some aspect.

- You can create alias record at the top of a DNS namespace, also known as *zone apex*. *For example, if you register the DNS name example.com, the zone apex is example.com. You can't create a CNAME record for example.com, but you can create an alias record for example.com that routes traffic to www.example.com.*
- Queries to AWS alias to AWS resources are NOT charged, however in case of CNAME, each call to route is charged. First CNAME, the second for result of the CNAME resolution if its on the same region.
- alias is spcific to record type specified in a DNS query, however, for CNAME, record redirects DNS queries for a record name regardless of the record type specified in the DNS query, such as A or AAAA.
- There is also difference between output of dig or nslookup command.

### Sub Domain

A domain name that has one or more labels pre-pended to the registeed domain name. www.example.com is a subdomain for example.com

### Routing policy

Each record in hosted zone have a routing policy. This defines how route53 responds to DNs queries.

- simple: route traffic to single resource
- failover: Configure active passive.
- geolocation:  route traffic to ressource based on location of your users.
- geoproximity: route traffic to resource based on location of your resource.
- latency:      route traffic to resource based on latency
- multivalue answer: Responds to DNS queries ith multiple healthy records selected at random.
- weighted:     route traffic to multiple resource based on defined propotion.

### TTL

time to live is a time, in seconds, what DNS resolver to cache the values for a record before submitting another request to route 53. If route 53 recives another request for the same domain before TTL expires, the resolver returns the cached value.

Note: Longer TTL reduces your routes 53 charges.

## Health check

- Route 53 health check mechanism monitors the health of resources such a web servers and email servers.
- CW alarm can configured.
- Health check are NOT auto configured. However they can be configured for any record set.

## Route53 and networking

- Route53 resolve automatically answers DNS queries for local VCP domain names(for example EC2 instance) and records in private hosted zones.
- For other domain names Resover performs recursive lookup against public name servers.
- Resolver: integrate DNS resolution between route53 resolver and DNS resolver on **your network** by confguring forwarding rules. your netowrk means
  - the VPC itself
  - Another peered VPC
  - or an on-premise netork that is connected.
- inbound and outbound endpoints in the connected VPC.

## Pricing

Pay for each hosted zones, and number of DNs queries that route53 answers.
