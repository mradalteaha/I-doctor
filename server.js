const app = require("./app.js");
const db = require ('./db/database.js');



db.connect()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Starting Server port 3000");
    });
});

