#!/usr/bin/env bash

# This tags and uploads an image to Docker Hub

# Step 1:
# This is your Docker ID/path
dockerpath=daithanhtran2912/housing_price_prediction_app

# Step 2
# Run the Docker Hub container with kubernetes
kubectl run housing-price-prediction-app --image=$dockerpath:latest --port=8000

# Step 2.1
# Waiting 60s...
sleep 60

# Step 3:
# List kubernetes pods
kubectl get pods

# Step 4:
# Forward the container port to a host
kubectl port-forward housing-price-prediction-app 8000:80