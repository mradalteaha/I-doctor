var request = require('supertest');
const assert = require('assert');
var app = require('./app.js');



describe('Good Home Routes to login page', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Log-In');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });

});

describe('Good Home Routes to home page', function () {
    test('responds to /', async () => {
        const res = await request(app).get('/Home');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
});

describe('Good Home Routes to Register page', function () {
    test('responds to /', async () => {
        const res = await request(app).get('/Sign-Up');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
});


describe('Good Home Routes to Examinator page', function () {
    test('responds to /', async () => {
        const res = await request(app).get('/Examinator');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(500);
    });
});


describe('Good Home Routes to Forgot password', function () {
    test('responds to /', async () => {
        const res = await request(app).get('/ForgotPW');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
});