# Solution architect case study number -1

**Pre-requisite**:

So we will follow certain steps to come to the final AWS architecture.

- Understand the requirement or functionality of the application.
  - type of application
  - dependencies of the application (in-house).
  - dependencies of the application (third-party).
  - Application design:
    - web app, or webView or native app.
    - technologies used to develop the application.
    - what, why and decide:
      - branching strategy
      - version control.
      - build tools
      - QE tools (SonarCube, ZAPProxy, veracode)
      - moving artifacts to private registry.
      - download and deployments.
      - release strategy.
  - Consumer of the application
    - capacity planning based on history
    - DEtermine RTO and RPO fo the application.
    - Performance: standard or extra smooth.
  - Design pattern: MVC or MVVM or normal client server.
  - Database: is database required? for stateless app database is not required.
  - Are we using containers? yes or no.
- Once this is done, design the solution.
  - Steps for solution designing, start simplest possible.
  - Make sure we always checked all the five pillars of well architecture application.
    - Cost
    - Performance
    - Reliability
    - Security
    - Operational Excellence (Automation)

## Case Study

**What is the time.com** this app just shows anyone time.

- stateless (no db required).
- no downtime, there should be a option of vertical and horizontal scale.

## Architect the app

### Step-1

**T2 micro** to run the app. App is working fine.

### Step-2

Since our IP changes every time we restart the instance, we need a **Elastic IP**.

## Step-3

Our application is getting more traffic. Hence we will try to vertically scale up first. 

**M5.large** is taken now instead of t2 micro.

## Step-4

Now while upgrading from T2.micro to M5.large we got downtime and users are not happy.

Now we scale horizontally, now we have **multiple m5.large** instead of one.

## Step-5

We have problem as we cant have infinite number of elastic IP (it 5 per region per account). hence we need to get rid of it.

So we go with **route 53**, with *A record* and TTL of 1 hour. Now the change of the IP address of EC2 instance doesn't really matter.

## Step-6

Now since we are using route-53 with TTL of 1 hour, if any of the EC2 instance are fails, the application for few users goes down, as the user request will wait for 1 hour and fail.

Now we have **load balancer + health check** in between route-53 and the app.

To configure this we change the VPC a bit, we put the EC2 instance in the private subnet all on one AZ and load balancer in the public.

We also change the route-53 as it will not point to load balancer, and laod balancer do not have fixed IP (no elastic IP), we change *A record* to *Alias Record*.

## Step-7

At this point every thing is good, we have an issue with manually adding and removing m5.large instance.

Now we bring in the concept of auto scaling **ASG**.

We apply ASG on the AZ, for scaling in and out.

## Step-8

Now suppose we have a natural calamity and the AZ goes down.

So we now change it to **multi AZ** application. Now We need to change this in the load balancer and also our ASG span over multiple AZ.

## Step-9

Now we see all the m5.large are having on-demand scheme. Its expensive lets do some cost saving.

We **reserve** two EC2 instance on two different AZ, and then rest will be on-demand done by ASG.
