[Azure Cloud Services](https://azure.microsoft.com/en-us/services/cloud-services/) is a simple way to manage a fleet of virual machines. An application bundle is built and then placed on the machines. Generally speaking we do not encourage provisioning an entire VM for a single application. Containers should be utilized within [Kubernetes]().

### Pros
* Simple and easy way to manage a fleet of virtual machines with the same software
* Can scale to meet increased demand

### Cons
* Slow Startup (~15 minutes)
* Expensive
* Customization is difficult (e.g. put an updated version of .NET Framework in place)


When decision made: 1/1/2020

When decision will be revisited: 1/1/2022