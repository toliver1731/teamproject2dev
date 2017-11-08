const express = require("express");
const router = express.Router();
const user = require("../models/userlogin_model.js");
const wish = require("../models/wishlist_model.js");
// To get the Page index.handlebars
router.get("/", function(req, res) {
         res.render('index');
});

// To get the userlogin.handlbars
router.get("/users/login", function(req, res) {
         res.render('userlogin');
});
router.get("/users/signin", function(req, res) {
         res.render('usersignin');
});
//My account
router.get("/users/myaccount/:id", function(req, res) {
       var condition =
        { userid : req.params.id };
       wish.selectone(condition,function(data)
        {
           res.render('myaccount',{wlist:data});
        });

});
//Log in to the account
router.post("/api/users/login/:email/:pword", function(req, res) {
       console.log("In post route for login",req);
       var condition =
       { email : req.params.email,
         pword : req.params.pword
       } ;
        user.selectone(condition, function(result)
        {
            console.log("the response from ema+pswd",result);
             if(result.affectedRows > 0)
             {
              conosle.log("Valid login");
               res.json({result})
               res.status(200).end();
               res.redirect("/users/myaccount/"+id);
             }
             else {
                console.log("Invalid Email password combination");
                  return res.status(404).end();
             }
                //res.render('index', {vlist:data});
        });  //end of all -select
});
// Create a new account
router.post("/api/users/add", function(req, res) {
      user.create([
        "fname","lname","email","pword"
      ], [
        req.body.fname, req.body.lname, req.body.email,req.body.pword
      ], function(result) {
             console.log('Results from create account',result);
            if (result.affectedRows != 0)
            {
              console.log("Inserting new user in table");
              //res.render('userlogin', {ulist:data});
              res.json({id:result.insertId})
              //res.send(result.insertId);
              res.status(200).end();
            }
            else {
              return res.status(404).end();
            }
       }); //end of create
}); // end of post route to add new user accounts

// check is account exist for email
router.get("/api/users/check/:email", function(req,res){
    var condition = { email : req.params.email};
     console.log('condition is :',condition);
     user.selectone(condition,function(result) {
          console.log('Results from select one',result);
          if ( result.length === 0)
          {
            console.log("Email not exist");
          //  res.send("yes");
          res.json({exist : 'no'});
            return res.status(200).end();
          }
          else {
            console.log("Account already exist");
            res.json({exist:'yes'});
            return res.status(404).end();
          }
     });
});
// update record in table
router.put("/api/users/update/:id", function(req, res) {
      var condition = "id = " + req.params.id + "user_id = "+req.body.uid;
      console.log("condition", condition);
        user.update({
             fname : req.body.grpname,
             lname :req.body.grpdesc
        }, condition, function(result) {
             console.log('updating values');
                if (result.changedRows == 0) {
                  console.log("ID not found, user does not exist");
                  return res.status(404).end();
                } else {
                  console.log('Valid Id, Update Record');
                  res.status(200).end();
                }
        }); // end of update
}); //end of put route to update records

// delete record from table
router.delete("/api/groups/users/delete/:id", function(req, res) {
      var condition = "id = " + req.params.id + "user_id = "+req.body.uid;
      user.delete(condition, function(result) {
            if (result.affectedRows == 0) {
                  // If no rows were changed, then the ID must not exist, so 404
                  console.log("ID not found, user does not exist");
                  return res.status(404).end();
                } else {
                  console.log('Valid Id, Deleted record');
                  res.status(200).end();
                }

      }); // end of delete db call
}); //end of delete route

// Export routes for server.js to use.
module.exports = router;
