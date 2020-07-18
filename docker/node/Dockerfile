FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY ./src /app

RUN npm i

ENTRYPOINT npm run start
