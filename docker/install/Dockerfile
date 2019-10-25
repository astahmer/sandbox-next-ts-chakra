# Set the base image.
FROM node:10-alpine

# Create and define the node_modules's cache directory.
RUN mkdir /usr/cache
WORKDIR /usr/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org
RUN npm install --no-progress --ignore-optional

# Create and define the application's working directory.
RUN mkdir /usr/app
WORKDIR /usr/app

# Copy entrypoint, make it executable & set it
COPY ./docker/install/entrypoint.sh .
RUN chmod +x /usr/app/entrypoint.sh
ENTRYPOINT ["sh", "./docker/install/entrypoint.sh"]