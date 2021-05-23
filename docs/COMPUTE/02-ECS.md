# ECS

One of the important services of AWS, *Elastic container service*.

This service is used to run container on AWS.

**Cost** involved with ECS is zero, there is not charges for using ECS. Cost is involved for using EC2 or Fargate.

## Where containers are run

Containers are run on ECS cluster.
Containers can also run on AWS Fargate.

## Container service that are supported by ECS

Docker

## ECS Cluster

ECS cluster is set of EC2 machine where container runs.

## ECS service

ECS service are application definitions that are running on ECS cluster.

There can be multiple ECS service running on same ECS cluster.

ECS service decide where(which server) to run the containers in ECS cluster.

## ECS IAM roles

ECS IAM roles are layer of security provided to each task(each container).

## ECS and ELB

ECS is a container technology which helps you to run multiple instance of application on same or different machine. However if the port number for each container is different then user gets different URL for the service, and its not very helpful. Hence we use load balancer to map multiple containers to same endpoint. The load balancer used here is ALB.

ALB is smart to handel dynamic port mapping as docker may assign dynamic port for the service that are running on the system.

## Configuration of ECS

- *STEP-1*: In ECS install ecs agent.
- *STEP-2*: Define the ecs config file. Config file is stored here '/etc/ecs/ecs.config'

## Four variables for ecs.config

- ECS_CLUSTER                     # Assign EC2 instance to a ECS cluster
- ECS_ENGINE_AUTH_DATA            # Docker registry authentication
- ECS_AVAILABLE_LOGGING_DRIVERS   # cloudWatch container logging
- ECS_ENABLE_TASK_IAM_ROLE=true   # this will enable IAM role for the container

## ECR

Its managed docker registry in AWS. Elastic container registry.
One can store, manage and deploy docker images there.
Fully integrated with IAM and ECS. No separate configuration is not required.
Uses HTTPs (encryption on flight) and images in the ECR are encrypted (encryption on rest).

Note: for consuming images from public docker hub or other registry no need to upload images to ECR. Its only used for private images.

## How we can push images to ECR

We can use codeBuild, codePipeline or CLI or SDK to push the image into ECR. 500Mb free for first 12 month.

## How we can pull images from ECR

From ECS instance we can pull images from ECR. ECR IAM will authenticate the user and the image will arrive at ECS cluster.
