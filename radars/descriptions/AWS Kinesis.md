[AWS Kinesis](https://aws.amazon.com/kinesis/) makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information. Amazon Kinesis offers key capabilities to cost-effectively process streaming data at any scale, along with the flexibility to choose the tools that best suit the requirements of your application. With Amazon Kinesis, you can ingest real-time data such as video, audio, application logs, website clickstreams, and IoT telemetry data for machine learning, analytics, and other applications. Amazon Kinesis enables you to process and analyze data as it arrives and respond instantly instead of having to wait until all your data is collected before the processing can begin.


### Pros
* Fully managed
* Guaranteed ordering
* Direct integration into other services
* Easy integration into Lambda

### Cons
* No autoscaling
* Expensive
* Possible to hit throughput limits on a given partition within a shard easily
* Consumers must use the Kinesis Client Library (Java)

When decision made: 5/1/2020

When decision will be revisited: 5/1/2021