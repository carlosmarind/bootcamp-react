FROM node:22

WORKDIR /usr/app

COPY ./ ./

RUN npm install

RUN npm run lint

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev" ,"--","--host"]