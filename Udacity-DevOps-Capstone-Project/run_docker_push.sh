#!/usr/bin/env bash

# Create dockerpath
dockerpath=daithanhtran2912/simple-hello-world-app

# Authenticate & tag
echo "Docker ID and Image: $dockerpath"
docker login
docker tag simple-hello-world-app $dockerpath:latest

# Push image to a docker repository
docker push $dockerpath:latest