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

    if(oldUser.length>0){

        console.log("already registered ");

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

        console.log("registration succesfull");

            return res.status(200).json({

                        message: 'registration succesfull',
                        data:newUser
                    
                    });


        }else{

            console.log("registration Unsuccesfull");

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
            // // checking user in db
            // let user = await userModel.find({
            //     username:req.query.username,
            //     password:req.query.password
            // });
   

    // if registered
    //  if (user.length>0){
    if (req.isAuthenticated()){
        //setting cookie
       // res.cookie('urlshortener_user_id',user._id);
       console.log("login success ");

            return res.status(200).json({

                message: 'login successfull',
                
            
            });

        }else{
            
            console.log("login failed ");

            res.status(500).json({

                message: 'login Unsuccesfull , please register',
                
            }); 
        }

        
    } catch (error) {
        console.log("login error");
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
       // res.cookie('urlshortener_user_id',user._id);
       if (req.isAuthenticated()){
     //if(req.cookies.urlshortener_user_id){

          // await res.clearCookie('urlshortener_user_id');

           req.logout();
           console.log("logout successfull");
                return res.status(200).json({

                    message: 'logout successfull',
                   
                
                }); 


      }else{
        console.log("logout unsuccessfull");

        return res.status(500).json({

            message: 'logout unsuccessfull because you didnot logged in',
            
        }); 

      }  
       
    } catch (error) {

        console.error('Error in logout:', error);

        res.status(500).json({

            message: 'logout Unsuccesfull / error / not (register / login)',      
            advice:'please (register / login) / use the correct url',     
            error:error
        }); 
        
    }

}


module.exports.error = async function (req, res) {

    try {
        console.log("error message");
        return res.status(500).json({

            message: 'Invalid username/password',
            advice:'please (register / login) / use the correct url'
            
        });

    } catch (error) {

        console.log("error in error message");

        return res.status(500).json({

            message: 'Invalid username/password',
            advice:'please (register / login) / use the correct url',
            error:error
            
        });
        
    }
}