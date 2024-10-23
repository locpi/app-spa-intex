FROM node:22.10.0 as build
COPY frontend-app /usr/front
WORKDIR /usr/front
RUN npm i
RUN npm run build

FROM node:22
WORKDIR /usr/back
RUN apt-get update &&  apt-get install nginx -y
COPY backend-app /usr/back
COPY deploy/nginx.conf /etc/nginx/sites-enabled/default
COPY --from=build /usr/front/dist /var/www/html
RUN npm i
EXPOSE 80

CMD service nginx start && npm run dev
