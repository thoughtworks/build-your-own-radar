Docker is a means of packaging an application with all of its dependencies required to run. You can think of a Docker container as a lightweight virtual machine without the overhead of the OS. Typically we prefer smaller containers based on the Alpine images. When you build your applications this way you can have the same deployment patterns with all applications regardless of language. 

### Pros
* Provides a means to control the running environments easily
* The container provides a consistent experience across the board
* Containers enable greater application density to use every ounce of server resources efficiently

### Cons
* Debugging can be more difficult if there is an issue with the container itself

Combining these benefits with [Kubernetes]() leads to a great way to manage all applications efficiently. 

When decision made: 5/1/2021

When decision will be revisited: 5/1/2021