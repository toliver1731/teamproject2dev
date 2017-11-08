$(function() {

     $("#htnewuser").on("click",function(){
        // Check whether email already used
          event.preventDefault();
        //console.log("In create account ");
                    var email = $("#htemail").val().trim();
                    event.preventDefault();
                    //createaccount();
                    //console.log('check email exist');
                    checkalreadyexist(email);
        });   // end of on click
        $("#htlogin").on("click",function(event)
        {
             event.preventDefault ;

             var  email = $("#htsemail").val().trim();
             var  pword =  $("#htspwd").val().trim();

             console.log("inside ht login");
             $.ajax("/api/users/login/"+email+"/"+pword,
                    {
                      type : "GET",

                    }).then(function(response)
                         {
                                console.log(" inside promise");
                               if (response.status === 404)
                               {   console.log("Errror");
                                }
                                else {
                                  console.log("Ok succesfull login");
                                  /*
                                  $.ajax("users/myaccount",
                                          {type:"GET"}).then(function()
                                          {

                                          }
                                        );
                                   */
                                }

                         } // end of function (promise)
                    ); // end of promise
        }); // end on click;
}); // end of main function


function acexist()
{
    $("#htuser_lname").val() = "";
    $("#htuser_fname").val() = "";
    $("#htemail").val() = "";
    $("#htpassword").val() = "";
    $("#htconfirmpassword").val() = "";
    location.reload();
    $("#ht-yesnoemail").text() ="Account already exist for this Email Id. Please Enter New details!!!";
}

function checkpassword()
{
    var pwd1 = $("#htpassword").val().trim();
    var pwd2 = $("#htconfirmpassword").val().trim();

    if( pwd1 === pwd2)
    {
      return true;
    }
    else {
      $("#htpassword").val() = "";
      $("#htconfirmpassword").val() = "";
      $("#ht-yesnopwd").text("Password mismatch");
      return false;
    }
}


function checkinput()
{
    var rightone = true;
    var input1 = $("#htuser_fname").val().trim() ;
    var input2 = $("#htuser_lname").val().trim() ;
    var input3 = $("#htemail").val().trim();
    var input4 = $("#htpassword").val().trim() ;
    var input5 = $("#htconfirmpassword").val().trim() ;

    if ( input1 === "")
    {
      $("#ht-fname").text("First Name cannot be null");
      rightone = false;
    }
    if ( input2 === "")
    {
      $("#ht-lname").text("Lastt Name cannot be null");
      rightone = false;
    }
    if ( input3 === "")
    {
      $("#ht-yesnoemail").text("Email cannot be null");
      rightone = false;
    }
    if ( input4 === "")
    {
      $("#ht-yesnopwd1").text("Password cannot be null");
      rightone = false;
    }
    if ( input5 === "")
    {
      $("#ht-yesnopwd2").text("Required field");
      rightone = false;
    }
    if ( checkpassword())
    {
      console.log("Input -Checking password");
    }
    else {
      rightone = false;
    }
    return rightone;
}

function checkalreadyexist(email)
{
  console.log( "ajax for check on email");
  $.ajax("/api/users/check/"+email,{
    type : "GET"
  }).then(function(response)
     {
            console.log('Ajax response for emial check',response);
             if (response.exist === "no")
             {
                if (checkinput())
                {
                  createaccount();

                }
                else {
                  acexist();
                }
             }
             else if(response.exist=== 'yes')
             {
               console.log("User Account with this Email-Id already Exist");
               acexist();

             }
      });
    //  return false;
}

function createaccount()
{
        var newuser = {
          fname : $("#htuser_fname").val().trim(),
          lname : $("#htuser_lname").val().trim(),
          email: $("#htemail").val().trim(),
          pword : $("#htconfirmpassword").val().trim()
        };
        $.ajax("/api/users/add",
          {
            type: "POST",
            data : newuser
          }).then(
               function(response)
               {

                 console.log("Inserted Records",response.id);
                 var id = response.id;
                 $.ajax("/users/myaccount/"+id,
                         {type:"GET"}).then(function()
                         {
                            console.log("Account created - Mydashboard Page");
                         }
                       );

               }
          ); //end ajax add

}

/*
$("#htlogin").on("click",function(event)
{
     event.preventDefault ;

     var usercred = {
       email : $("#htsemail").val().trim(),
       pword :  $("#htspwd").val().trim()
     };
     console.log("inside ht login",usercred);
     $.ajax("/api/users/login",
            {
              type : "POST",
              data : usercred
            }).then(function(response)
                 {
                        console.log(" inside promise");
                       if (response.status === 404)
                       {   console.log("Errror");
                        }
                        else {
                          console.log("Ok succesfull login");
                          /*
                          $.ajax("users/myaccount",
                                  {type:"GET"}).then(function()
                                  {

                                  }
                                );

                        }

                 } // end of function (promise)
            ); // end of promise
}); // end on click;
*/
