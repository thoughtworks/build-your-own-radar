FROM node:18 as builder

WORKDIR /workspace

COPY package*.json .
RUN npm ci

COPY . .

RUN npm run build:prod -- --output-path=/webapp

FROM nginx:1.23

COPY --from=builder /webapp /app

CMD ["nginx", "-g", "daemon off;"]
