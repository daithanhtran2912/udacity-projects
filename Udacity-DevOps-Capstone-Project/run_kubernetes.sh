#!/usr/bin/env bash

# Docker ID/path
dockerpath=daithanhtran2912/simple-hello-world-app

# Run the Docker Hub container with kubernetes
pod_name=simple-hello-world-app
kubectl run $pod_name --image=$dockerpath:latest --port=80

# Waiting for pod to be ready
while [[ $(kubectl get pod $pod_name -o 'jsonpath={..status.conditions[?(@.type=="Ready")].status}') != "True" ]]; do
  echo "Waiting for pod $pod_name to be ready..."
  sleep 5
done

# List kubernetes pods
kubectl get pods

# Forward the container port to a host
kubectl port-forward simple-hello-world-app 80:80