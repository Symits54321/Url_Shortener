Welcome to Url_Shortener API (use postman to test or generate shorturl)


   Description :- This api is used to convert the long urls to shorter ones and these shorter url can be used to go through the long urls. This short urls are easy to remember.

   NOTE (1) :- As this project is deployed on render.com  use "https://urlshortener-kizj.onrender.com/" in place of "http://localhost:9000"
   
   NOTE (2) :- Without login you cant shorten but can use your short url any where without logging.

   NOTE (3) :- Use the short url in browser.

   Docs :- 
   
          To Register :--                    POST       /user/registration/?username=<username>&password=<password>    (USE POSTMAN)
          To Login :--                       POST       /user/login/?username=<username>&password=<password>           (USE POSTMAN)
          To Logout :--                      GET        /user/logout                                                   (USE POSTMAN)
          To Generate short url :--          GET        /shorten/<longurl>        (USE POSTMAN)
          USE the shorturl from above :--    GET        EXAMPLE :---- http://localhost:9000/useurl/f82eb0  (USE in Google Chrome,Mozilla firefox )
          

  Tech Used:-Node.js, Mongo db cloud, Express.js                 

  DEMO EXAMPLE :--
  
  
                     a) Register :- 

                        send POST request :-- 

                            http://localhost:9000/user/registration/?username=sanjay&password=12388

                        respose will be :-

                             {
                                  "message": "registration succesfull",
                                  "data": {
                                      "username": "sanjay",
                                      "password": 12388,
                                      "_id": "658673fa56fc65aedb20a76e",
                                      "createdAt": "2023-12-23T05:45:30.870Z",
                                      "updatedAt": "2023-12-23T05:45:30.870Z",
                                      "__v": 0
                                  }
                              }

               b) login :- 

                        send POST request :-- 

                            http://localhost:9000/user/login/?username=sanjay&password=12388

                        respose will be :-

                           {
                               "message": "login successfull",
                               "data": {
                                   "_id": "658673fa56fc65aedb20a76e",
                                   "username": "sanjay",
                                   "password": 12388,
                                   "createdAt": "2023-12-23T05:45:30.870Z",
                                   "updatedAt": "2023-12-23T05:45:30.870Z",
                                   "__v": 0
                               }
                           }  



                 c) shorten :-  (to get short url)

                        send GET request :-- 

                            http://localhost:9000/shorten/www.gmail.com

                        respose will be :-

                             {
                                "message": "shorten url  succesfull",
                                "data": {
                                    "user": {
                                        "_id": "658673fa56fc65aedb20a76e",
                                        "username": "sanjay",
                                        "password": 12388,
                                        "createdAt": "2023-12-23T05:45:30.870Z",
                                        "updatedAt": "2023-12-23T05:45:30.870Z",
                                        "__v": 0
                                    },
                                    "longurl": "www.gmail.com",
                                    "hashcode": "f82eb0",
                                    "shorturl": "localhost:9000/useurl/f82eb0",                       // YOUR SHORT URL
                                    "_id": "658675ca56fc65aedb20a775",
                                    "createdAt": "2023-12-23T05:53:14.537Z",
                                    "updatedAt": "2023-12-23T05:53:14.537Z",
                                    "__v": 0
                                }
                            }  


                      d) useurl :-  (to use short url to render your longurl) 

                          send request  in browser (GOOGLE CHROME) :-- 
  
                              http://localhost:9000/useurl/f82eb0
  
                          respose will be :-
  
                             GMAIL PAGE will open



                       e) logout :- 

                            send GET request :--

                                    http://localhost:9000/user/logout

                            response will be :-

                                    {
                                        "message": "logout successfull"
                                    }

                                  
Error handling :- Various error such as wrong password username, url error have been taken care and return in json.




                           
   
