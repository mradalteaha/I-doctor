//jshint esversion:6

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
       
          expect(302)
          expect('Location', '/Doctor')
          done();
          
        })
        .catch((err) => done(err));
    });

    it('Wrong credintials, Login Failed', (done) => {
      request(app).post('/Log-In')
        .send({ id: '315198564', Password: "Mrad_19999" })
        .then((res) => {
          const body = res.body;
       
          expect(500)
          expect('Location', '/Log-In')
          done();
          
        })
        .catch((err) => done(err));
    });
  
   
  })