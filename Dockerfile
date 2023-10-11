FROM arm64v8/node as build
COPY frontend-app /usr/front
WORKDIR /usr/front
RUN npm i
RUN npm run build

FROM arm64v8/node
WORKDIR /usr/back
RUN apt-get update &&  apt-get install nginx -y
COPY backend-app /usr/back
COPY nginx.conf /etc/nginx/sites-available/default.conf
COPY --from=build /usr/front/dist /var/www/html
RUN npm i
EXPOSE 80

CMD service nginx start && npm run dev
