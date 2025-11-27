FROM node:24-alpine AS build

WORKDIR /usr/app

COPY . .

RUN npm ci

RUN npm run lint

RUN npm run build

FROM nginx:mainline-alpine-slim AS publish

WORKDIR /usr/share/nginx/html

COPY --from=build /usr/app/dist .
