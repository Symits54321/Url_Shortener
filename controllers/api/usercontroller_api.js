const userModel = require('../../models/user_model');
const shortUrlModel = require('../../models/shorturl_model');


// to view all list of products
module.exports.registration = async function (req, res) {

    console.log("Registration req is");
    console.log(req.query);

  
    try {

        //create
        let newUser = await userModel.create({
            username:req.query.username,
            password:req.query.password
        }); 
         
        
        return res.status(200).json({

            message: 'registration succesfull'
           
          });


    }catch (error) {

        console.error('Error in registration:', error);
        res.status(500).send('Error in registration ');

    }

}