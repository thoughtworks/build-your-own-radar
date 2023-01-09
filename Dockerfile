FROM node:18 AS build

ARG SHEET_ID
ARG SHEET_NAME

WORKDIR /src/build-your-own-radar
COPY package.json ./
RUN npm install

COPY . ./

RUN npm test && npm run build:prod

FROM nginx:1.23.0

COPY --from=build /src/build-your-own-radar/dist /opt/build-your-own-radar
COPY default.template /etc/nginx/conf.d/default.conf
CMD nginx -g 'daemon off;'
