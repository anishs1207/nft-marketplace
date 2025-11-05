# Deploy to dockerhub
docker login # login to dockerhub here
docker ps 

# 1. Dockefile:
# docker build it anishs107/myapp:latest
docker build -t anishsabharwal/nft-marketplace:latest -f ./src/Dockerfile ./src
docker push anishsabharwal/nft-marketplace:latest
docker pull anishsabharwal/nft-marketplace:latest
docker run -p 3000:3000 anishsabharwal/nft-marketplace:latest
docker stop "container-name-or-id"

# to run on server: (Dockerfile)
docker pull anishsabharwal/nft-marketplace:latest
docker run -d -p 3000:3000 --name nft-marketplace --restart unless-stopped anishsabharwal/myapp:latest

# 2. use of docker-compose file:
# created Dockefile, .dockerignore
# docker-compose-dev and docker-compose-prod files
# docker-compose build

# pushing to dockerhub:
docker compose -f docker-compose-dev.yml build
docker images
docker tag <local-image-name> anishsabharwal/nft-marketplace:latest
docker push anishsabharwal/nft-marketplace:latest

# fetching from dockerhub and running container locally:
docker pull anishsabharwal/nft-marketplace:latest
docker run -p 3000:3000 anishsabharwal/nft-marketplace:latest
docker stop "container-name-or-id"

# 3. run for deployment (running on the server ec2-aws etc here):
docker pull anishsabharwal/nft-marketplace:latest
docker run -d \
  -p 3000:3000 \
  --name nft-marketplace \
  --restart unless-stopped \
  anishsabharwal/nft-marketplace:latest
docker stop "container-name-or-id"

# or on a remote server use: (no manual docker run used over here)
docker login
docker compose -f docker-compose-prod.yml pull
docker compose -f docker-compose-prod.yml up -d
