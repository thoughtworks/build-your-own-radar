FROM nginx:1

ARG NODE_MAJOR=20

RUN apt-get update && \
  apt-get upgrade --yes && \
  apt-get install --yes ca-certificates curl gnupg libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb g++ make && \
  mkdir -p /etc/apt/keyrings/ && \
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
  apt-get update && \
  apt-get install --yes nodejs

RUN mkdir -p /opt/build-your-own-radar
WORKDIR /opt/build-your-own-radar

COPY package.json ./
COPY package-lock.json ./

RUN npm ci && \
  npm update

COPY . ./

CMD npm run build:prod && \
  cp ./default.template /etc/nginx/conf.d/default.conf && \
  nginx -g 'daemon off;'
