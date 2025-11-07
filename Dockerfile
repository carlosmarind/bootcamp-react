FROM node:22 AS build

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run lint

RUN npm run build

FROM nginx:stable-alpine AS publish

WORKDIR /usr/share/nginx/html

COPY --from=build /usr/app/dist .
