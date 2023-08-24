FROM nginxinc/nginx-unprivileged:1.25.2
USER 0
RUN apt-get update && apt-get upgrade -y

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN                                                                       \
  apt-get install -y                                                      \
  libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3    \
  libxss1 libasound2 libxtst6 xauth xvfb g++ make

WORKDIR /src/build-your-own-radar
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

RUN cd /src/build-your-own-radar \
  echo "Starting webpack build..." \
  npm run build:prod \
  echo "Copying built files to nginx directories..." \
  mkdir -p /opt/build-your-own-radar \
  cd /opt/build-your-own-radar \
  cp -r /src/build-your-own-radar/dist/* ./ \
  mkdir -p files \
  cp /src/build-your-own-radar/spec/end_to_end_tests/resources/localfiles/* ./files/ \
  cp /src/build-your-own-radar/default.template /etc/nginx/conf.d/default.conf

# Override parent node image's entrypoint script (/usr/local/bin/docker-entrypoint.sh),
# which tries to run CMD as a node command
USER 1000
CMD ["nginx", "-g", "daemon off;"]
