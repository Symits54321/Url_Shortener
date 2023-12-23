const userModel = require('../../models/user_model');  //model that keeps user data
const shortUrlModel = require('../../models/shorturl_model'); // model that stores short url

const crypto = require('crypto');   // using crypto for making hashcode (already in Node.js)



// longurlshort function (takes 'url' and returns 'hashcode' of length 6 ) //CONVERTER

    async function longurlshort(url){

        const md5Hash = await crypto.createHash('md5');       
        const randomPart = await Math.random().toString(36).substring(2, 6); // on every call it gives random string
        
            md5Hash.update(url + randomPart); 
        
            let hashcode = md5Hash.digest('hex');
                hashcode = hashcode.substring(0, 6)   // making small hashcode
    
       // if same hashcode mathes in db then re-run to get new hashcode

                let samehashcode = await shortUrlModel.find({   
                            hashcode:hashcode
                        }); 

                if(samehashcode>0){
                        return  longurlshort(url);    // a recusrive re run call
                    }

      return hashcode;
    
    }





//shorten function manages saving shorturl 
module.exports.shorten = async function (req, res) {
   
             
    try {

        // check if logged in 
       
        if (req.isAuthenticated()){



                                            //if (req.cookies && req.cookies.urlshortener_user_id){
                    let userId= req.user._id.toString();
                    let longurl = await req.params.url;  



                    
            //if longurl present in db then return shorturl from db

                    let samelongurl = await shortUrlModel.find({   
                        longurl:longurl
                    });
                
                if(samelongurl.length>0){

                    return res.status(200).json({

                        message: 'shorten url already made earlier',
                        data:samelongurl[0]
                    
                    });
                }
                
                    

                    const hashcode = await longurlshort(longurl);

                
                

                    //adding useurl to ahort url

                    const shorturl = "https://urlshortener-kizj.onrender.com/useurl/"+hashcode;

                    //save in db

                    console.log({
                        user:userId,
                        longurl:longurl,
                        hashcode:hashcode,
                        shorturl:shorturl
                    });

                    let newurldata = await shortUrlModel.create({
                        user:userId,
                        longurl:longurl,
                        hashcode:hashcode,
                        shorturl:shorturl

                    }); 

                    let shorturldata = await newurldata.populate('user'); 

                    return res.status(200).json({

                        message: 'shorten url  succesfull',
                        data:shorturldata
                    
                    });

    // if notlooged then please login
        }else{

            res.status(200).json({

                message: 'please login',
                
            }); 
        }

        


   // shortening error     
    } catch (error) {

        res.status(500).json({

            message: 'please login / shorten error',
            error:error
            
        }); 
    }

}


// redirect shorturl to longurl
module.exports.redirectUrl = async function (req, res) {

    try {

        let hashcode = await req.params.hashcode;

        //find in db

        let foundurl = await shortUrlModel.find({         
            hashcode:hashcode          
        }); 
        
        console.log(foundurl);
        //if present then redirect
        if (foundurl.length==1){

            let longurl=foundurl[0].longurl;

            // res.status(200).json({
            //     message:'found',
            //     url:longurl
            // })

            //res.redirect(longurl);
            //res.redirect(`https://${longurl}`);
            if (longurl.startsWith('http://') || longurl.startsWith('https://')) {
                res.redirect(longurl); // Redirect directly if 'http://' or 'https://' is present
              } else {
                // Redirect by adding 'https://' to the URL (defaulting to HTTPS)
                res.redirect(`https://${longurl}`);
              }

        }else{ 
            //else say no such url present

            
            res.status(200).json({
                message:'not found such url',
                advice:"please check your url"
            })



        }
       
        
    } catch (error) {

        res.status(200).json({
            message:'not found such url',
            advice:"please check your url"
        })
        
    }

}