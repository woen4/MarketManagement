FROM node:alpine

RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app

RUN apk add --no-cache git
RUN yarn

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 3333:3333

CMD ["yarn", "dev"]
