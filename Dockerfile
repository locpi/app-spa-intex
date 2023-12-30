FROM arm64v8/node
WORKDIR /usr/back
RUN apt-get update &&  apt-get install nginx -y
COPY backend-app /usr/back
COPY nginx.conf /etc/nginx/sites-enabled/default
COPY /frontend-app/dist /var/www/html
EXPOSE 80

CMD service nginx start && npm run dev
