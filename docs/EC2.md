# EC2

Elastic compute cloud is a service which provides virtual machine over cloud.

## Stages required for creating a instance

- Choose OS
- Choosing the size of the VM (family)
- Configuring details
- Adding Storage
- tagging your virtual machine
- configuring firewall
- Review settings
- Select a key pair

## AMI

AMI: are amazon machine image.

- At time of launching EC2 instance fist step is to select the OS. In AWS, OS comes in bundle with pre-installed software for VMs. These bundles are known as AMI.

- AMI are templates that contains software configurations (OS, applications, app servers) required to launch an EC2 instance.

- AMI are special type of virtual appliance used by EC2 service. Virtual appliance are used by hypervisor while starting a new VM. Virtual appliance contain a **fixed state**.

- AMI don't contain the kernel of the OS. The kernel is loaded from an **Amazon Kernel Image (AKI)**.

- Every AMI comes with a user from which you can ssh
The appropriate user names are as follows:
  - For Amazon Linux 2 or the Amazon Linux AMI, the user name is ec2-user. (sudo su for root access)
  - For a CentOS AMI, the user name is centos.
  - For a Debian AMI, the user name is admin or root.
  - For a Fedora AMI, the user name is ec2-user or fedora.
  - For a RHEL AMI, the user name is ec2-user or root.
  - For a SUSE AMI, the user name is ec2-user or root.
  - For an Ubuntu AMI, the user name is ubuntu.

Otherwise, if ec2-user and root don't work, check with the AMI provider.
> Note: It's important to trust the AMI publisher, at time where you are choosing to select as AMI from AWS marketplace.

## AMI life-cycle

AMI has a life cycle.

1. *create:*
2. *register:*
3a. *launch:*
3b. *copy:*
3c. *de-register:* when we don't require a AMi we need to de-resister it.

## Attributes of AMI

There are many attributes of AMI. Understanding of these will help you to choose AMI better based on your requirements. These attributes can be found using API: *services/Instance/describeImage*.

- *ImageType:* mainly there are three Image type **Machine | Kernel | RamDisk**. Known as AMI, AKI and ARI.
- *Architecture:* is the system architecture. Mainly we use **x86_64**. Other available option are **i386 | x86_64 |arm64**. i386 is old architecture by intel(1985) known as intel 80386 and is 32 bit processor.
- *VirtualizationType:* is the virtualization technology available. Available type **hvm | paravirtual**. HVM(Hardware Virtual Machine) is the latest technology of virtualization where resource are spin up faster and accessed. Refer: [AWS Virtualization types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/virtualization_types.html).
- *EnaSupport:* A Boolean that indicates whether enhanced networking with ENA is enabled.
- *State:* The state of the image are **available | pending | failed**.
- *Launch Permission:* Launch permission are **public | explicit | implicit**. They determine owner of the AMI allows AWS user to launch the AMI or not. These values are present in different form example: **is_public** in describeImage API. Refer: [AWS launch permission](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ComponentsAMIs.html#launch-permissions). use describeImageAttribute
- *Platform:* platforms describes the OS of the AMI. **Windows**.
- *RootDeviceType:* every AMI is backed by amazon EBS or instance store. **ebs | instance-store**. this is type of root device volume, where the primary data is stored. either it can be on AWS EBS or AWS S3 (instance store). For EBS the data is persistent for any other EBS apart from root volume, when the instance is terminated the data is lost (however we can change this behavior by modifying the flat **DeleteOnTermination** to false, its true by default). In case of S3 the data is persisted only during the life of an instance. While in stopped state the EBS data is persisted and hence charged by AWS. **RootDeviceName** is the name of the device or the mount point where the data is saved. 30gb of storage for free tier.
- *Region | Availability zone | Local zone:* determines where exactly EC2 instance is hosted. Region is geographical area, each region has different availability zones. Local zone are area that you create near your customer base, physically outside a region boundary however its a extension of at least one region connected via network. Resources aren't replicated across the region if you don't choose to. Refer: [AWS regions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html).

## AWS by default monitoring

The stats provided by AWS are:

- CPU utilization
- Disk read
- Disk read operation
- Disk writes (Bytes)
- Disk write operations (operations)
- Network In (Bytes)
- Network Out (Bytes)
- Network Packet In (count)
- Network Packet Out (count)
- Status check failed (Any) (count)
- Status check failed (Instance) (count)
- Status check failed (System) (count)
- CPU credit usage (count)
- CPU credit balance (count)

## Amazon Linux 2

there are certain feature that are specific to amazon Linux 2 only:

- EC2 connect

## Instance details

### IP address

- Private IP address do not changes on stopping an IP address.
- Public IP address are lost when instance is stopped.
- Elastic IP address are not lost when instance is stopped.

## EC2 startup scripts

- this are startup commands that are taken from users when instances starts for the first time.
- These are known as bootstrapping. As this work only during booting the system.
- The more you give startup scripts, more time it will take for the system to start.
- All the commands are executed as root.
- Also scripts are executed non interactively. hence yum update without -y will not work.
- first line should be #!/bin/bash
