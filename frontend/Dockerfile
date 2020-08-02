FROM node:latest as ui-build

LABEL author chingiz.egamberdiev

WORKDIR /usr/app
RUN mkdir angular-app
COPY package*.json /usr/app/angular-app/

WORKDIR /usr/app/angular-app

RUN npm install

COPY . /usr/app/angular-app/
RUN npm run build --prod


FROM nginx:1.19-alpine as proxy-server

RUN rm -rv /usr/share/nginx/html/*
COPY --from=ui-build /usr/app/angular-app/dist/frontend /usr/share/nginx/html/

RUN rm -rv /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
