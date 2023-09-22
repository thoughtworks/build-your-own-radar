FROM nginxinc/nginx-unprivileged:1.25.2
USER 0
RUN apt-get update && apt-get upgrade -y && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

RUN                                                                       \
  apt-get install -y                                                      \
  libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3    \
  libxss1 libasound2 libxtst6 xauth xvfb g++ make

#Security fixes2
RUN apt-get update && apt-get upgrade -y libwebp-dev=1.2.4-0.2+deb12u1

WORKDIR /src/build-your-own-radar
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

WORKDIR /src/build-your-own-radar
#  echo "Starting webpack build..."
RUN npm run build:prod
#  echo "Copying built files to nginx directories..."
RUN  mkdir -p /opt/build-your-own-radar
WORKDIR /opt/build-your-own-radar
RUN cp -r /src/build-your-own-radar/dist/* ./
RUN  mkdir -p files
COPY ./spec/end_to_end_tests/resources/localfiles/* ./files/
COPY ./default.template /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER 1000
CMD ["nginx", "-g", "daemon off;"]
