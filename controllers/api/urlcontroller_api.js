const userModel = require('../../models/user_model');
const shortUrlModel = require('../../models/shorturl_model');





//urlshortener function
const crypto = require('crypto');

    async function longurlshort(url){

        const md5Hash = await crypto.createHash('md5');
        
        const randomPart = await Math.random().toString(36).substring(2, 6);
        
            md5Hash.update(url + randomPart); 
        
            let hashcode=  md5Hash.digest('hex');

        hashcode=  hashcode.substring(0, 6)
    
 // if same hashcode mathes in db then re-run 
      return hashcode;
    
    }





//shorten
module.exports.shorten = async function (req, res) {
   
             
    try {
       
        if (req.isAuthenticated()){
      //if (req.cookies && req.cookies.urlshortener_user_id){
            let userId= req.user._id.toString();
            let longurl = await req.params.url;
            const hashcode = await longurlshort(longurl);

        
            //if present same longurl then then show short url from db
            

            //adding useurl to ahort url

            const shorturl = "localhost:9000/useurl/"+hashcode;

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
            res.redirect(`https://${longurl}`);

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