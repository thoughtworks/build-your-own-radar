Athena is a managed / on-demand query execution service. To date Imagine Learning has used it to execute SQL queries against data stored in S3. Athena can query data in S3 that is structured (parquet or ORC files) or semi-structured (JSON, XML, CSV).

A common scenario is that data exists in a data source that does not support SQL queries. For instance, the Imagine Learning L&L and Spanish products store student data as JSON in Azure Blob storage. By replicating that data to S3 as parquet or ORC files, SQL queries can be executed against the data.

Sample use cases:
* Engineers and QA personnel can query ILEvents that operational services have emitted such as rostering events. In this use case, Athena is useful to explore the data or to troubleshoot whether a particular event was sent.
* Engineers, QA, and data analysts can query student data for the Imagine Learning L&L and Spanish products for the purposes of troubleshooting or for the purposes of producing an ad-hoc report.
* 
Some technology companies use Athena to transform data.  This might include taking a dataset from S3, executing a transform query, and storing the results to a second dataset in S3.

The cost structure of Athena queries is based on the volume of data that's read from S3 to execute the query. The partitioning strategy of the S3 data is especially important and care should be taken to utilize the partitioning in query filters. For instance if data is partitioned by date and the Athena query has a corresponding filter then only a small subset of the S3 dataset is read when the query is executed.

AWS exposes a web interface for authoring and executing Athena queries which is sufficient for casual usage. Power users will more likely want to utilize an ODBC or JDBC driver so that a full-featured IDE can be used to author and execute queries, or in cases where an automated job is executing the query.

### Pros
* Provides an SQL query interface to structured and semi-structed data stored in S3.

### Cons
* Without an adequate partitioning strategy and utilization of that strategy as part of the queries, costs to execute can be relatively high. As an example, the student data from L&L / Spanish can cost up to $2.50 per query if the entire S3 dataset is read.  The worst case cost is entirely a function of the size of the dataset which suggests that documentation should exist to provide guidance depending on the dataset.
* While Athena supports an ANSI SQL compatibility level, this may not be as full featured as SQL variants supported by other relational databases such as Microsoft SQL Server
In some cases, other technologies like Spark could be a prefered means to query the S3 data.  This might be for performance reasons (more control over the node types that execute the query).