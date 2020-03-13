AWS Lambda functions are a great way to run snippets of code without worrying about the underlying infrastructure the code would run on. Currently this is most useful as means to cheaply process events from Kinesis, DynamoDb streams, SNS, or SQS. AWS has provided all of the plumbing to handle this efficiently. 

### Pros
* Very cheap, insanely cheap
* Effectively infinite scale

### Cons
* Not a good fit for IO bound operations
* Deployment pipelines for the functions themselves is not ideal. Even when using [Terraform]() you have to resort to zip files.
* You must wait for updated frameworks (new versions of Node or .NET core for example) to be available on AWS


When decision made:

When decision will be revisited: