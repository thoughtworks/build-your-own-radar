FROM node:17.4.0

RUN apt-get update && apt-get upgrade -y

RUN                                                                       \
  apt-get install -y                                                      \
  libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3    \
  libxss1 libasound2 libxtst6 xauth xvfb

WORKDIR /temp-dir-for-python2-setup
RUN                                                                       \
  apt-get install -y python                                               \
  && curl -sSL https://bootstrap.pypa.io/pip/2.7/get-pip.py -o get-pip.py \
  && python get-pip.py

WORKDIR /src/build-your-own-radar
COPY package.json ./
RUN npm install
COPY . ./
CMD ["npm","run","dev"]
