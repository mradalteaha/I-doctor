// process.env.NODE_ENV = 'test'


// const expect = require('chai').expect;
// const request = require('supertest');

// const app = require('../../../app.js');
// const conn = require('../../../db/database.js');



// describe('POST /Sign-Up', () => {
//     before((done) => {
//       conn.connect()
//         .then(() => done())
//         .catch((err) => done(err));
//     })
  
//     after((done) => {
//       conn.close()
//         .then(() => done())
//         .catch((err) => done(err));
//     })
  
//     it('OK, Sign Up successful validate', (done) => {
//       request(app).post('/Patient')
//         .send({ doctorid: '123123123',Subject: 'Test',sender: '234234234',Message: 'Mrad_1234'})
//         .then((res) => {
          
        
       
//           expect(200)
//           expect('Location', '/Patient')
          
//           done();
          
//         })
//         .catch((err) => done(err));
//     });

   
  
   
//   })
  