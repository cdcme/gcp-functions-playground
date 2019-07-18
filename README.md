# gcp-functions-playground

Boilerplate for getting up & running locally with GCP Cloud Functions development; includes testing, etc. 

## Setup

Get `nvm`, `node10` installed locally, clone this repo, `cd` into its directory, and:

```shell
$ npm i
$ npm i -g mocha sinon
$ npm start

# in another terminal
$ npm test
```

This runs a small local HTTP function and runs unit and integration tests against it. Output:

```shell
~/Projects/gcp-functions-playground  λ npm test

> gcp-functions-playground@1.0.0 test /Users/carlodicelico/Projects/gcp-functions-playground
> export BASE_URL=http://localhost:8080 && mocha test/*.test.js --exit



  ✓ helloHttp: should print a name
  ✓ helloHttp: should print hello world
  ✓ helloHttp: should print a name from a query param
  ✓ helloHttp: should print a name from the body
  ✓ helloHttp: should print the default name

  5 passing (31ms)
```

# CI/CD

In progress...

