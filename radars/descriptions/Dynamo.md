Dynamo is a NOSQL database hosted and manged by AWS. It is built with scale in mind and we have had good experiences building solid scalable applications.

### Pros
* Very inexpensive
* Practically infinite scale
* Incredible fast response times

### Cons
* Requires up front knowledge of query patterns
* Difficult to query ad-hoc

Dynamo should be used by default for any microservice that is storing things as operational records that do not have heavy query requirements. For more information see [This great Medium article](https://medium.com/imaginelearning/bring-dynamo-to-the-data-science-party-2d961b72bb8d?source=friends_link&sk=5dd7bd16cbf678bb926122549d83cb4a)

When decision made: 5/1/2021

When decision will be revisited: 5/1/2021

