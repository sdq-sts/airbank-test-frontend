FROM node:16 as development

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

EXPOSE 8080

CMD ["npm", "run", "serve"]



##################
# PRODUCTION
##################
FROM node:16 AS production

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /usr/src/app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json yarn.lock ./

# install project dependencies
RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN yarn build

EXPOSE 8080
CMD [ "http-server", "dist" ]
