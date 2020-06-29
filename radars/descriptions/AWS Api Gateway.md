[Api Gateway](https://aws.amazon.com/api-gateway/) is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. APIs act as the "front door" for applications to access data, business logic, or functionality from your backend services. Using API Gateway, you can create RESTful APIs and WebSocket APIs that enable real-time two-way communication applications. API Gateway supports containerized and serverless workloads, as well as web applications.

Generally speaking Api Gateway is a cool technology but there is a strong preference to run appliations on our existing [Kubernetes]() clusters to take advantage of free resources that are already available. 

### Pros
* Fully managed
* Simple to setup and get started
* Direct integration into other services

### Cons
* Api gateway can be more expensive when dealing with large loads
* Difficult to have large application cohesion

When decision made: 5/1/2020

When decision will be revisited: 5/1/2021