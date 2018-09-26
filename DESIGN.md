# tech-radar

This a fork of https://github.com/thoughtworks/build-your-own-radar so please
refer to their documentation about the application itself.


The Application is built using npm and serves as a quasi static site from k8s as a gygservice. 

There are 2 versions of the app:
* https://techradar.getyourguide.com/ - external version. Served thourgh cleverstack etc.
* https://techradar.gygadmin.com/ - internal version with team specific information. Served through a k8s ingress

