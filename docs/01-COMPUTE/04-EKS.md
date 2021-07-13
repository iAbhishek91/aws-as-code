# EKS

- Its a manged(scalable and HA) kubernetes control plane serrvice by AWS.
- It also checks the health of the control plane components and replace it as requried.
- Integrated with other AWS services
- Certified and exactly same as standard kubernetes. *Its not forked or proprietary version of oss k8s*

## Internal of EKS control plane

- its a HA, single tenant infrastructure.
- It make use of native AWS components.
- control plane is deployed in a VPC(defined by user and NOT AWS)
- The VPC is fronted by a Network load balancer(Layer-4).
- ETCD & API server are in separate auto-scaling groups. *Both the auto-scaling group will scale horizontally*.

## Scheduling options

### Managed Node Group

- EKS manages the worker nodes as well *no need to provision EC2 instances separately, entire lifecycle of the worker nodes are done by EKS*
- This is done by extending EKS APIs to manage dataplane.
- Node group are provisioned using latest optimised Amazon EKS AMIs and are all part of EC2 auto-scaling group.

### Fargate

- By using managed worker nodes, infrastrucure management is relatively minimized but you dont need to do any of these if you want.
- With help of AWS Fargate - it provides on-demand right sized compute capacity.
- You just need to defined the resource specification on the pod, and fargate runs it.
- cost is by the pod level rather than the instance level. *User can view per pod cost while usign Fargate*
- Option is Fargate is flexible, hence you can decide on partially deploying pods on EC2 and Fargate.
  - To deploy we just need to create a **fargate profile**, which contains a pod selectors, when a pod of same labels are created they are schedules on Fargate.
  - NOTE: that all features of EC2 may not availabe on fargate, hence consider reading Fargate docs prior to that.
- EC2 instances privides much more flexibility in pd schduling and managing.

## Networking in EKS

- Each pods are treated as a VM and are provided with an IP address from the ENI *elastic network interface*.
- Pods can communicate direcly with node without using NAT.
- Containers within pod can communicate using localhost *as in all k8s*
- Pod to Pod communication is done using virtual ethernet bridge within same node
- Inter-node communication of Pods in EKS are done as follow:
  - VPC networking is integrated with Kubernets(EKS)) using Container Networking interface(CNI).
  - This CNI kubernetes plugin helps to kubernets pod to have same IP address inside the POD as in the VPC network.
  - CNI also takes advantage of EC2 feature and creates multiple ENI *is very similar n/w interface of any computer*
    - Few ENI with multiple *secondary addresses* from the VPC pool.
    - These IP addresses are handed over to pods within the host.
    - And these ENI creates a n/w interface in the EC2 instances.
    - NOTE few ENI are internal virtual n/w interface which connect pods with main ENI.
    - These above ENI mostly have only one IP address attached to it. This act as a network interface to a specific pod.
  - Hence each pod have real routable IP address, to have communication within the VPC.
  - EKS uses CALICO as CNI.
- AWS networking with k8s services
  - clusterip: this is then forwarded to ingress
  - For load balancer, the loadbalacer treat the service as a backend.

## Secrets

- We can use AWS **system manager Parameter store**.
- Parameter store connects with AWS Secret Manager.
- Secret manager manages and rotates the secrets.
- The connection between EKS and secret manager via parameter store is stateless, hence nothing is stored in parameter store.
- Secret Manager encripts at rest the data using AWS Key mangement service.
- Additionally everything is logged to AWS cloudtrail for debuggin any secret issues.

## Integration with other AWS services

- Amazon SQS: decoupling
- Amazon SNS: Decoupling
- ELB: Load balancing
- Amazon Route 53: DNS
- AWS IAM: authentication andauthorization
- AWS secret Manager: Securing secrets
- Amazon API Gateway: Exposing services
- AWS Codepipeline: CI/CD
- Amazon cloudwatch: Monitoring and logging

## Upgrade

There are two type of upgrade:

- EKS platform version: They are independent of kubernetes but associated with kubernetes. This means if supported you can upgrade EKS platform version irrespective of kubernetes version.
- Cluster updates in EKS: This is specific to kubernetes
- Worker nodes: EKS do not upgrade the worker nodes automatically when cluster API server. they are done manually follow the upgrade docs specific for each version.
