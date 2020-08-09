FROM node:latest as backend

LABEL author chingiz.egamberdiev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "server"]
