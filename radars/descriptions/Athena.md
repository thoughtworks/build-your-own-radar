[Amazon Athena](https://aws.amazon.com/athena/) is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage, and you pay only for the queries that you run.

Athena is easy to use. Simply point to your data in Amazon S3, define the schema, and start querying using standard SQL. Most results are delivered within seconds. With Athena, there’s no need for complex ETL jobs to prepare your data for analysis. This makes it easy for anyone with SQL skills to quickly analyze large-scale datasets.

### Pros
* Provides an SQL query interface to structured and semi-structed data stored in S3.

### Cons
* Without an adequate partitioning strategy and utilization of that strategy as part of the queries, costs to execute can be relatively high. As an example, the student data from L&L / Spanish can cost up to $2.50 per query if the entire S3 dataset is read.  The worst case cost is entirely a function of the size of the dataset which suggests that documentation should exist to provide guidance depending on the dataset.
* While Athena supports an ANSI SQL compatibility level, this may not be as full featured as SQL variants supported by other relational databases such as Microsoft SQL Server
In some cases, other technologies like Spark could be a prefered means to query the S3 data.  This might be for performance reasons (more control over the node types that execute the query).
* Queries can be costly if care is not taken to bound your query

When decision made: 1/1/2020

When decision will be revisited: 1/1/2022