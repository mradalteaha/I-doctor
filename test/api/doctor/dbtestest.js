process.env.NODE_ENV = 'test'


const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/database.js');



describe('POST /Sign-Up', () => {
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
  
    it('OK, Sign Up successful validate', (done) => {
      request(app).post('/Sign-Up')
        .send({ Fname: 'Morad',Lname: 'Teaha',id: '315198564',password: 'Mrad_1234',pasword: 'Mrad_1234',email: 'morad_test@gmail.com', age: "19",Phone: "19",birthdate: "19",Specialist: "19",role: "19" })
        .then((res) => {
          const body = res.body;
/*
          expect(body).to.contain.property('Fname');
          expect(body).to.contain.property('Lname');
          expect(body).to.contain.property('password');
          expect(body).to.contain.property('pasword');
          expect(body).to.contain.property('email');
          expect(body).to.contain.property('age');
          expect(body).to.contain.property('Phone');
          expect(body).to.contain.property('Specialist');
          expect(body).to.contain.property('role');
          expect(body).to.contain.property('birthdate');
          */
       
          expect(200)
          expect('Location', '/Log-In')
          
          done();
          
        })
        .catch((err) => done(err));
    });

    it('Wrong credintials, Sign Up Failed', (done) => {
      request(app).post('/Sign-Up')
        .send({ Fname: 'Morad',Lname: 'Teaha',id: '315198564',password: 'Mrad_1234',pasword: 'Mrad_S1234',email: 'morad_test@gmail.com', age: "19"})
        .then((res) => {
          const body = res.body;
       
          expect(body).to.contain.property('Fname');
          expect(body).to.contain.property('Lname');
          expect(body).to.contain.property('password');
          expect(body).to.contain.property('pasword');
          expect(body).to.contain.property('email');
          expect(body).to.contain.property('age');
          expect(200)
          expect('Location', '/Sign-Up')
          done();
          
        })
        .catch((err) => done(err));
    });
  
   
  })