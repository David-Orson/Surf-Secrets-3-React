FROM node:16.14.2-alpine

RUN apk update && apk add bash

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD ["npm","start"]

# run locally with 
# docker run --rm -it -p 3000:3000 -d surf-battles-react
