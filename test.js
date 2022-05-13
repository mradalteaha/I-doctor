var request = require('supertest');
const assert = require('assert');
var app = require('./app.js');



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


// describe('Check if the routes goes to forgot password page!', function () {

//     test('responds to /', async () => {
//       const res = await request(app).get('/ForgotPW');
//       expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//       expect(res.statusCode).toBe(200);
//     });
// });

// describe('Check if the routes goes to patient page!', function () {

//     test('responds to /', async () => {
//       const res = await request(app).get('/Patient');
//       expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//       expect(res.statusCode).toBe(500);
//     });
// });

// describe('Check if the routes goes to Examinator page!', function () {

//     test('responds to /', async () => {
//       const res = await request(app).get('/Examinator');
//       expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//       expect(res.statusCode).toBe(500);
//     });
// });

// describe('Check if the routes goes to Doctor page!', function () {

//     test('responds to /', async () => {
//       const res = await request(app).get('/Doctor');
//       expect(res.header['content-type']).toBe('text/html; charset=utf-8');
//       expect(res.statusCode).toBe(500);
//     });
// });
