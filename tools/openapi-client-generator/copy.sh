#!/bin/bash
OPENAPI_CONTAINER_NAME=$(docker ps -aqf "name=openapi_generator")
rm -rf ../../common/src/clients/*
docker cp ${OPENAPI_CONTAINER_NAME}:/local/out/. ../../common/src/clients
cd ../../common/src/clients
sed -i.bak 's/localhost/host.docker.internal/g' ./*/api/*.service.ts
yarn run prettier && yarn run lint