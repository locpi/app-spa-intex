FROM node:14.21.3-bullseye-slim
COPY front-app /usr/front
WORKDIR /usr/front

RUN apt-get update
RUN apt-get install nginx build-essential ufw -y
RUN ufw allow 'Nginx HTTP'

RUN npm i
RUN npm run build
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/sites-enabled/default
RUN rm /usr/share/nginx/html/index.html
RUN cp -r dist/* /usr/share/nginx/html/


WORKDIR /usr/back
RUN rm -rf /usr/front


COPY backend-app /usr/back
RUN npm i
EXPOSE 80

CMD service nginx start && npm run dev
