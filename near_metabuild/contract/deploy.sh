#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying contract"

# https://docs.near.org/tools/near-cli#near-dev-deploy
# echo ">> Deploying hello near contract"
# near dev-deploy --wasmFile build/hello_near.wasm

echo ">> Deploying stock image contract"
near dev-deploy --wasmFile build/stock_image.wasm