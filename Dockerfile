FROM node:22

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install

CMD ["npm", "run", "dev" ,"--","--host"]

