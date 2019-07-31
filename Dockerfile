FROM node:alpine

WORKDIR /usr/app

COPY *.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:local"]
