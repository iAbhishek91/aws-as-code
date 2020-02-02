# AMI

AMI: are amazon machine image.

- At time of launching EC2 instance fist step is to select the OS. In AWS, OS comes in bundle with pre-installed software for VMs. These bundles are known as AMI.

- AMI are templates that contains software configurations (OS, applications, app servers) required to launch an EC2 instance.

- AMI are special type of virtual appliance used by EC2 service. Virtual appliance are used by hypervisor while starting a new VM. Virtual appliance contain a **fixed state**.

- AMI don't contain the kernel of the OS. The kernel is loaded from an **Amazon Kernel Image (AKI)**.

- There are mainly **three sources of AMI**
  - AMI provided by AWS, by AWS user community.
  - AMI from AWS marketplace.
  _ User own AMI.

> Note: It's important to trust the AMI publisher, at time where you are choosing to select as AMI from AWS marketplace.
