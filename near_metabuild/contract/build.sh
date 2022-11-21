#!/bin/sh

echo ">> Building contract"

near-sdk-js build src/contract.ts build/hello_near.wasm
near-sdk-js build src/stock_image.ts build/stock_image.wasm
