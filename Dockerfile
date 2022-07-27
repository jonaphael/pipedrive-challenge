FROM node:16-alpine

WORKDIR /usr/app/src

COPY package.json ./

RUN yarn install --omit=dev

COPY . .

EXPOSE 3000
CMD ["yarn", "run", "start"]