[AMI (Custom Built)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instances-and-amis.html) is a template that contains a software configuration (for example, an operating system, an application server, and applications). From an AMI, you launch an instance, which is a copy of the AMI running as a virtual server in the cloud.

### Pros
* Repeatable configuration of a virual machine
* Easy to rollout multiple instances

### Cons
* Wastes large amounts of resources inside of EC2 when utilization is low
* Can be rather costly, especially for low use applications

[Docker]() replaces the need for creating custom AMIs that contain software packages. 

When decision made: 5/1/2020

When decision will be revisited: 5/1/2021

