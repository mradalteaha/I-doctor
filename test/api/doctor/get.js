var request = require('supertest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const app = require('../../../app.js');
const conn = require('../../../db/database.js');

let server = require('../../../server.js');
var expect = chai.expect;
chai.use(chaiHttp);


var test = require('mocha').test;




//1

describe('Check if the routes goes to login page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Log-In');
      expect(res.should.have.status(500));
    });
});
//2

describe('Check if the routes goes to register page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Sign-Up');
     expect(res.should.have.status(500));
    });
});

//3

describe('Check if the routes goes to Home page!', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Home');
     expect(res.should.have.status(500));
    });
});

//4
describe('Check if the routes goes to Sign Up As Patient!', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/Sign-Up_As_Patient');
   expect(res.should.have.status(500));
  });
});

//5
describe('Check if the routes goes to Sign Up As Examinator!', function () {

  test('responds to /', async () => {
  expect(res.should.have.status(500));
  });
});

//6
describe('Check if the routes goes to Sign Up As Doctor!', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/Sign-Up_As_Doctor');
   expect(res.should.have.status(500));
  });
});

//7
describe('Check if the routes goes to ForgotPW', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/ForgotPW');
    expect(res.should.have.status(500));
  });
});


//8
describe('Check if the routes goes to BloodTestValues', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/BloodTestValues');
   expect(res.should.have.status(500));
  });
});

//9

describe('Check if the routes goes to EditDoctor', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/EditDoctor');
    expect(res.should.have.status(500));
  });
});



