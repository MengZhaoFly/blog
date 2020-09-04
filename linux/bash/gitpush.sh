#!/bin/bash

msg=$1
git add .
echo push message is ${msg}
git commit -m ${msg}
git push