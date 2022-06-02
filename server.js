const app = require("./app.js");
const db = require ('./db/database.js');

const port = process.env.port || 3000;

db.connect();

const server = app.listen(port,()=>{
    console.log("Starting Server port 3000");
});
module.exports = server;