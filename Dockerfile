FROM nginx:1

ARG NODE_MAJOR=20

RUN apt-get update && apt-get upgrade --yes 

RUN apt-get install --yes ca-certificates curl gnupg libgtk2.0-0 \
  libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3    \
  libxss1 libasound2 libxtst6 xauth xvfb g++ make

RUN mkdir -p /etc/apt/keyrings/
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install --yes nodejs

WORKDIR /src/build-your-own-radar

COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm update

COPY . ./

ENTRYPOINT []

CMD ["./build_and_start_nginx.sh"]
