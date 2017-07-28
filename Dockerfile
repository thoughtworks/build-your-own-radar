FROM node:7.3.0

WORKDIR /app
ADD ./ /app/
RUN npm install

EXPOSE  8080

CMD [ "npm", "run", "prod" ]