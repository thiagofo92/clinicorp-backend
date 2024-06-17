FROM node:20.14.0

WORKDIR /api

COPY ./src /api/
COPY ./package.json ./jsconfig.json /api/

RUN npm i -g pnpm && pnpm i

CMD ["node", "index.mjs"]
