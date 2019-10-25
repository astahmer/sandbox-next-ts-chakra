# Dockerized TypeScript Next.js + Chakra-UI example

This is a dockerized wrapper around https://github.com/zeit/next.js/tree/canary/examples/with-typescript with [Chakra-UI](https://chakra-ui.com/ "Chakra-UI") included

## Usage

Just `make install` (the first time only) with Docker installed and then `make start` the next times and you're ready to go. Use `make`to see the list of commands available.

## What's included

-   Dockerized NextJS example with Typescript with a Makefile to make the process easier
-   Auto sync between node_modules from container on host machine, to keep Intellisense available
-   Prettier & pre-commit hook using Husky
-   Axios instead of isomorphic-fetch (from the NextJS official example)
-   Automatically add entry to /etc/hosts file with PROJECT_NAME-nextjs.lol
-   Chakra-UI

## What's not included

-   A nginx-reverse-proxy container
