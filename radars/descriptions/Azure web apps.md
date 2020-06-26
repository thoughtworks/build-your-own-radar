[Azure Web Apps](https://azure.microsoft.com/en-us/services/app-service/web/) is a simple way to manage web applications built on ASP.NET. The application can then be bundled and placed on these servers that are running IIS. Generally speaking we do not encourage web apps. Containers should be utilized within [Kubernetes]().

### Pros
* Can leverage service plans for reusing the same sets of hardware
* Scales extremely quickly
* Relatively inexpensive

### Cons
* IIS
* Slow hardware
* Customization is difficult (e.g. put an updated version of .NET Framework in place)


When decision made: 1/1/2020

When decision will be revisited: 1/1/2022