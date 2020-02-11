# FAQ

Getting ready for AWS certification, this may help you. I have gathered thi questions from multiple sources.

## IAM

- *What are the component of IAM*?

IAM consists of users, group, roles and policies.

- *Where can I apply the policies*?

Policies can be applied to all users, group and roles.

- *What is IAM policies and its structure*?

Policies are JSON object, which explicitly lists permissions to AWS services. It defines the "sid", "effect", "actions", "resources" and "optional conditions" what API can invoke. API are behind everything it can be SDK, CLI, CloudFormation, Terrafrom or Web-UI.

Any actions that are not explicitly mentioned are denied by default. Action can be of two type "Allow" and "Deny". If case of conflict, "Deny" is always give higher priority then "Allow".

sid: can be user, group or roles.
effect: can either be "Allow" or "Deny"
actions: are services API that are allowed. "s3:DeleteObject", "s3:getObject"
conditions: are extra condition check before granting permissions. ip address: aws:sourceIP: "10.14.8.0/24"
resources: on which resources this tasks are performed. "arn:aws:s3::::billing-marketing"

- *What are roles*?

IAM Roles are like IAM user, however its internal to AWS. They don't have password or access key associated. IAM roles are associated with policies. Just like admin, maintainer, developer.

- *What happens to user when a role is assigned to them*?

When roles are granted users, user gives away his or her permissions and takes what defined in the role. When the role is revoked the user gains its old policies.

- *What are the common use cases of using roles*?

*First use case*: custom application hosted in EC2 instance need to have access to S3 bucket. One way of doing this is hard coding AWS credentials in the source code of the applications, also rotating the password is cumbersome as you need to update the code each time. Best way is to create a IAM role with correct polices to access the S3 bucket, and assign the role to the user present in the code. In this way the credentials are kept away from the source code.

*Second use case*: Providing certain permissions to user or group that generally they wouldn't have. In that scenario, users or group can have a role assume (not assign) to the role. Hence the user can have access to access something that generally they cant. Once the job is done the original user policies are restored, which removes the assumed role from the user.

- *What are the default permission granted by IAM user*?

Nothing

- *Why are IAM group required*?

Its easy to manage multiple users by providing permission policies for the group. All the users inherits the policies from the group.

- *What are cost associated with IAM*?

IAM(key managements) is always free service provided by AWS.

- *What are dependencies of region on IAM*?

IAM is a global service and are not bound to any specific region.

- *What is IAM federation*?

IAM can be federated, so that you can integrate you companies identity management applications like (active directory) etc. This will allow you to login to AWS using your companies credentials.

## EC2

### Instance Type

- *What does naming convention of EC2 instance type*?

"t2.micro": "t" is the family, "2" is the generation or version and "micro" is the size.

- *What are different Instance Type family available*?

Instance type defines the underlying hardware, hence its the host that you are selecting on AWS.

 *C* for high CPU performance, compute optimized.
 *R* for more memory RAM than CPU power, memory optimized.
 *M* Medium, balance ratio b/w memory and cpu.
 *I* for high I/O capacity, more SSD capacity.
 *D* for high Disk capacity, more HDD capacity.
 *X* for extensive capacity, very high memory and CPU. Big brother of 'M'.
 *G/P/CG* for GPU, graphical processing unit. Kafka, video processing etc.
 *T* cheap, moderate baseline performance with burst or high performance capability for short time.

- *What are T2/T3 burstable instance*?

They falls under "T" instance family. It means normally CPU with OK performance are supplied, and automatically burst when required (in case of spike load).

When the system burst it utilizes the burst credit, if all the credits are used then the CPU become BAD.

Burst credit are accumulated overtime if system do not burst. Burst credits are different based on "T" instance type.

This are useful when system receives unexpected traffic and system performs well due to burst credit. they are displayed in graph under monitoring section of AWS cloud.

- *What are T2/T3 unlimited instance*?

They are "T" instance type with unlimited burst credit. Be careful with that as AWS charges more for this, however your application performance is guaranteed.

### AMI

- *What are AMI*?

AMI: are amazon machine image.

At time of launching EC2 instance fist step is to select the OS. In AWS, OS comes in bundle with pre-installed software for VMs. These bundles are known as AMI.

AMI are templates that contains software configurations (OS, applications, app servers) required to launch an EC2 instance.

AMI are special type of virtual appliance used by EC2 service. Virtual appliance are used by hypervisor while starting a new VM. Virtual appliance contain a **fixed state**.

AMI don't contain the kernel of the OS. The kernel is loaded from an **Amazon Kernel Image (AKI)**.

- *What are different sources of AMI*?

AMI - Amazon machine image are fixed image based on which our instance are created.

There are mainly **three sources of AMI**
AMI provided by AWS, by AWS user community.
AMI from AWS marketplace.
User own custom AMI.

- *Why we use custom AMI*?

Custom AMI are AMI created with additional configuration on top the base image.

Advantages are:

We could pre-install packages required. Like Apache server.
Faster boot time compared to using "user data".
Security concerns are taken care every time.

- *What are the storage for AMI*?

 AMI lives in S3. However we can't see them in S3 console.

- *What the cost associated with the AMI*?

Since AMI lives in S3, it will charge for the storage space. However its quite in-expensive to store AMI images.

- *What are the region restriction on AMI*?

AMI are always restricted to one region. However we can copy the AMI over other regions.

- *What are the default behavior security restriction on AMI and how we can change it*?

By Default AMI's are private and locked with your own account. We can make the AMI public or Share them with other AWS accounts or sell them on AMi market place.

- *What is the impact on ownership on AMI share and AMi copy*?

AMI share do not changes the ownership of the AMI.

While you copy an AMI from a sharable AMI then you become the owner of the AMI.

- *What are the permission required to copy a normal AMI*?

Owner of the AMI, should give read permission to the storage where the AMI is saved. However you can copy the AMI from the running instance.

- *What are the permission required to copy an encrypted AMI*?

You can copy an encrypted AMI only if underlying snapshot and encryption key is shared with you. Then you need to generate your own key for encryption and become the owner of the AMI.

- *What are the limitation of copying AMI containing billingProduct*?

You cant copy AMi containing billingProduct for example, Windows AMI, or AMi from market place, however you need to the AMI from the running instance.

- *How can you custom create  a AMI*?

The most common scenario is to create a AMI from an running instance, in that case the AMI is created from the snapshot of the running image. All the changes done in the running EC2 instance will be available in the AMI. Like installed software, updates, security patching etc.

### Launch type

- *What are different launch types*?

On-demand, Reserved, convertible reserved, Schedules reserved, Spot, Dedicated and Dedicated hosts.

- *What are use cases for On-demand instance*?

On-demand instance are  one of the expensive launch type. They are what we use.

When we don't hae long term commitment. Mostly for learning and POC purpose. Need to pay for what you use. This meant for short term un-interrupted work load.

- *What are use cases for reserved instances*?

They are reserved upfront before use for long term (1 year, 3 year and so on). They are almost 75% cheaper than on-demand. We need to pay upfront for the resources.

They are mostly used for steady state application that need to run on cloud. example think database.

- *What are two advance types of reserved instance and when they are used*?

Two type of reserved instance types are "Convertible" and "Schedules".

Convertible reserve instance type are instance where you have option of changing the instance type in between. They are expensive compared to normal reserved type but cheaper than on demand (almost 53%).

Schedules reserve instance type that are required for a scheduled activity. Once a day for one hour, or once a week. Mostly they are for pre-planned activity.

- *What are use cases for spot instance*?

They are cheapest of all. Almost 90% compared to on demand.

You bid a price and spin up the resource. Once same resource have higher bid they are reclaimed. AWS gives you 2 mints of time to complete your work on that.

They are mostly used when the jobs are not crucial, HA is not required, batch jobs where job are resilient to failure.

- *What are use cases for dedicated instance*?

Hardware is dedicated to you. You may share the hardware with other AWS user but the hardware (or host will not change).

however after the instance stops, the hardware can be changed.

This is mostly use when user need dedicated physical server.

- *What are use cases for dedicated host instance*?

Hardware is complete,y dedicated to you. Its one of the expensive service. You can have control over the sockets, each core of the hardware. They are allocated for long term like 3 years or 5 years.

They are used when software have complicated licencing model like (BYOL - bring your own license) which are allocated based on hardware.
Or when company have strong governance/ regulatory and compliance requirement.

### IP addresses

- *What are different type of IPs*?

There are three type of IP that can be associated with EC2 instances.

private, public and elastic.

- *What are the characteristics of private IPs*?

Private IP are never changes one a instance is launched. They can be used to communicate with the AWS network within same sub-net.
They falls under the private IP ranges. 10 - for class A, 172 - for class B, or 198 - for class C range.
They are auto assigned to the instance based on the sub-net allocated for the instance.

- *What are the characteristics of public IPs*?

Public IP are assigned to running instance of EC2 instance automatically by AWS, They are not separately charged are included in EC2 instance.
However every time a instance is stopped, the IP is lost. On start again a separate IP is auto assigned.

- *What are the characteristics for elastic IPs*?

Elastic IP are public IPV4 IP.

Elastic IP are ip that are generated by AWS and provided. We can associate a the elastic IP address with one EC2 instance. Elastic IP are not revoked when the instance stops and are fixed.

Elastic comes with extra cost.

- *What are the limitation of elastic IP address*?

One AWS account can have max of 5 elastic IP. However you can separately ask AWS to increase that via AWS support.

- *What are architect point on elastic IP*?

Use of elastic IP falls under poor architecture design. We can use load balancers or DNS for resolving the same thing.

### User data

- *What are user data and its use cases*?

User data are small shell script(for linux) or bash script(for windows) that can be passed on as a startup scripts.

They are mostly used when we need to configure something before we start using it.

- *What are the limitation of user data*?

Every time a instance launches, the user scripts are executed. More user script more time it will take to start the instance.

- *What is the alternative of user data*?

Custom AMi snapshot is better if we need faster start time along with initial configuration. The AMI holds the current state of the system known as snapshot and a AMI is created out of that. This will prevent you from installing the software or OS configuration every time you execute start an AMI. Similar to docker image (just to visualize).

### Placement group

- *What are different placement group and types*?

Placement group defines the strategy of placing the EC2 instance on the cloud. The strategy are based on the requirements.

three placement groups are:
cluster, spread and partition.

- *What is cluster placement group and use cases*?

Cluster placement group places all instance on the same AZ and rack(physical hardware). It gives more bandwidth and low latency.

This are required when we need multiple system to complete a network intensive job. However its comes with cons, if the rack fails, then you loose the entire network.

Examples: big data job, low latency requirement.

- *What is spread placement group and use cases*?

Spread placement group can span over AZ. Instances are on different physical hardwares. It has reduced risk of failure.

Limitation: one placement group can have max of 7 instance per AZ. problem of scaling.

Examples: application that need HA and pre-planned resource planning is done. Scaling is not so much required.

- *What is partition placement group and use cases*?

Partition placement group is similar to spread, but instead of instance we launch partition on the AZ. There can be max of 7 partition on an AZ, however each partition can have 100s of instance attached. This solves the problem of scaling.

Again instance in a partition do not share racks(hardware).

Use cases: Hadoop, Kafka, Cassandra.

### ELB

- *Why we use ELB instead of custom load balancer*?

Generally custom balancers cheaper to implement but requires lot of maintenance activity. However this becomes overhead when applications complexity grows overtime. However, with ELB (which is a managed AWS service) the overhead is taken care by AWS.

AWS takes care of high availability of ELB, upgrade of ELB, other maintenance activity.
Also provides easy knobs to configure the load balancer as per our requirement.

- *What are the different type of load balancers*?

There are three type of load balancers in AWS:

classic load balancer V1 (old generation) 2009
Application load balancers V2 (new generation) 2016
Network load balancers V2 (new generation) 2017

V1 is not recommended by amazon as its pretty old and do now support advance concepts. Its mostly deprecated.

In exam question will be mainly on the V2 version.

- *Naming convention of AWS load balancer*?

Max length 32 character.
Cant start or end with -
Must not begin with internal-

- *Where do ELB sits at network level*?

ELB can be both internal(private) or external(public).

- *What are important configuration difference between Ext LB and int LB*?

Ext LB can use IP address type as : "ipv4" or "dualstack", int LB can use IP address type as only "ipv4".

- *What are health checks, and why its important in load balancers*?

Load balancer distribute the traffic of the application among different instances. However its important for ELB to know which instances are healthy and which are not. If a instance are not healthy ELB do not forward any traffic to that instance.

- *How health checks are implemented*?

Load balancer pings each instances on certain ports and a route (mostly /health) to perform health check. If the instance returns OK(http 200), then the instance is healthy, else unhealthy. Health check feature are available for all the load balancers.

- *Where do application load balancer present from network perspective*?

As the name suggests application ELB sits on application layer of OSI model which is Layer 7. It works with mainly HTTP (which is again a application layer protocol).

- *What are possible scenario Application load balancer V2 serves*?

1 load balancing to multiple http applications across different zones.
2  "     "        "   "        "     "          on same machine. ( containers, there are advance tools for same: Kubernetes).
3 "     "        based on route in the URL.
4 "     "        based on hostname of the URL.
5 They are best suited for micro service based architecture also container based applications.
6 port mapping features to re-direct to a dynamic port.
7 supports SSL protocol.
8 Great fit for ECS (using docker)

- *What is stickiness in load balancer*?

Application load balancer always makes sure same user always redirected to same instance in background. This is nothing to do with the instance or application.

- *What are protocols supported by ELB*?

HTTP, HTTPs and websocket protocol.

- *How does load balancer server knows where to route the traffic to*?

While the request comes from any client to load balancer, load balancer will add some header on the http request so that it remembers the ip address, port and protocol. The header names are "X-Forwarded-For", "X-Forwarded-port" and "X-Forwarded-proto"

- *Which ip address is visible to application directly*?

Its the private IP address of the application load balancer.

- *Where do network load balancer present from network perspective*?

As the name suggests network ELB sits on transport layer of OSI model which is Layer 4. It works with mainly TCP  (which is again a transport layer protocol).

- *What are features of network load balancer V2 serves*?

1 They are high performance, they can handel millions of request per seconds.
2 Forward TCP traffic to your instance.
3 Support both static and elastic IP.
4 Less latency ~100ms (vs 400ms for ALB).

These are used for achieving very very high performance. They are expensive and select if they are really required.

- *What are target groups*?

**TBD**

- *How are load balancer identified*?

All load balancer CLB, ALB and NLB have a static host name. Use that host name for accessing the load balancer. Important to note: Do not resolve the host name and use the underlying IP.

- *How Load balancer scale, what should you do if you expect a very high traffic*?

Load balancer cant scale instantaneously. If you expect a high traffic, then contact ASWS for something called warm-up or (pre-warming).

- *What exactly is pre-warming or warming of load balancer*?

Load balancers scales automatically based on traffic. However sudden increase in traffic (generally more than 50% in 5 minutes), can bring downtime as load balancer scaling takes more than a hour. In this scenario inform AWS support so that they can warm up (getting ready for the actual traffic spike in advance) the load balancing server.

- *State few feature of ELB, API*?

All ELB API are idempotent.

- *How to evaluate load balancing architecture*?

(AWS White paper)[https://aws.amazon.com/articles/best-practices-in-evaluating-elastic-load-balancing/#pre-warming][1]]

- *what are two major component of load balancers*?

controller
load balancer server

## Cloud Watch

- *What are the main features of cloudWatch*?

Monitors AWS resources and also the application running on AWS resources.

CloudWatch can collect and track metrics.

CloudWatch alarm is another feature based on the threshold value of a particular metric.

CloudWatch can also change the state of the AWS resource based on the metric. Like scale up or scale down infrastructure.

- *What are the different state of the cloudWatch service*?

OK | ALARM | INSUFFICIENT_DATA

## DR

- *What are main factor to be considered in DR*?

Disaster recovery. In DR strategy most important is RTO and RPO. Determining RTO and RPO is very important in architecture of DR.

- *What is RTO and RPO*?

RTO is recovery time objective: is a maximum duration (in time) that a company want to wait for recovery process to finish.
RPO is recovery point objective: is a maximum amount of data (for a time span) that a company want to lose and its acceptable.

- *Whats the difference between RTO and RPO*?

RTO determines downtime, however RPO is regarding data measured in time. RPO can state company is ok to loose 1 hour of latest data or 2 hour.
Solution architect should take important decision on this factor. Imagine a situation where business tells you about o hour RTO and 0 hour RPO then we have to take back up and recovery instantly, with fault tolerant system or HA system Both comes with a price.

Mostly the answer will be "as little as possible" from any stakeholder. However solution architect need to clearly state the trade off between data, time and money.

- *What are common factor on which RTO and RPO is decided*?

Consumer of the data. (internal or external or government)
Environment (test, pre-prod, prod)
Geographical presence of the business. (if located in one place then most probably we can take the night time as downtime)
Type of data, type of application.

Everything depends on how much money customer want to spend based on the above factors. Also, there are sometimes regulatory or governance that restrict you from keeping RTO and RPO as minimum as possible.

- *What are the services of AWS on DR*?

CloudRanger is one of the famous for recover and backup for small, medium and enterprise level business.
