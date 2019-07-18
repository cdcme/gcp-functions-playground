'use strict'

const assert = require('assert')
const Supertest = require('supertest')
const supertest = Supertest(process.env.BASE_URL)

it('helloHttp: should print a name', async () => {
  await supertest
    .post('/helloHttp')
    .send({name: 'John'})
    .expect(200)
    .expect(response => {
      assert.strictEqual(response.text, 'Hello, John!')
    })
})

it('helloHttp: should print hello world', async () => {
  await supertest
    .get('/helloHttp')
    .expect(200)
    .expect(response => {
      assert.strictEqual(response.text, 'Hello, World!')
    })
})
