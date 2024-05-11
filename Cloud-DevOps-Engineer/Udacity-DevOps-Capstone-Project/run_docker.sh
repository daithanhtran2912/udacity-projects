#!/usr/bin/env bash

# Build image and add a tag image
docker build --tag simple-hello-world-app:latest .

# List docker images
docker images

# Run app
docker run --name "simple-hello-world-app" -p 80:80 simple-hello-world-app:latest