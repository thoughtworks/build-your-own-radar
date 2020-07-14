[Matillion](https://www.matillion.com/) is a purpose-built ETL designer and job engine. It’s a cloud-only product (cannot run locally in virtual machines or docker containers) and supports Redshift and Snowflake. The design canvas has a tree of job definitions and each job definition is represented as a graph of visual components. The user is able to drag and drop the components and alter their properties. Though the intent is largely to expose a point and click interface, it also supports custom SQL in various components and in practice Imagine Learning has used a fair amount of custom SQL.

While the product falls under an ETL umbrella, it is more accurately an ELT engine because the work is mostly executed in the target Redshift or Snowflake engine. In other words, executing a job (scheduled or otherwise) results in the Matillion runtime executing queries against Redshift/Snowflake such that the inputs and outputs of the queries are different tables in Redshift/Snowflake. The Matillion software itself runs on an EC2 instance but the resource utilization is relatively light there. Cost is based on actual EC2 cost plus a licensing fee to Matillion.

Matillion includes support for extraction from many source technologies. The pattern is such that queries can be executed against source systems and the results are placed in the target Redshift / Snowflake, and then transforms are executed in the form of SQL on the target system to move and transform the data to destination tables (such as fact and dimension tables).

### Pros
* Potentially quicker to path to working ETL system than custom coded spark/glue/emr/databricks
* SQL-centric nature well received by data engineers with extensive SQL background
* Support for both Redshift and Snowflake as destination systems

### Cons
* Cloud-only. No means to execute locally.
* Compared to ETL where the majority of the T is done out-of-process from redshift / snowflake, a heaver load is placed on redshift / snowflake.

When decision made: 5/1/2021

When decision will be revisited: 5/1/2021