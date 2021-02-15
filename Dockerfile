FROM node:latest

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

RUN cd build

CMD ["node", "server.js"]