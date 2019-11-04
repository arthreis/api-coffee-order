FROM node:alpine

WORKDIR /usr/app

COPY *.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start:local"]
