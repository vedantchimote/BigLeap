#!/bin/bash

# Set variables
HARBOR_URL="hpcie-harbornode.pune.cdac.in"
PROJECT_NAME="bigleap"
IMAGE_NAME="bigleap-api"
VERSION="1.0.0"
FULL_IMAGE_NAME="$HARBOR_URL/$PROJECT_NAME/$IMAGE_NAME:$VERSION"
LATEST_IMAGE_NAME="$HARBOR_URL/$PROJECT_NAME/$IMAGE_NAME:latest"

# Build the image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Tag the image with version and latest
echo "Tagging image as $FULL_IMAGE_NAME and $LATEST_IMAGE_NAME..."
docker tag $IMAGE_NAME $FULL_IMAGE_NAME
docker tag $IMAGE_NAME $LATEST_IMAGE_NAME

# Login to Harbor (optional if already logged in)
echo "Logging in to Harbor registry..."
docker login $HARBOR_URL

# Push the images
echo "Pushing images to Harbor..."
docker push $FULL_IMAGE_NAME
docker push $LATEST_IMAGE_NAME

echo "Done! Images pushed to Harbor registry."