FROM node:alpine3.18 as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build