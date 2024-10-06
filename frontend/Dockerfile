FROM node:19-bullseye

COPY ./build /usr/frontend
WORKDIR /usr/frontend
RUN npm install serve

CMD ["npx", "serve", "-s", ".", "-l", "80"]
