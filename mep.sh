sudo docker rmi -f  loicpincon/app-spa-intex:latest
sudo docker pull  loicpincon/app-spa-intex:latest
sudo docker stop app-spa-intex-spa-app-1
sudo docker rm app-spa-intex-spa-app-1
sudo docker-compose --profile prod up -d

