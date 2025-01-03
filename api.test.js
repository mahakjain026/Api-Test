// test.js

const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const request = supertest('https://jsonplaceholder.typicode.com');

describe('API Tests for JSONPlaceholder Posts Endpoint', function() {

  // Test Case 1: Validate Successful Response (200 OK)
  it('should return 200 OK for a valid GET request', async function() {
    const response = await request.get('/posts');
    expect(response.status).to.equal(200);
  });

  // Test Case 2: Validate Response Body Structure
  it('should have the correct fields in the response body', async function() {
    const response = await request.get('/posts');
    expect(response.body[0]).to.have.all.keys('userId', 'id', 'title', 'body');
  });

  // Test Case 3: Handle Unauthorized Error (adjusted)
  it('should return 200 OK for invalid token', async function() {
    const response = await request.get('/posts').set('Authorization', 'Bearer invalid-token');
    expect(response.status).to.equal(200); // JSONPlaceholder returns 200 even with an invalid token
  });

  // Test Case 4: Validate Data Types in Response
  it('should check correct data types in response body', async function() {
    const response = await request.get('/posts');
    expect(response.body[0].userId).to.be.a('number');
    expect(response.body[0].id).to.be.a('number');
    expect(response.body[0].title).to.be.a('string');
    expect(response.body[0].body).to.be.a('string');
  });

  // Test Case 5: Handle Bad Request (adjusted)
  it('should return a valid response for missing parameters', async function() {
    const response = await request.get('/posts?invalid=param');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array'); // Expect an empty array or a default response
  });

  // Test Case 6: Boundary Test for Large Payload (adjusted)
  it('should return the response in a reasonable amount of time for large payload', async function() {
    const start = Date.now();
    const response = await request.get('/posts');
    const end = Date.now();

    expect(response.status).to.equal(200);
    expect(response.body.length).to.be.above(0); // Ensure the response is not empty
    expect(end - start).to.be.below(1000);  // Ensure response time is less than 1 second
  });

});
