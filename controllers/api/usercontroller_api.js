const userModel = require('../../models/user_model');
const shortUrlModel = require('../../models/shorturl_model');


// registration
module.exports.registration = async function (req, res) {

    console.log("Registration req is");
    console.log(req.query);

  
    try {
        
      // check if registration exists

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



        //create new user / register

        let newUser = await userModel.create({
            username:req.query.username,
            password:req.query.password
        }); 



    // if registration succesfull 
         
    if(newUser.length>0){

            return res.status(200).json({

                        message: 'registration succesfull',
                        data:newUser
                    
                    });

    // if registration unsuccessfull 

        }else{

            return res.status(500).json({

                message: 'registration Unsuccesfull',
                data:req.query,
                advice:'please use the correct url, example given below',
                correcturlexample: '/user/registration/?username=abcd&password=12345'
            
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
         
    if (req.isAuthenticated()){
      

            return res.status(200).json({

                message: 'login successfull',
                
            
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








// logout
module.exports.logout = async function (req, res) {

    try {
     
       if (req.isAuthenticated()){
    

          //             req.logout();

          req.logout(function(err) {
            if (err) {
                 //return next(err); }
                 res.status(500).json({

                    message: 'logout error '
                 })}
            res.redirect('/login');
          });

                return res.status(200).json({

                    message: 'logout successfull',
                   
                
                }); 


      }else{

        return res.status(200).json({

            message: 'logout unsuccessfull because you didnot logged in',
            
        }); 

      }  
       
    } catch (error) {

        console.error('Error in logot:', error);
        res.status(500).json({

          message: 'logout Unsuccesfull / error / not (register / login)',     
          advice:'please (register / login) / use the correct url',     
          error:error
      }); 
        
    }

}





// if failed in authentication 
module.exports.errormsg = async function (req, res) {

    try {
        return res.status(500).json({

            message: 'Invalid Username/Password  /Please LOGIN / REGISTER ',
            advice:'please (register / login) / use the correct url'
            
        });

    } catch (error) {

        console.log("error in error function")
        console.log(error);
    }
}