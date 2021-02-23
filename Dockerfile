FROM node:12

ARG $PORT

WORKDIR /usr/src/app

COPY . .

COPY .env.example .env

RUN npm install

EXPOSE $PORT

CMD [ "npm","run", "dev:docker" ]