# Pipedrive Devops challenge
Pipedrive Challenge (Devops)

You can either run this application with a docker or locally installing some tools.

The database chosen for this application was [MongoDB](https://www.mongodb.com/).

Feel free to create you account and create a database and get connection URL to that URL so you can use it as the `MONGO_URL` environment variable.

Also go ahead and get your pipedrive api key following this steps [here](https://pipedrive.readme.io/docs/how-to-find-the-api-token)

Before continuing how to run the application you must configure the following environment variables:

## **Environment Variables**
Ticket management

| Environment variable | Purpose   | Default Value   | Valid Values
------| ----------| ----------------|----------------------------
APP_PORT|Local port where the application will run| 5000 | integer
APP_INTERVAL_SEC|Interval in seconds when the app should checks for all users gists| 10800000 | integer
GITHUB_TOKEN| Github token for request (can be skipped but may fail due to limited requests from github API )|(empty)| string
PIPEDRIVE_TOKEN| The pipedrive api token to use the pipedrive api| (empty) | string
MONGO_URL | The mongoDB connection URL | (empty) | string


* For the `APP_INTERVAL_SEC` value, I highly recommend to use the proper value `> 60000`, or the github api, will block the requests.

* When getting the `MONGO_URL` value, don't forget to replace the username, password and databaseName. The value should looks like this:
```
mongodb+srv://{username}}:password@cluster0.rsiys.mongodb.net/{databaseName}?retryWrites=true&w=majority
```

Inside of the application you can there is a the `env-example`
all variable are empty or with their default value, you can create a `.env` file and replace its content with the content of the `env-example` file with their respective values.

## API Documentation

You can check the documentation of the API [here](https://pipedrive-challenge-zyfrriq4uq-lz.a.run.app/api/doc/)

## Step to run with a [docker container](https://www.docker.com/)

Build the container
```
docker build -t pipedrive/devops-challenge .
```

Run the container
```
docker run -p 3000:APP_PORT pipedrive/devops-challenge 
```

## Step to run with nodejs
You must have nodejs 16 or > installed.