#!/usr/bin/env bash

## Complete the following steps to get Docker running locally

# Step 1:
# Build image and add a descriptive tag
docker build --tag housing_price_prediction_app:latest .

# Step 2: 
# List docker images
docker images

# Step 3: 
# Run flask app
docker run --name "housing_price_prediction_app" -p 8000:80 housing_price_prediction_app:latest