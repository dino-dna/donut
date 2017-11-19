#!/bin/bash

mkdir -p packages/donut-monster/node_modules
ln -fs "$PWD/packages/common" packages/donut-monster/node_modules/donut-common
ln -fs "$PWD/packages/regression" packages/donut-monster/node_modules/donut-regression

mkdir -p packages/regression/node_modules
ln -fs "$PWD/packages/common" packages/regression/node_modules/donut-common

mkdir -p packages/ui/node_modules
ln -fs "$PWD/packages/common" packages/ui/node_modules/donut-common
