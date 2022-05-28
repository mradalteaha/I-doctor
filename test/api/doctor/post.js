//jshint esversion:6
process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/database.js');



describe('POST /Log-in', () => {
    before((done) => {
      conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    })
  
    after((done) => {
      conn.close()
        .then(() => done())
        .catch((err) => done(err));
    })
  
    it('OK, Login successful validate', (done) => {
      request(app).post('/Log-In')
        .send({ id: '315198564', Password: "Mrad_1999" })
        .then((res) => {
          const body = res.body;
          expect(body).to.contain.property('_id');
          expect(body).to.contain.property('role');
          expect(body).to.contain.property('FirstName');
          expect(body).to.contain.property('LastName');
          expect(body).to.contain.property('id');
          expect(body).to.contain.property('password');
          expect(body).to.contain.property('email');
          expect(body).to.contain.property('Gender');
          expect(body).to.contain.property('Age');
          done();
        })
        .catch((err) => done(err));
    });
  
   
  })