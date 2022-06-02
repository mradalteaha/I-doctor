const app = require("./app.js");
const db = require ('./db/database.js');

const port = process.env.PORT || 3000;


const server = app.listen(port,()=>{
    console.log("Starting Server port 3000");
    db.connect();
});
module.exports = server;