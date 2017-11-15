# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm install
RUN mkdir src
COPY src src
# node package will auto-run `npm start`!
