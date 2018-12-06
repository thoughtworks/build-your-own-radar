job("service/architecture/tech-radar-build-and-deploy") {

    displayName('nm-tech-radar-build-and-deploy')
    description("<img src=\"buildTimeGraph/png\"/>")
    logRotator(-1, -1, 1, 10)
    wrappers {
        timestamps()
        colorizeOutput()
        preBuildCleanup()
    }

    parameters {
        stringParam('BRANCH', 'master', 'Git branch')
        stringParam('DEPLOY_VERSION','','Deployment version')
        stringParam('DEPLOY_ENVIRONMENT','dev','Deployment environment')
        stringParam('MARATHON_URL','${MARATHON_DEV}','Marathon URL')
        stringParam('APP_ID','','Application ID')
        stringParam('INSTANCES','1','Application intances')
        stringParam('PROPERTIES','','Service properties')
    }

    wrappers {
        deliveryPipelineVersion('\${DEPLOY_VERSION}', true)
    }

    scm {
        git {
            branch('${BRANCH}')
            remote {
                credentials('cc1d4123-c18e-403b-b790-1e072cd0583d')
                url('git@github.com:nutmegdevelopment/build-your-own-radar.git')
            }
            extensions {
                cleanBeforeCheckout()
            }
        }
    }

    steps {
      shell("""
        export APP_NAME=tech-radar

        git tag -a -f -m "Release \${DEPLOY_VERSION}" \${DEPLOY_VERSION}

        echo "Build the docker image(s)."
        docker build -f Dockerfile -t ${registry}/${repo}:\${DEPLOY_VERSION} .
        docker tag -f ${registry}/${repo}:\${DEPLOY_VERSION} ${registry}/${repo}:latest

        echo "Push the docker images."
        docker push ${registry}/${repo}:\${DEPLOY_VERSION}
        docker push ${registry}/${repo}:latest

        marathon-config-generator -config-file=tools/marathon/marathon.yml \
          -var=APP_NAME=\${APP_NAME} \
          -var=VERSION=\${DEPLOY_VERSION} | marathon-client -d -m \${MARATHON_PROD} -u marathon -p NutmegMarathon -f -
        """)
    }
}
