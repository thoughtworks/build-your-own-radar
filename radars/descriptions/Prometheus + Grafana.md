[Prometheus](https://prometheus.io/) is an open source time series database. Prometheus implements a pull model for metrics rather than a push model. Meaning your applications need to have an endpoint, typically `/metrics` that Prometheus can scrape metrics from. 

[Grafana](https://grafana.com/) is an open source visualization tool that can connect to many different data sources to visualize data. Grafana also can provide alerting.

Because one is the data source and the other the visualization we are combining the two of them here.

### Pros
* No cost
* Large community support
* Very customizable
* Many open source libraries to easily add a metrics endpoint to any type of application
* Can integrate with Elasticsearch and OpsGenie
* Community made dashboards available

### Cons
* We administer these services ourselves
* Lack of cohesion sometimes


When decision made: 3/5/2020
When decision will be revisited: 01/01/2022
