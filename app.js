//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
var passwordValidator = require('password-validator');
const flash = require("connect-flash");
const session = require("express-session");
const ejs = require("ejs");
const {
  strictEqual
} = require('assert');
const dotenv = require('dotenv').config()



var passport = require("passport");
var engines = require('consolidate');
const {
  connect
} = require('http2');
const {
  builtinModules
} = require('module');
const cons = require('consolidate');



//data base models :
const User = require('./db/models/User.js').User;

const uMessage = require('./db/models/messages.js').uMessage;

const Appointment = require('./db/models/appointments.js').Appointment;

const BloodTests = require('./db/models/bloodtestSchema.js').BloodTests;

const tds = require('./db/models/td.js').tds;



const app = express();
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(flash());

var LoggedInUser;


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());







app.get('/Patient', function (req, res) {

  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
  User.find({}, function (err, users) {
    tds.find({}, function (err, treat) {
    res.render('Patient.ejs', {
      p: req.session.user,
      userslist: users,
      bloodtest: tests,
      t: treat 

    });
  });
  });
});

app.get('/PatientTestValues', function (req, res) {

  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
  User.find({}, function (err, users) {
    BloodTests.find({}, function (err, bloodtest) {
    res.render('PatientTestValues.ejs', {
      p: req.session.user,
      userslist: users,
      blood: bloodtest
      })
    });


  });

});

var tests=[];

app.get('/Doctor', function (req, res) {
  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
  let doctor;

  User.find({}, function (err, users) {

    uMessage.find({}, function (err, message) {
      BloodTests.find({}, function (err, bloodtest) {
        Appointment.find({}, function (err, appointmenta) {
          tds.find({}, function (err, treat) {
          res.render('Doctor.ejs', {
            doctor: req.session.user,
            patientslist: users,
            messagess: message,
            blood: bloodtest,
            appointmentss: appointmenta,
            t: treat 
          });
        });
        })
      })
    })

  });
});
app.get('/Examinator', function (req, res) {
  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
  res.render('Examinator', {
    p: req.session.user
  });
});


app.get('/', function (req, res) {
  res.render('Home.html');
  
});
app.get('/Sign-Up', function (req, res) {
  res.render('Sign-Up.ejs');
});


app.get('/Sign-Up_As_Doctor', function (req, res) {
  res.render('Sign-Up_As_Doctor.html');
});
app.get('/Sign-Up_As_Examinator', function (req, res) {
  res.render('Sign-Up_As_Examinator.html');
});
app.get('/Sign-Up_As_Patient', function (req, res) {
  res.render('Sign-Up_As_Patient.html');
});
app.get('/Home', function (req, res) {
  res.render('Home.html');
});
app.get('/Log-in', function (req, res) {
  res.render('Log-In.html');
 
});

app.get('/ForgotPW', function (req, res) {
  res.render('ForgotPW.html');
});
app.get('/Examinator', function (req, res) {
  res.render('Examinator.ejs');
});

app.get('/BloodTestValues', function (req, res) {
  res.render('BloodTestValues.ejs');
});

app.get('/EditDoctor', function (req, res) {
  res.render('EditDoctor.ejs');
});

app.get('/td', function (req, res) {
  
  res.render('td.ejs',{
    p: req.body.ttdd,
    p1: req.body.user

  })
});


app.get('/PatientListExaminator', function (req, res) {
  console.log("************************");
  console.log(LoggedInUser);
  console.log("************************");
  let examinator;

  User.find({}, function (err, users) {

    uMessage.find({}, function (err, message) {
      BloodTests.find({}, function (err, bloodtest) {
        Appointment.find({}, function (err, appointmenta) {
          res.render('PatientListExaminator.ejs', {
            examinator: req.session.user,
            patientslist: users,
            messagess: message,
            blood: bloodtest,
            appointmentss: appointmenta
          });
        })
      })
    })

  });
});

/*app.get('/PatientInfo', function (req, res) {
  res.render('PatientInfo', {
    p: req.session.user
  })
});*/
/*
app.get('/PatientInfo/:id', function (req, res) {

  console.log("inside the get request")
  console.log(req.body);
  console.log(req.params);

  res.render('PatientInfo', {
    p: req.params.id
  })
  
  
});
*/

app.post('/PatientInfo/:id', function (req, res) {

  console.log("inside the post request")
  const PublicPatient=null;
  

  User.findOne({
    id: req.params.id,

  }, function (err, user) {
    if (err) {

      res.json({
        error: err
      })
    }
    if (user) {
      console.log("inside user found")
     
      BloodTests.find({id:user.id},function(err,bld){
        if(err){
          res.json({
            error:err
          })
        }
          if(bld){
            console.log("inside user blood test found")
            tds.find({id:user.id},function(err,tre){
              if(err){
                res.json({
                  error:err
                })
              }
                if(tre){
                  console.log("inside treatment found")

                  res.render('PatientInfo.ejs',{patient:user,bldtlist:bld,treatments:tre});

                }
              }
            )
          }
        

      })

     
        


    } 
  });


  
  

});



var passwordschema = new passwordValidator();

passwordschema
  .is().max(15)
  .is().min(7)
  .has().uppercase()
  .has().not().spaces()
  .has().digits(2);

app.post('/BloodTestValues', function (req, res) {

  let test = new BloodTests({
    id: req.body.id,
    age: req.body.age,
    wbc: req.body.wbc,
    neut: req.body.neut,
    lymph: req.body.lymph,
    rbc: req.body.rbc,
    hct: req.body.hct,
    urea: req.body.urea,
    hb: req.body.hb,
    creatine: req.body.creatine,
    iron: req.body.iron,
    ap: req.body.ap
  });
  console.log("blood test enterd");
  tests.push(req.body.id);
  console.log(tests);
  test.save(function (err) {
    if (!err) {

      console.log(test);
      return res.redirect('/Examinator');
    }
  });

});

function assignelements(b){
  return b
}

app.post('/Sign-Up', (req, res) => {


  try {

    let users = new User({
      role: req.body.role,
      FirstName: req.body.Fname,
      LastName: req.body.Lname,
      id: req.body.id,
      password: req.body.password,
      email: req.body.email,
      Gender: req.body.gender,
      Age: req.body.age,
      Phone: req.body.Phone,
      Birthdate: req.body.birthdate,
      Specialist: req.body.Specialist,
      Diseases:req.body.Diseases,
      Treatment:req.body.Treatment
    });



    User.findOne({
      id: req.body.id,

    }, function (err, user) {
      if (err) {

        res.json({
          error: err
        })
      }
      if (!user) {

        if (passwordschema.validate(req.body.password) && (req.body.password === req.body.pasword)) {

          users.save(function (err) {
            if (!err) {

              console.log(user);
              return res.redirect('/Log-In');
            }
          });



        } else {
          return res.redirect("/Sign-Up");
        };

      } else {
        console.log("the user is already exist!");
        return res.redirect("/Sign-Up");
      }
    });
  } catch {

    return res.redirect("/Sign-Up");

  }

});

app.post('/td',async (req,res) => {
  try {

    let td = new tds({
      id: req.body.id,
      Diseases:req.body.Diseases,
      Treatment:req.body.Treatment
    });
    
    td.save(function (err) {
      if (!err) {
  
        console.log(td);
        return res.redirect('/Doctor');
      }
    });
  }catch{
    return res.redirect('/Doctor');
  }
});




app.post('/DoctorMessage', async (req, res) => {

  try {
    var message

    console.log("delete message id ");
    console.log(req.body.Messageidentity);
    await uMessage.deleteOne({
      _id: req.body.Messageidentity
    });
    console.log("Message deleted successfully ");
    return res.redirect("/Doctor");
  } catch {
    console.log("failed to delete the mesasge");
    return res.redirect("/Doctor");

  }
});

app.post('/DeleteAppoitment', async (req, res) => {
  

  try {
    var message

    console.log("delete appointment ");
    console.log("|" + req.body.doctordel + "|");
    Appointment.deleteOne({
      patient: req.body.sender,
      doctor: req.body.doctordel
    }, function (err, successfully) {
      if (err) {
        console.log("function failed");
      } else {
        console.log("function success");
      }

    });
    return res.redirect("/Doctor");
  } catch {

    return res.redirect("/Doctor");

  }
});

/*
app.post('/PatientProfile', async (req, res) => {
  

  try {
    

    console.log("Patient Profile " + req.body.userprofile_id);
    
    return res.redirect("/Doctor");
  } catch {

    return res.redirect("/Doctor");

  }
});

*/
app.post('/Log-In', (req, res) => {
 
  try {
    var password = req.body.Password;
    User.findOne({
      id: req.body.id,

    }, function (err, user) {
      if (err) { // user doesn't exist
        res.json({
          error: err
        })
      }
      if (user) { //user exist
        
        

        if (req.body.Password === user.password) {
          console.log(user);
          LoggedInUser = user.FirstName;
          console.log("\n inside the login\n");


          req.session.user = user;
          
          if (user.role === "Doctor") {


            console.log("doctor login");
            return res.redirect(302,"/Doctor");
          } else if (user.role === "Examinator") {
            return res.redirect("/Examinator");
          } else {
            return res.redirect("/Patient");
          }
        } else {
          return res.redirect("/Log-In");
        }
      } else {
        return res.redirect("/Log-In");
      }
    });
  } catch {
    return res.redirect(500,"/Log-In");

  }
});





app.post('/Patient', (req, res) => {

  console.log("inside patient post");

  var date = new Date();
  let newmessage = new uMessage({
    sender: req.body.sender,
    reciever: req.body.doctorid,
    Subject: req.body.Subject,
    Mbody: req.body.Message,
    sent: date
    

  });
  console.log(newmessage)


  try {
    uMessage.findOne({
      _id: req.body.id,

    }, async function (err, msg) {
      if (err) {

        res.json({
          error: err
        })
      }
      if (!msg) {


        await newmessage.save(function (err) {
          if (!err) {

            console.log(newmessage);
            return res.redirect('/Patient');
          }
        });




      }
    });

  } catch (err) {
    //logger.error('Mongo error', err);
    return res.sendStatus(500);
  }



  console.log("message sent");



});



app.post('/ForgotPW', function (req, res) {
  var password = req.body.Password;

  User.findOne({
    id: req.body.id,

  }, function (err, user) {
    if (err) { // user doesn't exist
      res.json({
        error: err
      })
    }
    if (user) { //user exist

      console.log(user);

      if (req.body.id == user.id && req.body.email == user.email) {

        if (req.body.newpass === req.body.confnewpass) {

          User.updateOne({
            id: user.id
          }, {
            password: req.body.newpass
          }, function (err, reas) {
            if (err) {
              console.log("couldn't change password");
            } else {
              console.log("password changed successfully");
              return res.redirect("/Log-In");
            }
          });


        } else {
          console.log("passwords doesn't match");
        }




      } else {
        console.log("email and password doesn't match ");
        return res.redirect("/ForgotPW");
      }
    } else {
      console.log("user doesn't exist");
      return res.redirect("/ForgotPW");
    }
  });
});


app.post('/EditDoctor', function (req, res) {
  var special = req.body.Specialist;

  User.findOne({
    id: req.body.id,

  }, function (err, user) {
    if (err) { // user doesn't exist
      res.json({
        error: err
      })
    }
    if (user) { //user exist

      console.log(user);

      if (req.body.id == user.id) {

        User.updateOne({
          id: user.id
        }, {
          Specialist: req.body.Specialist
        }, function (err, reas) {
          if (err) {
            console.log("couldn't change Speciality");
          } else {
            console.log("Speciality changed successfully");
            return res.redirect("/Log-In.html");
          }
        });

      }
    }
  });




  User.updateOne({ id: user.id }, { Specialist: req.body.Specialist }, function(err, reas) {
    if(err){
      console.log("couldn't change Speciality");
    }
    else{
      console.log("Speciality changed successfully");
      return  res.redirect("/Log-in"); 
    }
  });

});

app.post('/Appointment', async (req, res) => {

  let newappointment = new Appointment({
    patient: req.body.sender,
    doctor: req.body.doctorid,
    Date: req.body.datepicked
  });



 
  try {
    Appointment.findOne({
      patient: req.body.sender,
      doctor: req.body.doctorid,
      Date: req.body.datepicked
    }, function (err, appointmentt) {
      if (err) {

        res.json({
          error: err
        })
      }
      if (!appointmentt) {


        newappointment.save(function (err) {
          if (!err) {
            console.log("appointment set");

            console.log(newappointment);
            return res.redirect('/Patient');
          }
        });



      } else {
        console.log("appopintment already exist");
        return res.redirect('/Patient');

      }
    });

  } catch (err) {


    
  }


});



module.exports = app;
