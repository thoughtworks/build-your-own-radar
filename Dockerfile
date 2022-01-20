FROM node:17.4.0

WORKDIR /temp-dir-for-python2-setup
RUN                                                                       \
  apt update                                                              \
  && apt upgrade                                                          \
  && apt install -y python                                                \
  && curl -sSL https://bootstrap.pypa.io/pip/2.7/get-pip.py -o get-pip.py \
  && python get-pip.py

WORKDIR /src/build-your-own-radar
COPY package.json ./
RUN npm install
COPY . ./
CMD ["npm","run","dev"]
