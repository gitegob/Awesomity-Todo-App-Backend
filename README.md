# Awesomity-Todo-App-Backend

[![Build Status](https://travis-ci.org/gitego-brian/Awesomity-Todo-App-Backend.svg?branch=develop)](https://travis-ci.org/gitego-brian/Awesomity-Todo-App-Backend) [![Coverage Status](https://coveralls.io/repos/github/gitego-brian/Awesomity-Todo-App-Backend/badge.svg?branch=develop)](https://coveralls.io/github/gitego-brian/Awesomity-Todo-App-Backend?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/72325ad3c4bfaceb1b1f/maintainability)](https://codeclimate.com/github/gitego-brian/Awesomity-Todo-App-Backend/maintainability)

An app that helps you to keep track of your day-to-day tasks.

[Docs](https://brian-todo-backend.herokuapp.com/api/docs)

# API Endpoints included

- **POST /api/auth/signup:** Create an account
- **POST /api/auth/login:** Log into your account
- **POST /api/todos/:** Create a new task
- **GET /todos/:todoId:** Get a single task
- **GET /api/todos:** Get all tasks
- **GET /api/todos?s='search_query':** Search through tasks
- **GET /api/todos?exp:** Download tasks to a csv file
- **PATCH /todos/:todoId:** Update a task
- **DELETE /todos/:todoId:** Delete a task
- **GET /api/logs/:key:** Download logs
- **GET /api/docs** Documentation

# Installation and Environment Setup

**Clone the repository from [Github](https://github.com/gitego-brian/Awesomity-Todo-App-Backend).**

( You will need **Git** for this, Get it [HERE](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) )

```
git clone https://github.com/gitego-brian/Awesomity-Todo-App-Backend.git
```

# Running the app normally

## Pre-Requisites

- PostgreSQL installed
- Database `todoapp` created
- Rename the `.env.example` file to `.env` after filling in your custom variables

**To Install all dependencies:**

```
npm install
```

**To run the tests:**

```
npm test
```

**To run the app:**

```
npm run dev
```

# Running the app through docker

- Install **Docker** from [HERE](https://docs.docker.com/get-docker/), then check if you have **docker-compose** installed by running `docker-compose -v` in the terminal, if that doesn't print out its version, first install it from [HERE](https://docs.docker.com/compose/install/).
- After cloning the application from Github. Switch to the main app where there's the Dockerfile and the docker-compose.yml file
- Create a .env file and copy .env.example and fill out all the variables with your own.
- If you have postgres installed on your computer, stop any server instance of it that may be running. Do this by running `sudo systemctl stop postgresql` if you are on a Linux OS.

- Run `docker-compose up` (Prefix this with `sudo` if you are running a Linux OS). Make sure port `5000` is not taken, if so customise the port in .env file by adding the PORT variable.

_Test the endpoints on http://localhost:5000/api/docs or with your favorite API client, I strongly recommend [Postman](https://www.getpostman.com/) though :ok_hand:_

## Sample Request

### Request body for sign up

```js
{
    "firstName": "Charles",
    "lastName": "Rudahigwa",
    "username": "crudahigwa",
    "password": "Password"
}
```

### Response body for signup

```js
{
    "status": 201,
    "message": "Signup successful"
}
```

# Tools used

- Server-Side Framework: **Node/Express**
- Testing framework: **Mocha/Chai**
- Database engine: **Postgres**
- ORM: **Sequelize**

# Other Tools

- Continuous integration: **[Travis-Ci](travis-ci.org)**
- ES6 Transpiler: **[Babel](babeljs.io)**
- Test coverage: **[nyc](https://www.npmjs.com/package/nyc)**
- Maintainability: **[Code climate](https://codeclimate.com)**
- Container: **[Docker](https://docker.com)**

# Deployments

- The API is hosted on Heroku at https://brian-todo-backend.herokuapp.com/

# Contribute

If you ever have an idea on how you might help improve the app, you are welcome to contribute your changes to the repository, Just follow the steps below:

Assumming you have the repo cloned on your PC,

- Pull the latest changes from the remote repo by running:

```
git pull origin develop
```

NB: You need to be on the develop branch when you do this

- Create & switch to the new branch where you will add your changes by running:

```
git checkout -b yournewbranchname
```

- After adding your changes, commit and push them to create a pull request against the develop branch. I will review and merge them if they are helpful.

# Author:

### _[Brian Gitego](https://github.com/gitego-brian)_
