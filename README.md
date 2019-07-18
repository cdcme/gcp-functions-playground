# gcp-functions-playground

Boilerplate for getting up & running locally with GCP Cloud Functions development. Includes testing and CI/CD. 

_**Important Note:** Do not use `cloud-functions-emulator`. It has been [deprecated](https://github.com/googlearchive/cloud-functions-emulator/issues/327)._

## Setup

Get [nvm](https://github.com/nvm-sh/nvm) and `node10` installed locally, then install global deps:

```zsh
$ npm i -g firebase-tools mocha
```

Then clone this repo, `cd` into its directory, and do:

```zsh
$ pushd http && npm i && popd
$ pushd pubsub && npm i && popd
```

to install deps for the `http` and `pubsub` example functions. 

You might also need to create a topic if you're using your own GCP project:

```zsh
$ gcloud beta pubsub topics create
```

When you're ready to work, `cd` into the appropriate directory and do:

```zsh
$ npm start

# in another terminal
$ npm test
```

This runs a small local function and runs unit/integration tests against it. 

Output for the HTTP function:

```zsh
~/Projects/gcp-functions-playground/http  λ npm test

> gcp-functions-playground@1.0.0 test /Users/carlodicelico/Projects/gcp-functions-playground/http
> export BASE_URL=http://localhost:8080 && mocha test/*.test.js --exit



  ✓ helloHttp: should print a name
  ✓ helloHttp: should print hello world
  ✓ helloHttp: should print a name from a query param
  ✓ helloHttp: should print a name from the body
  ✓ helloHttp: should print the default name

  5 passing (31ms)
```

Output for the Pubsub function:

```zsh
~/Projects/gcp-functions-playground/pubsub λ npm test

> gcp-functions-playground@1.0.0 test /Users/carlodicelico/Projects/gcp-functions-playground/pubsub
> export BASE_URL=http://localhost:8181 && mocha test/*.test.js --exit

  helloPubsub

  3 passing (1s)
```

# CI/CD

In progress...

