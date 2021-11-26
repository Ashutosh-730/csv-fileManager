# csv-fileManager

---------------------------------------
to install all the pacages::
--> npm install

to start server::
--> npm start 

##-use postman for following tasks::
*do it step by step*

--------------------------------------
For SignUP:: visit:

localhost:5000/signup

req.body for signup postman:
    {
    "name": "anyName",
    "email": "anyGmail@gmail.com",
    "password": "set-any-password"
    }
 
--------------------------------------------
 
 for login:: visit:
 
 localhost:5000/login
 
 req.body for login postman:
    {
    "email": "anyGmail@gmail.com",
    "password": "set-any-password"
    }
    
you will get a token and success message.

--------------------------------------------

To insert csv file data:: visit

localhost:5000/insertdata

(there is a csv file already available over there with name "employee.csv")
(you can add similar data in that file.)

make sure to add authantication header in postman

Bearer token 
here token == token that you get after log in.

------------------------------------------------------------

To find and filter data:: visit:

localhost:5000/find-filter

localhost:5000/update

localhost:5000/delete


to work with all three you need to add authantication header.
also you have to send req.body form postman.

**Format**
    {
      "query":{},
      "projection":{}
    }

you can write your query and parameter similar to mongodb query.


here is a sample paramere to find all that employees whose salary is greater than 3000 ::

    {
       "query":{"Salary":{"$gt":3000}},
       "projection":{}
    }

similarly you can do for update and delete.
