# Hackapel

## Pre-Requirements to install the development enviroment...

1- Node installed
2- NPM installed
3- Docker installed
4- Postgre standard image

## Pre first start need...

1- cd .\Hackapel\backend\
2- npm install
3- cd .\Hackapel\frontend\
4- npm install

## Steps to start application...

1- Run Docker Postgre contanier
2- cd .\Hackapel\backend\
3- npm start
    obs: to check if backend was started succefully just run on the terminal a 'curl http://localhost:3000/api/health'
        you should see something like: 
        Content: {"status":"ok","database_time":"20 25-11-29T19:28:32.767Z"}
4- cd .\Hackapel\frontend\
5- npm start