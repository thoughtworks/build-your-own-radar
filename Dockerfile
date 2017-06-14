FROM node:7.3.0
EXPOSE 8080

COPY src/ src/
COPY spec/ spec/
COPY scripts/ scripts/
COPY *.json ./
COPY *.js ./
RUN npm install

COPY radars/*.json radars/*.json

CMD ["npm","run","dev"]
