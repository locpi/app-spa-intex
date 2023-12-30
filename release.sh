cd frontend-app && npm run build && cd .. &&
docker buildx build --platform linux/arm/v8 -t loicpincon/app-spa-intex:latest --push .

