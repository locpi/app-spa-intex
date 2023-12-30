echo "Demarrage de l'installation"
echo "Creation du dossier app-spa-intex"
mkdir app-spa-intex
cd app-spa-intex
echo "Telechargement du docker-compose"
curl -LO "https://github.com/locpi/app-spa-intex/releases/download/latest/docker-compose.yml"
docker rmi -f  loicpincon/app-spa-intex:latest
docker pull  loicpincon/app-spa-intex:latest
docker stop app-spa-intex-spa-app-1
docker rm app-spa-intex-spa-app-1
docker-compose --profile prod up -d


