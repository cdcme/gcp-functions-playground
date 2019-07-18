'use strict'

const assert = require('assert')
const sinon = require('sinon')
const uuid = require('uuid')

const {helloHttp} = require('..')

it('helloHttp: should print a name from a query param', () => {
  // Mock ExpressJS 'req' and 'res' parameters
  const name = uuid.v4()
  const req = {
    body: {},
    query: {
      name: name,
    }
  }
  const res = {send: sinon.stub()}

  // Call tested function
  helloHttp(req, res)

  // Verify behavior of tested function
  assert.ok(res.send.calledOnce)
  assert.deepStrictEqual(res.send.firstCall.args, [`Hello, ${name}!`])
})

it('helloHttp: should print a name from the body', () => {
  // Mock ExpressJS 'req' and 'res' parameters
  const name = uuid.v4()
  const req = {
    body: { name: name },
    query: {}
  }
  const res = {send: sinon.stub()}

  // Call tested function
  helloHttp(req, res)

  // Verify behavior of tested function
  assert.ok(res.send.calledOnce)
  assert.deepStrictEqual(res.send.firstCall.args, [`Hello, ${name}!`])
})

it('helloHttp: should print the default name', () => {
  // Mock ExpressJS 'req' and 'res' parameters
  const req = {
    body: {},
    query: {}
  }
  const res = {send: sinon.stub()}

  // Call tested function
  helloHttp(req, res)

  // Verify behavior of tested function
  assert.ok(res.send.calledOnce)
  assert.deepStrictEqual(res.send.firstCall.args, ['Hello, World!'])
})
