const mongoose = require("mongoose");

//connecting
main().catch(err => console.log("database err"+err));
async function main(){
 
  let url = process.env.MONGO_SERVER_URL;
 // let url = '';
   await mongoose.connect(`${url}`);
  }

 // connect to DB
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));
 
// up and running then print the message
db.once('open',function(){
  console.log('Succesfully connected to the MONGODB database');
 
});
