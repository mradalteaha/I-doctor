var request = require('supertest');
const assert = require('assert');
var app = require('./app.js');



describe('Good Home Routes', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/Log-in');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
    });
});
