
const LOGINSUCCESS ='LOGINSUCCESS'
const LOGOUT = 'LOGOUT'

const Operations = (data , navigate = null) =>{
    console.log("inside operation" , data)
    switch(data.operation){
       case "login" : return login(data)
       case "logout" : return logout()
        }
}

function login(response , navigate)
{
    sessionStorage.setItem("username", response.username);
    sessionStorage.setItem("email", response.email);
    sessionStorage.setItem("isAuthenticated", true);

      return{
        type : LOGINSUCCESS,
        username : response.username,
        email : response.email
        
    }
}


function logout() {
    
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("token")
  sessionStorage.setItem("isAuthenticated", false);
    //window.location.href = "/authentication/sign-in" // Accept navigate as a parameter
    return {
       
            type: LOGOUT,
        
        //window.location.replace("/authentication/sign-in");
         // Navigate to the desired route after logout
    };
}

  

export default Operations;