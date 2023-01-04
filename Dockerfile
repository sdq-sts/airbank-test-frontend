FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

EXPOSE 8080

CMD ["npm", "run", "serve"]



##################
# PRODUCTION
##################
FROM node:16-alpine AS production

RUN npm install -g http-server

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080
CMD [ "http-server", "dist" ]
