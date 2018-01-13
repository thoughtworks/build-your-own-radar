FROM node:7.10.1 as source
WORKDIR /src/build-your-own-radar
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.13.8-alpine
ADD https://github.com/jwilder/dockerize/releases/download/v0.6.0/dockerize-alpine-linux-amd64-v0.6.0.tar.gz dockerize.tar.gz
RUN tar xf dockerize.tar.gz -C /usr/local/bin \
  && rm dockerize.tar.gz
WORKDIR /opt/build-your-own-radar
COPY --from=source /src/build-your-own-radar/dist .
COPY default.tmpl /etc/nginx/conf.d/default.tmpl
ENTRYPOINT ["dockerize", "-template", "/etc/nginx/conf.d/default.tmpl:/etc/nginx/conf.d/default.conf"]
CMD ["nginx", "-g", "daemon off;"]
