const userModel = require('../../models/user_model');
const shortUrlModel = require('../../models/shorturl_model');

//urlshortener
const crypto = require('crypto');

async function longurlshort(url){

  const md5Hash = await crypto.createHash('md5');
 
  const randomPart = await Math.random().toString(36).substring(2, 6);
   
    md5Hash.update(url + randomPart); 
   
    let newshorturl= await md5Hash.digest('hex');

 newshorturl= await newshorturl.substring(0, 6)
 

  return newshorturl;
  
}

//shorten
module.exports.shorten = async function (req, res) {
   
    //
   

    

    try {
       
        
        if (req.cookies && req.cookies.urlshortener_user_id){

            const longurl = await req.params.url;
            const shorturl = await longurlshort(longurl);

            return res.status(200).json({

                message: 'shorten url  succesfull',
                data:{
                    longurl:longurl,
                    shorturl:shorturl
                }
            
            });


        }else{

            res.status(500).json({

                message: 'please login',
                
            }); 
        }

        


        
    } catch (error) {
        res.status(500).json({

            message: 'please login / shorten error',
            error:error
            
        }); 
    }

}