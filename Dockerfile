FROM nginx:1.23.0

# Update apt and install required packages
RUN apt-get update && apt-get upgrade -y

# Install Node.js using NodeSource - run apt-get update after setup script
# The setup script adds the NodeSource repository but apt cache may be stale
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs

# Install dependencies for Cypress and build tools
RUN apt-get install -y \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 \
    libxss1 libasound2 libxtst6 xauth xvfb g++ make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src/build-your-own-radar
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

# Override parent node image entrypoint script (/usr/local/bin/docker-entrypoint.sh),
# which tries to run CMD as a node command
ENTRYPOINT []
CMD ["./build_and_start_nginx.sh"]
