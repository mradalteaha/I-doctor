var request = require('supertest');
const assert = require('assert');
var app = require('./app.js');
const mongoose = require('mongoose');

jest.useFakeTimers();


//1

describe('Check if the routes goes to login page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Log-In');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
});
//2
describe('Check if the routes goes to register page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Sign-Up');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
});

//3

describe('Check if the routes goes to Home page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Home');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
});

//4
describe('Check if the routes goes to Sign Up As Patient!', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/Sign-Up_As_Patient');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});

//5
describe('Check if the routes goes to Sign Up As Examinator!', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/Sign-Up_As_Examinator');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});

//6
describe('Check if the routes goes to Sign Up As Doctor!', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/Sign-Up_As_Doctor');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});

//7
describe('Check if the routes goes to ForgotPW', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/ForgotPW');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});


//8
describe('Check if the routes goes to BloodTestValues', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/BloodTestValues');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});

//9

describe('Check if the routes goes to EditDoctor', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/EditDoctor');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});


//10

describe('should respond with redirect on post to login', function () {

  it('should respond with redirect on post', function(done) {
    request(app)
      .post('/Log-In')
      .send({"id":"123123123"},{"Password":"Abedd13"});
      console.log(request(app).body)
      expect(302)
      expect('Content-Type', 'text/plain; charset=utf-8')
      end(function(err, res) {
        if (err) {done(err);
          console.log("error in post")}
         });
      done();
  });
});

