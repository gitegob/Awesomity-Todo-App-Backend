FROM node:12

ARG $PORT

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE $PORT

CMD [ "npm","run", "dev:docker" ]