const userModel = require('../../models/user_model');
const shortUrlModel = require('../../models/shorturl_model');


//shorten
module.exports.shorten = async function (req, res) {
   
    //
    try {
        
        if (req.cookies && req.cookies.urlshortener_user_id){


            return res.status(200).json({

                message: 'shorten url  succesfull',
                data:"www.google.com"
            
            });


        }else{

            res.status(500).json({

                message: 'please login',
                
            }); 
        }

        


        
    } catch (error) {
        
    }

}