PROJECT_NAME = tech-radar

build:
	docker build -t registry.jimdo-platform.net/${PROJECT_NAME} .

run:
	docker run -t -p 8080:8080 registry.jimdo-platform.net/${PROJECT_NAME}

push:
	wl docker push registry.jimdo-platform.net/${PROJECT_NAME}

deploy:
	wl deploy ${PROJECT_NAME}
