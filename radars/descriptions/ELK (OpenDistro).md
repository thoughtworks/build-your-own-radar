ELK is the combination of Elasticsearch, Kibana and Logstash. See [Elasticsearch]() for more information on that but Logstash is a good ingester of data into Elasticsearch. This combination of services makes for a solid logging solution. Additionally, AWS has contributed back to the community with [OpenDistro](https://opendistro.github.io/for-elasticsearch/) to fill the gaps in authentication and management of the system.

### Pros
* Can handle large amounts of log data
* Very low cost because there are no license restrictions
* Automatic ingestion of any log

### Cons
* Requires some maintenance and consideration on the indices themselves
* Doesn't have 

[Structured logs](https://engineering.grab.com/structured-logging) should be used where possible to make the searches as efficient as possible. 

When decision made: 5/1/2021

When decision will be revisited: 5/1/2021

