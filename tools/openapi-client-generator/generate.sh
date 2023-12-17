#!/bin/bash
hosts=(${USER_SERVICE_HOST} ${MOCK_SERVICE_HOST})
ports=(${USER_SERVICE_PORT} ${MOCK_SERVICE_PORT})

rm -rf /local/out/*
for i in "${!hosts[@]}"; do
    npx openapi-generator-cli generate \
    -i http://${hosts[i]}:${ports[i]}/api-json \
    -g typescript-nestjs \
    -o /local/out/${hosts[i]} \
    --remove-operation-id-prefix
done