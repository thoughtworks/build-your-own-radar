FROM node:8.9.4

WORKDIR /radar

# RUN npm install -g yarn

COPY . ./

# RUN yarn install
# RUN yarn run build

EXPOSE 8000

CMD [ "npm", "run", "serve" ]

