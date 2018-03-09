FROM node:8 as builder

WORKDIR /radar

RUN npm install -g yarn
COPY ./package.json ./
COPY ./yarn.lock ./
RUN npm rebuild node-sass
RUN yarn install
COPY . ./
# RUN rm -rf ./dist
RUN yarn run build

FROM node:8

WORKDIR /radar

COPY --from=builder /radar/dist ./dist
COPY /data ./data
COPY ./package.json .
COPY ./yarn.lock .
COPY ./back ./back

RUN yarn install --production=true

EXPOSE 80

# CMD [ "bash" ]
CMD [ "node", "back/server.js" ]

