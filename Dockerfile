FROM node:7.3.0

WORKDIR /app
ADD ./ /app/
RUN npm install
RUN npm run build

EXPOSE  8080

CMD [ "npm", "run", "prod" ]