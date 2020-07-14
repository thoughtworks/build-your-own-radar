[Fluentd](https://www.fluentd.org/) is an open source tool that will automatically collect your logs and send them to an archiving source. There are many possibilities with the tool but we have found that running Fluentd as a daemon-set on our [Kubernetes]() cluster and logging things to `stdout` as the most effective logging solution.  

### Pros
* Automatic collection of logs from simple sources
* Can do some log enrichment and manipulation
* Can batch and send logs directly to Elasticsearch

### Cons
* Configuration is a bit cryptic

When decision made: 5/1/2021

When decision will be revisited: 5/1/2021