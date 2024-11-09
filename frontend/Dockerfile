FROM node:19-bullseye

COPY . /usr/frontend
WORKDIR /usr/frontend
RUN npm install &&\
    npm install serve &&\
    npm run build &&\
    rm -rf ./node_modules ./public ./src


CMD ["npx", "serve", "-s", "./build", "-l", "80"]
