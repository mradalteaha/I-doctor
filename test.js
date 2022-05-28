var request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
var apps = require('./app.js');
var app = apps[0];
var User = apps[1];
var uMessage = apps[2];

const { setupDB } = require("./test_setup.js");

// Setup a Test Database
setupDB();


describe('Check if the routes goes to login page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Log-In');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
});

describe('Check if the routes goes to register page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Sign-Up');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
});

describe('Check if the routes goes to Home page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Home');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
});
describe('Check if the routes goes to Sign Up As Patient!', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/Sign-Up_As_Patient');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});

describe('Check if the routes goes to Sign Up As Examinator!', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/Sign-Up_As_Examinator');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});

describe('Check if the routes goes to Sign Up As Doctor!', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/Sign-Up_As_Doctor');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(404);
  });
});

describe('Check if the routes goes to ForgotPW', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/ForgotPW');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});

describe('Check if the routes goes to BloodTestValues', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/BloodTestValues');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});

describe('Check if the routes goes to EditDoctor', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/EditDoctor');
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });
});


var users = [
  {
    role: "123",
    FirstName: "123",
    LastName: "123",
    id: "123",
    password: "123",
    email: "123",
    Gender: "123",
    Age: "123",
    Phone: "123",
    Birthdate: "123",
    Specialist: "123"
  },
  {
    role: "123",
    FirstName: "123",
    LastName: "123",
    id: "123123",
    password: "123",
    email: "123",
    Gender: "123",
    Age: "123",
    Phone: "123",
    Birthdate: "123",
    Specialist: "123"
  }
]


describe('Post stamm',function(){
  test('responds to baed /', async () => {
      for(const u of users){
        const user = new User(u);
        await user.save();
      }
  });
})