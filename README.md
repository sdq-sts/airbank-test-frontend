# Friday Finance - Backend

## Description
This repository contains code for the test of fullstack developer at Friday Finance

Steps to reproduce the **backend** are [here](https://github.com/sdq-sts/airbank-test-backend) and its mandatory to run this repository.

## Technologies

<p align="center">
  <a href="https://www.docker.com/" target="blank">
    <img src="assets/docker-logo.png" width="90" height="75" alt="Docker Logo" />
  </a>
  <a href="https://vuejs.org/" target="blank">
    <img src="assets/vue-logo.png" width="90" height="75" alt="Vue Logo"/>
  </a>
  <a href="https://tailwindcss.com/" target="blank">
    <img src="assets/tailwind-logo.png" width="90" height="75" alt="Vue Logo"/>
  </a>
</p>

## Dependencies

You need to have [Docker](https://www.docker.com/) and `docker-compose` installed in your machine in order to build and run this docker image.

You will also need to run the [backend server](https://github.com/sdq-sts/airbank-test-backend)

## Repository

First of all is necessary to clone this repository:

```bash
git clone git@github.com:sdq-sts/airbank-test-frontend.git
```

And after that access the repository folder and follow the steps below.

## Steps

0. Copy the `.env.example` to `.env`:

```bash
cp .env.example .env
```

1. Then you need to build and run this image with:

```bash
docker-compose up prod
```

2. After that you need to go to `localhost:8080/`
