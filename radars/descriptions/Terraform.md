[Terraform](https://www.terraform.io/) is an open source tool to use `Infrastructure as Code` principles. As your infrastructure is created you can always make modifications and deploy all of your infra like you would with code. 

### Pros
* Syntactically superior to other tools
* Free
* Active community
* Can be used with any type of infra, not just AWS
* Leads to repeatable infra with less errors

### Cons
* Doesn't provided direct drift detection
* IAM access is required to use Terraform effectively

Terraform workspaces should be employed to separate different environments. 
Replaces [Cloud Formation]()

When decision made:

When decision will be revisited: