# TOPMAMA CODING CHALLENGE

This project uses TypeORM with PostgreSQL in a [Nest](https://github.com/nestjs/nest) framework TypeScript, you can access project documentation [TopMama](http://topmama.grycare.com/api) with sample request to test each API. The application was deployed on AWS EKS and you find the helm chart if you want to deploy it on your personal cluster.

## Project structure

The project is broken into three modules which [books](https://github.com/Oshianor/topmama/tree/main/topmamamgr/src/books), [characters](https://github.com/Oshianor/topmama/tree/main/topmamamgr/src/characters) and [comment](https://github.com/Oshianor/topmama/tree/main/topmamamgr/src/comments) with each one of them a controller, entity, DTO, module and service file.


### Installation

#### Prerequisites
To run this project locally you need to make a copy of the [ENV](https://github.com/Oshianor/topmama/blob/main/topmamamgr/.env.examples) and rename it to ".env" and provide the right details to get the project up and running. 

```bash
npm install
```
#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Deploy Chart to EKS
To deploy the helm chart on kubernetes you need to containerize the application and you can do that with the following steps. Also make sure you've docker installed and kubernetes running on 
your local amchine with minikube. Make sure you have helm install also, you can follow this step to install [helm](https://helm.sh/docs/intro/install/)


```bash
  # If you're using a mac intel/linux/windows
 docker build -t topmama . 

  # If you're on a MI Mac you need to the us this command.

 docker buildx build --platform=linux/amd64 -t topmama . 
```

```bash

# Install chart
 helm install topmama ./topmamachart -f ./topmamachart/values.yaml

  # get all the resource
 kubectl get all
```

The helm chart will likely fail becuase this chart uses AWS ingress, you'll need to change that to NGINX to run it locally.


