FROM node:latest as backend

LABEL author chingiz.egamberdiev

WORKDIR /app

COPY package*.json ./
RUN npm install; mkdir backup

COPY . .

CMD ["node", "server"]
