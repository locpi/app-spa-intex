FROM node:14.21.3-bullseye-slim as build
COPY frontend-app /usr/front
WORKDIR /usr/front
RUN npm i
RUN npm run build

FROM node:14.21.3-bullseye-slim
WORKDIR /usr/back
RUN apt-get update &&  apt-get install nginx -y
COPY backend-app /usr/back
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/front/dist /usr/share/nginx/html
RUN npm i
EXPOSE 80

CMD service nginx start && npm run dev
