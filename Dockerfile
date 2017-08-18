FROM node:6.10.3-alpine

# Create app directory
RUN mkdir -p /usr/src/app/ex-sesh
WORKDIR /usr/src/app/ex-sesh

# Install app dependencies
COPY ./package.json /usr/src/app/ex-sesh
RUN npm install

# Bundle app source
COPY . /usr/src/app/ex-sesh

EXPOSE 3000
CMD [ "npm", "start" ]
