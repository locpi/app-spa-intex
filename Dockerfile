FROM arm64v8/node
RUN apt-get update &&  apt-get install nginx -y
COPY frontend-app /usr/front
COPY backend-app /usr/back
COPY nginx.conf /etc/nginx/sites-enabled/default
RUN cd /usr/front && npm install && npm run build
COPY /usr/front/dist /var/www/html
EXPOSE 80
CMD service nginx start && npm run dev
