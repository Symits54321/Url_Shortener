const userModel = require('../../models/user_model');
const shortUrlModel = require('../../models/shorturl_model');


// registration
module.exports.registration = async function (req, res) {

    console.log("Registration req is");
    console.log(req.query);

  
    try {
        
        // check if exists
        let oldUser = await userModel.find({
            username:req.query.username,
            password:req.query.password
        });

    if(oldUser){

            return res.status(200).json({

                        message: 'Already registered, please login',
                        data:oldUser
                    
                    }); 
             }  



        //create
        let newUser = await userModel.create({
            username:req.query.username,
            password:req.query.password
        }); 
         
    if(newUser){

            return res.status(200).json({

                        message: 'registration succesfull',
                        data:newUser
                    
                    });


        }else{

            return res.status(500).json({

                message: 'registration Unsuccesfull',
                data:req.query
            
            }); 
        }
       

    }catch (error) {

        console.error('Error in registration:', error);
        res.status(500).json({

            message: 'registration Unsuccesfull',
            wrongurl:`/user${req.url}`,
            advice:'please use the correct url, example given below',
            correcturlexample: '/user/registration/?username=abcd&password=12345',
            error:error
        }); 
    }

}

// login
module.exports.login = async function (req, res) {

    try {

            let user = await userModel.find({
                username:req.query.username,
                password:req.query.password
            });


    // if registered
     if (user.username){
            return res.status(200).json({

                message: 'login successfull',
                data:user
            
            });

        }else{

            res.status(500).json({

                message: 'login Unsuccesfull , please register',
                
            }); 
        }
        
    } catch (error) {

          console.error('Error in login:', error);
          res.status(500).json({

            message: 'login Unsuccesfull /error',
            wrongurl:`/user${req.url}`,
            advice:'please register / use the correct url, example given below',
            correcturlexample: '/user/login/?username=abcd&password=12345',
            error:error
        }); 
    }

}